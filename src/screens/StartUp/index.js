import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useContext, useState} from 'react';
import {Text, StatusBar, View} from 'react-native';
import {Button, Headline, Paragraph, TouchableRipple} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../../styles';
import theme from '../../../theme';
import {strings} from '../../constants';
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
} from 'react-native-fbsdk';
import analytics from '@react-native-firebase/analytics';
import {AuthContext} from '../../hooks';
import { AppContext } from '../../hooks/providers/App';

// import { strings } from '@constants';
// import { useAuth } from '../../hooks/auth'
export const StartUp = ({navigation}) => {
    const {doContinueFaceBookUser, doAddFcmToken} = useContext(AuthContext);
    const Navigate = (link) => {
        navigation.navigate(link);
    };
    const { setSocket, setNavigation } = useContext(AppContext);
    const { doGetProfile, setProfile } = useContext(AuthContext);
    useEffect(() => {
        if (navigation) {
            setNavigation(navigation);
        }
    }, []);

    useEffect(() => {
        (async () => {
            let token = await AsyncStorage.getItem('token');
            if (token) {
                getProfile(token);
            } else {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{ name: 'StartUp' }],
                    }),
                );
            }
        })();
    }, []);
    const getProfile = () => {
        doGetProfile()
            .then(async (ret) => {
                setProfile(ret);
                let socket = io(variables.baseUrl, {
                    query: {
                        token: await AsyncStorage.getItem('token'),
                        id: await AsyncStorage.getItem('id'),
                    },
                });
                setSocket(socket);
                if (ret.profileStatus === 0) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: 'Location' }],
                        }),
                    );
                } else {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: 'Tab' }],
                        }),
                    );
                }
            })
            .catch((err) => {
                if (err === 'notfound') {
                    navigation.navigate('StartUp');
                } else if (err === '403') {
                    navigation.navigate('StartUp');
                }
                navigation.navigate('StartUp');
                console.log(err);
            });
    };

    const logLogin = async (method) => {
        return await analytics().logLogin({method});
    };

    const loginByPhoneNumber = async () => {
        const res = await logLogin('PhoneNumber');
        Navigate('PhoneNumber');
    };

    const fbLogin = () => {
        LoginManager.logInWithPermissions([
            'public_profile',
            'email',
            // 'user_gender',
            // 'user_photos',
            // 'user_birthday',
        ]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    // console.log(result);
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const accessToken = data.accessToken.toString();
                        logLogin('fb');
                        // console.log(accessToken);
                        getFBProfile(accessToken);
                    });
                    // getFBProfile();
                  
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error);
            },
        );
    };

    const getFBProfile = (token) => {
        const infoRequest = new GraphRequest(
            '/me',
            {
                accessToken: token,
                httpMethod: 'GET',
                version: 'v2.5',
                parameters: {
                    fields: {
                        string: 'id,name,email,first_name,last_name,picture',
                    },
                },
            },
            (error, result) => {
                if (error) {
                    console.log(error);
                    console.log('Error fetching data: ' + error.toString());
                } else {
                    console.log(result);
                    if (result.email) {
                        analytics().setUserProperty(
                            'registered_email',
                            result.email,
                        );
                    }
                    doContinueFaceBookUser({
                        navigation: navigation,
                        accessToken: token,
                        ...result,
                    })
                        .then(async (ret) => {
                            // navigation.navigate('Location');
                            // navigation.navigate('Tab');
                            await doAddFcmToken();

                        })
                        .catch(() => {
                            // navigation.navigate('Tab')
                        });
                    console.log('Success fetching data: ' + result.toString());
                    // console.log(result);
                }
            },
        );
        new GraphRequestManager().addRequest(infoRequest).start();
    };

    return (
        <SafeAreaView style={[styles.flex, styles.bgWhite]}>
            <StatusBar barStyle="dark-content" />
            <View
                style={[
                    styles.flex,
                    styles.justify_between,
                    styles.screensContents,
                ]}>
                <View style={[styles.bgGrey]}>
                    <View />
                </View>
                <View style={[styles.flex, styles.justify_center]}>
                    <View style={[styles.justify_center, styles.items_center]}>
                        <Headline
                            style={[styles.primary, styles.f26, styles.bold]}>
                            {strings.startup.header}
                        </Headline>
                        <Paragraph style={[styles.mt_20]}>
                            {strings.startup.caption1}
                        </Paragraph>
                        <Paragraph>{strings.startup.caption2}</Paragraph>
                    </View>
                    <View style={[styles.mt_20]}>
                        <Button
                            mode="contained"
                            dark
                            onPress={loginByPhoneNumber}
                            contentStyle={[styles.buttonContentStyle]}
                            labelStyle={[styles.buttonLabel]}
                            style={[
                                styles.mt_20,
                                styles.buttonContainer,
                                styles.self_center,
                            ]}>
                            {strings.startup.phoneNumber}
                        </Button>
                        <Button
                            mode="contained"
                            dark
                            onPress={fbLogin}
                            labelStyle={[styles.buttonLabel]}
                            contentStyle={[
                                styles.buttonContentStyle,
                                {backgroundColor: theme.colors.facebookColor},
                            ]}
                            style={[
                                styles.mt_20,
                                styles.buttonContainer,
                                styles.self_center,
                            ]}>
                            {strings.startup.facebook}
                        </Button>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={[styles.center]}>
                            {strings.startup.termsPolicyCaption}
                        </Text>
                    </View>
                    <View style={[styles.flex_row, styles.justify_center]}>
                        <TouchableRipple
                            onPress={() => navigation.navigate('Terms')}>
                            <Text style={[styles.primary]}>
                                {strings.startup.termsButton}
                            </Text>
                        </TouchableRipple>
                        <View>
                            <Text> and</Text>
                        </View>
                        <TouchableRipple
                            onPress={() =>
                                navigation.navigate('PrivacyPolicy')
                            }>
                            <Text style={[styles.primary]}>
                                {' '}
                                {strings.startup.policyButton}
                            </Text>
                        </TouchableRipple>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
