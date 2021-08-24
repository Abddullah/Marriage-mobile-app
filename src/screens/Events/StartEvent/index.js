import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Alert,
    ImageBackground,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
} from 'react-native';
import styles from '../../../../styles';
import { theme } from '@theme';
import { strings } from '@constants';
import { FAB } from 'react-native-paper';
import { EventContext } from '../../../hooks/event';
import { AppContext, AuthContext } from '../../../hooks';
import {
    checkMultiple,
    request,
    requestMultiple,
    PERMISSIONS,
    RESULTS,
} from 'react-native-permissions';
import {
    EventEnded,
    WaitingUsers,
    Loading,
    Inline,
    Waiting,
    WaitingForNextCall,
} from './components';
export const StartEvent = ({ navigation }) => {
    const { event, doGetEvents, doUnAttendEvent } = useContext(EventContext);
    const { socket } = useContext(AppContext);
    const { profile } = useContext(AuthContext);
    const [waitingForUsersToJoin, setWaitingForUsersToJoin] = useState(0);
    const [isWaitingForNextCall, setIsWaitingForNextCall] = useState(0);
    const [loadingEvent, setLoadingEvent] = useState(0);
    const [eventEnded, setEventEnded] = useState(0);
    const [countDown, setCountDown] = useState(event.dataTime);
    let hasUnsavedChanges = Boolean(true);
    const [intId, setIntId] = useState(0);
    useEffect(() => {
        // navigation.navigate('Call',{data:{ room:'room',token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzEwNTg2NTU2NDYyNzFiMzExMDQwOTkyMTUzMzJhMDcwLTE2MDYwNzU5ODUiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyMSIsInZpZGVvIjp7InJvb20iOiJyb29tMSJ9fSwiaWF0IjoxNjA2MDc1OTg1LCJleHAiOjE2MDYwNzk1ODUsImlzcyI6IlNLMTA1ODY1NTY0NjI3MWIzMTEwNDA5OTIxNTMzMmEwNzAiLCJzdWIiOiJBQzE1YjM2MGM3ODUxOWRiZjk1NDFmYTBmZWE4MGY3NGRhIn0.WIAQN9j0nhZ4mf5m-7k3gmHy8ckJw7yTIzu3vlUSoNU','user':'5faebf95bd689009385a8763'}})
        checkTime();
        _checkPermissions();
        let ID = setInterval(() => {
            if (new Date(event.dateTime).getTime() < new Date().getTime()) {
                setCountDown(0);
                hasUnsavedChanges = false;
                clearInterval(ID);
            } else {
                setCountDown(
                    new Date(event.dateTime).getTime() - new Date().getTime(),
                );
            }
        }, 1000);

        if (socket) {
            console.log('into use effect at Event page');
            socket.on('join-room', (data) => {
                setLoadingEvent(1);
                setWaitingForUsersToJoin(0);
                setIsWaitingForNextCall(0);
                navigation.navigate('Call', { data });
            });

            socket.on('event-on-wait', () => {
                setWaitingForUsersToJoin(0);
                setWaitingForUsersToJoin(1);
            });

            socket.on('not-join-room', () => {
                setWaitingForUsersToJoin(0);
                setIsWaitingForNextCall(1);
            });

            socket.on('event-ended', () => {
                hasUnsavedChanges = true;
                setEventEnded(1);
            });
        }

        return () => {
            socket.off('join-room');
            socket.off('not-join-room');
            socket.off('event-ended');
            clearInterval(ID);
        };
    }, []);

    useEffect(() => {
        navigation.addListener('beforeRemove', async (e) => {
            if (hasUnsavedChanges) {
                leaveOnlineEvent();
                await doGetEvents({
                    countryCode: profile.countryCode,
                    country: profile.country,
                });
                return;
            } else {
                // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                Alert.alert(
                    'Leave Event?',
                    'Event has started, if you leave the event you will not be able to connect with matches until you re-attend event.',
                    [
                        {
                            text: "Don't leave",
                            style: 'cancel',
                            onPress: () => { },
                        },
                        {
                            text: 'Leave Event',
                            style: 'destructive',
                            onPress: async () => {
                                leaveOnlineEvent();
                                await doGetEvents({
                                    countryCode: profile.countryCode,
                                    country: profile.country,
                                });
                                navigation.dispatch(e.data.action);
                            },
                        },
                    ],
                );
            }
        });
    }, [hasUnsavedChanges, navigation]);

    const _checkPermissions = (callback) => {
        const iosPermissions = [
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.MICROPHONE,
        ];
        const androidPermissions = [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.RECORD_AUDIO,
        ];
        checkMultiple(
            Platform.OS === 'ios' ? iosPermissions : androidPermissions,
        ).then((statuses) => {
            const [CAMERA, AUDIO] =
                Platform.OS === 'ios' ? iosPermissions : androidPermissions;
            if (
                statuses[CAMERA] === RESULTS.UNAVAILABLE ||
                statuses[AUDIO] === RESULTS.UNAVAILABLE
            ) {
                Alert.alert(
                    'Error',
                    'Hardware to support video calls is not available',
                );
            } else if (
                statuses[CAMERA] === RESULTS.BLOCKED ||
                statuses[AUDIO] === RESULTS.BLOCKED
            ) {
                Alert.alert(
                    'Error',
                    'Permission to access hardware was blocked, please grant manually',
                );
            } else {
                if (
                    statuses[CAMERA] === RESULTS.DENIED &&
                    statuses[AUDIO] === RESULTS.DENIED
                ) {
                    requestMultiple(
                        Platform.OS === 'ios'
                            ? iosPermissions
                            : androidPermissions,
                    ).then((newStatuses) => {
                        if (
                            newStatuses[CAMERA] === RESULTS.GRANTED &&
                            newStatuses[AUDIO] === RESULTS.GRANTED
                        ) {
                            callback && callback();
                        } else {
                            Alert.alert(
                                'Error',
                                'One of the permissions was not granted',
                            );
                        }
                    });
                } else if (
                    statuses[CAMERA] === RESULTS.DENIED ||
                    statuses[AUDIO] === RESULTS.DENIED
                ) {
                    request(
                        statuses[CAMERA] === RESULTS.DENIED ? CAMERA : AUDIO,
                    ).then((result) => {
                        if (result === RESULTS.GRANTED) {
                            callback && callback();
                        } else {
                            Alert.alert('Error', 'Permission not granted');
                        }
                    });
                } else if (
                    statuses[CAMERA] === RESULTS.GRANTED ||
                    statuses[AUDIO] === RESULTS.GRANTED
                ) {
                    callback && callback();
                }
            }
        });
    };
    const checkTime = () => {
        if (new Date(event.dateTime).getTime() < new Date().getTime()) {
            if (event.status === 2) {
                hasUnsavedChanges = true;
                setEventEnded(1);
            }
            setCountDown(0);
            hasUnsavedChanges = false;
            clearInterval(intId);
        } else {
            setCountDown(
                new Date(event.dateTime).getTime() - new Date().getTime(),
            );
        }
    };
    const leaveOnlineEvent = async () => {
        await doUnAttendEvent({
            event: event._id,
            user: profile._id,
            gender: profile.gender,
        });
        socket.emit('leave-event', {
            event: event,
            gender: profile.gender,
            user: profile._id,
        });
    };

    return (
        <View style={[styles.flex]}>
            <StatusBar barStyle="light-content" />
            <View
                style={[localStyles.bgImg]}
            >
                <View
                    style={[
                        styles.items_center,
                        styles.justify_center,
                        { flexGrow: 1 },
                    ]}>
                    {eventEnded ? (
                        <EventEnded />
                    ) : isWaitingForNextCall === 1 ? (
                        <>
                            <WaitingForNextCall />
                        </>
                    ) : waitingForUsersToJoin === 1 ? (
                        <WaitingUsers />
                    ) : loadingEvent === 1 ? (
                        <Loading />
                    ) : countDown === 0 ? (
                        <Inline />
                    ) : (
                                            <Waiting countDown={countDown} />
                                        )}
                </View>

                <View
                    style={[
                        styles.flex_row,
                        styles.phc_5,
                        styles.justify_between,
                        styles.mb_20,
                        styles.items_center,
                    ]}>
                    <FAB
                        onPress={() => navigation.goBack()}
                        icon="arrow-left"
                        style={[styles.bgWhite]}
                    />
                    <View style={[{ width: 56, height: 56 }]} />
                    <View style={[{ width: 56, height: 56 }]} />
                </View>
            </View>
        </View>
    );
};
const localStyles = StyleSheet.create({
    bgImg: {
        width: '100%',
        display: 'flex',
        height: '100%',
        backgroundColor: 'white'
    },
    timer: {
        width: 330,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: theme.colors.white,
        backgroundColor: 'transparent',
    },
    // timer: {
    //     height: 200,
    //     width: 200,
    //     borderRadius: 200 / 2,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderColor: theme.colors.white,
    //     borderWidth: 5,
    //     backgroundColor: 'transparent',
    // },
});
