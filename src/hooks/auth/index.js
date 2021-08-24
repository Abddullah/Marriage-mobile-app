import React, {
    useEffect,
    useContext,
    createContext,
    useState,
    useCallback,
} from 'react';
import {
    getOTP,
    login,
    verifyToken,
    verifyOTP,
    continueFaceBookUser,
    signup,
    updateProfile,
    updateProfilePhoto,
    getProfile,
    user,
    update,
    updatePhoto,
    logout,
    blockAccount,
    removeFcmToken,
    addFcmToken,
} from '../../api/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { LoaderContext } from '../providers/Loader';
import { ToastContext } from '../providers/Toast';
import analytics from '@react-native-firebase/analytics';
import { CommonActions } from '@react-navigation/native';
import { AppContext } from '../providers/App';
import { variables } from '../../constants/variables';
import io from 'socket.io-client';
import {
    setUserOnCrashlytics,
    logCrashlytics,
    logErrorOnCrashlytics,
    getFirebaseDeviceToken,
} from '../../utils/index';
import RNUxcam from 'react-native-ux-cam';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const navigation = useNavigation();
    const { setSocket, navigateTo } = useContext(AppContext);

    const [profile, setProfile] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryDailCode, setCountryDailCode] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [country, setCountry] = useState('');
    const [token, setToken] = useState(null);
    const [authUser, setAuthUser] = useState(() => {
        return {};
    });
    const { openToast } = useContext(ToastContext);
    const { setLoader } = useContext(LoaderContext);
    // const {setToast} = useContext(ToastContext);

    const doGetOTP = useCallback((data) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('getting OTP...');
            getOTP({ phoneNumber: `${data.countryDailCode}${data.phoneNumber}` })
                .then((ret) => {
                    if (!data.resend) {
                        setPhoneNumber(data.phoneNumber);
                        setCountry(data.country);
                        setCountryCode(data.countryCode);
                        setCountryDailCode(data.countryDailCode);
                    }

                    setLoader(false);
                    resolve(ret);
                })
                .catch((err) => {
                    setLoader(false);
                    logErrorOnCrashlytics(err);
                    openToast('error', err);
                    reject(err);
                });
        });
    });
    const doGetProfile = useCallback(() => {
        return new Promise(async (resolve, reject) => {
            // setLoader(true);
            logCrashlytics('Getting Profile...');
            getProfile()
                .then((ret) => {
                    setProfile(ret);
                    AsyncStorage.setItem('id', ret._id);
                    // setLoader(false);
                    resolve(ret);
                })
                .catch((err) => {
                    // setLoader(false);
                    if (err !== 'notfound') {
                        openToast('error', err);
                    }
                    logErrorOnCrashlytics(err);
                    reject(err);
                });
        });
    }, []);
    const doVerifyOTP = (data) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('Verifing OTP...');
            verifyOTP({
                code: data.code,
                country: country,
                countryDailCode: countryDailCode,
                countryCode: countryCode,
                phoneNumber: data.phoneNumber,
            })
                .then((ret) => {
                    let socket = io(variables.baseUrl, {
                        query: {
                            token: ret.token,
                            id: ret.user._id,
                        },
                    });
                    setSocket(socket);
                    // return () => (
                    logCrashlytics('Sign in..');
                    if (ret.new) {
                        setToken('token', ret.token);
                        AsyncStorage.setItem('token', ret.token);
                        AsyncStorage.setItem('id', ret.user._id);
                        setProfile(ret.user);
                        setUserOnCrashlytics(ret.user);
                        RNUxcam.setUserIdentity(ret.user.email);
                        RNUxcam.setUserProperty(
                            'firstName',
                            ret.user.firstName,
                        );
                        analytics().setUserProperties({
                            registered_user_country: data.country,
                            registered_phoneNumber: data.phoneNumber,
                        });
                        data.navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [{ name: 'Location' }],
                            }),
                        );
                    } else {
                        setToken('token', ret.token);
                        RNUxcam.setUserIdentity(ret.user.email);
                        RNUxcam.setUserProperty(
                            'firstName',
                            ret.user.firstName,
                        );
                        AsyncStorage.setItem('token', ret.token);
                        AsyncStorage.setItem('id', ret.user._id);
                        setProfile(ret.user);
                        setUserOnCrashlytics(ret.user);
                        analytics().setUserProperty(
                            'registered_phoneNumber',
                            data.phoneNumber,
                        );

                        if (ret.profileStatus === 0) {
                            data.navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [{ name: 'Location' }],
                                }),
                            );
                        } else {
                            data.navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [{ name: 'Tab' }],
                                }),
                            );
                        }
                    }
                    setLoader(false);
                    resolve(ret);
                })
                .catch((err) => {
                    openToast('error', err);
                    logErrorOnCrashlytics(err);
                    setLoader(false);
                    reject(err);
                });
        });
    };

    const doUpdateProfile = useCallback((data) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('Updating Profile Info...');
            updateProfile(data)
                .then(async (ret) => {
                    setLoader(false);
                    await doGetProfile();
                    // setProfile(ret);
                    resolve(ret);
                })
                .catch((err) => {
                    logErrorOnCrashlytics(err);
                    setLoader(false);
                    reject(err);
                });
        });
    }, []);

    const doUpdateProfilePhoto = useCallback((image) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('Updating Profile Photo....');
            console.log(image, 'i am going to server')
            updateProfilePhoto(image)
                .then(async (ret) => {
                    setLoader(false);
                    setProfile(ret);
                    resolve(ret);
                })
                .catch(function (err) {
                    logErrorOnCrashlytics(err);
                    setLoader(false);
                    alert(JSON.stringify(err))
                    console.log(err, 'I am the erorr coming from the server')
                    reject(err);
                });
        });
    }, []);
    const doContinueFaceBookUser = useCallback((data) => {
        return new Promise((resolve, reject) => {
            setLoader(true);
            logCrashlytics('Fb Sign in ...');
            continueFaceBookUser(data)
                .then(async (ret) => {
                    setToken('isSocial', ret.user.isSocial);
                    if (ret.new) {
                        setToken('token', ret.token);
                        AsyncStorage.setItem('token', ret.token);
                        setProfile(ret.user);
                        setUserOnCrashlytics(ret.user);
                        RNUxcam.setUserIdentity(ret.user.email);
                        RNUxcam.setUserProperty(
                            'firstName',
                            ret.user.firstName,
                        );
                        data.navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [{ name: 'Country' }],
                            }),
                        );
                    } else {
                        setToken('token', ret.token);
                        AsyncStorage.setItem('token', ret.token);
                        setUserOnCrashlytics(ret.user);
                        setProfile(ret.user);
                        RNUxcam.setUserIdentity(ret.user.email);
                        RNUxcam.setUserProperty(
                            'firstName',
                            ret.user.firstName,
                        );
                        data.navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [{ name: 'Tab' }],
                            }),
                        );
                    }
                    setLoader(false);
                    resolve(ret);
                })
                .catch((err) => {
                    setLoader(false);
                    logErrorOnCrashlytics(err);
                    openToast('error', err);
                    reject(err);
                });
        });
    }, []);

    const doBlockAccount = () => {
        return new Promise((resolve, reject) => {
            setLoader(true);
            logCrashlytics('Blocking Account...');
            blockAccount()
                .then(async (ret) => {
                    // deleteAccount()
                    setLoader(false);
                    resolve(ret);
                })
                .catch((err) => {
                    setLoader(false);
                    logErrorOnCrashlytics(err);
                    openToast('error', err);
                    reject(err);
                });
        });
    };
    const doAddFcmToken = () => {
        return new Promise(async (resolve, reject) => {
            logCrashlytics('Adding Fcm Token....');
            let tkn = await getFirebaseDeviceToken();
            addFcmToken({ token: tkn })
                .then(async (ret) => {
                    resolve(ret);
                })
                .catch(function (err) {
                    logErrorOnCrashlytics(err);
                    reject(err);
                });
        });
    };

    const doRemoveFcmToken = useCallback(async () => {
        return new Promise(async (resolve, reject) => {
            let tkn = await getFirebaseDeviceToken();
            logCrashlytics('Removing Fcm Token....');
            removeFcmToken({ token: tkn })
                .then(async (ret) => {
                    resolve(ret);
                })
                .catch(function (err) {
                    logErrorOnCrashlytics(err);
                    reject(err);
                });
        });
    }, []);
    const logout = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.removeItem('token');
            resolve(true);
            data.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'Login' }],
                }),
            );

            // navigateTo('Login');
        });
    };
    return (
        <AuthContext.Provider
            value={{
                doGetOTP,
                doVerifyOTP,
                setProfile,
                token,
                profile,
                phoneNumber,
                country,
                countryCode,
                countryDailCode,
                doContinueFaceBookUser,
                doGetProfile,
                doUpdateProfile,
                doUpdateProfilePhoto,
                authUser,
                doBlockAccount,
                doAddFcmToken,
                doRemoveFcmToken,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
