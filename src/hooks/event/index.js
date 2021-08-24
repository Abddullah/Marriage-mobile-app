import React, {
    useEffect,
    useContext,
    createContext,
    useState,
    useCallback,
} from 'react';
import {
    joinEvent,
    leaveEvent,
    getAccessToken,
    getEvents,
    reportCall,
    unAttendEvent,
    attendEvent,
} from '../../api/event';
import AsyncStorage from '@react-native-community/async-storage';
import { LoaderContext } from '../providers/Loader';
import { ToastContext } from '../providers/Toast';
import { useNavigation, NavigationContext } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { AppContext } from '../providers/App';
import { AuthContext } from '../auth';
import { getFirebaseDeviceToken } from '../../utils';
import { logCrashlytics, logErrorOnCrashlytics } from '../../utils/index';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    // const navigation = useNavigation();
    const { doGetProfile, profile } = useContext(AuthContext);
    const { openToast } = useContext(ToastContext);
    const { setLoader } = useContext(LoaderContext);
    const [event, setEvent] = useState({});
    // const {setToast} = useContext(ToastContext);

    const doJoinEvent = useCallback((data) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('Joining Event...');
            joinEvent(data)
                .then(async (ret) => {
                    console.log('response by join event', ret);
                    openToast('success', 'Event Joined');
                    const user = await doGetProfile();
                    const userProperties = {
                        event_id: data.eventId,
                        registered_email: user.email,
                        registered_gender: user.gender,
                    };
                    analytics().setUserProperties(userProperties);
                    analytics().logEvent('user_join_event', userProperties);
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
    const doLeaveEvent = useCallback((data) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('Leaving Event...');
            leaveEvent(data)
                .then(async (ret) => {
                    const user = await doGetProfile();
                    const userProperties = {
                        event_id: data.eventId,
                        registered_email: user.email,
                        registered_gender: user.gender,
                    };
                    analytics().setUserProperties(userProperties);
                    analytics().logEvent('user_leave_event', userProperties);
                    setLoader(false);
                    openToast('success', 'Event Exited');
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

    const doAttendEvent = useCallback((data) => {
        return new Promise(async (resolve, reject) => {
            // let token = await getFirebaseDeviceToken();
            setLoader(true);
            logCrashlytics('Attending Event...');
            attendEvent(data)
                .then(async (ret) => {
                    // console.log('response by join event', ret);
                    const user = await doGetProfile();
                    const userProperties = {
                        event_id: data.eventId,
                        registered_email: user.email,
                        registered_gender: user.gender,
                    };
                    // analytics().setUserProperties(userProperties);
                    // analytics().logEvent('user_join_event', userProperties);
                    setLoader(false);
                    // openToast('success', 'Event Joined');
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
    const doUnAttendEvent = useCallback((data) => {
        return new Promise(async (resolve, reject) => {
            // let token = await getFirebaseDeviceToken();
            setLoader(true);
            logCrashlytics('UnAttend Event...');
            unAttendEvent(data)
                .then(async (ret) => {
                    // const user = await doGetProfile();
                    // const userProperties = {
                    // event_id: data.eventId,
                    // registered_email: user.email,
                    // registered_gender: user.gender,
                    // };
                    // analytics().setUserProperties(userProperties);
                    // analytics().logEvent('user_leave_event', userProperties);
                    setLoader(false);
                    // openToast('success', 'Event leaved');
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

    const doGetEvents = useCallback((data) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('Getting Events...');
            getEvents(data)
                .then((ret) => {
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
    }, []);

    const doGetAccessToken = useCallback((data) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('Fetching Access Token...');
            getAccessToken(data)
                .then((ret) => {
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
    }, []);
    const doReportCall = (data) => {
        return new Promise(async (resolve, reject) => {
            setLoader(true);
            logCrashlytics('Reporting a call...');
            reportCall(data)
                .then(async (ret) => {
                    const user = await doGetProfile();
                    const userProperties = {
                        event_id: data.eventId,
                        reporte_user_email: user.email,
                        reporte_user_gender: user.gender,
                        registered_email: user.email,
                        registered_gender: user.gender,
                    };
                    analytics().setUserProperties(userProperties);
                    analytics().logEvent(
                        'user_report_event_call',
                        userProperties,
                    );
                    setLoader(false);
                    openToast('success', 'Call Reported');
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
    return (
        <EventContext.Provider
            value={{
                event,
                setEvent,
                doJoinEvent,
                doLeaveEvent,
                doAttendEvent,
                doUnAttendEvent,
                doGetEvents,
                doGetAccessToken,
                doReportCall,
            }}>
            {children}
        </EventContext.Provider>
    );
};
