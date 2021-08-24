import React, { useState, useRef, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Alert,
    ScrollView,
    PanResponder,
    Animated,
    ImageBackground,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { Avatar, Card, FAB } from 'react-native-paper';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';
import {
    TwilioVideoLocalView,
    TwilioVideoParticipantView,
    TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import analytics from '@react-native-firebase/analytics';
import Draggable from 'react-native-draggable';
import styles from '../../../../styles';
import { EventContext } from '../../../hooks/event';
import { getUserDetail } from '../../../api/event';
import theme from '../../../../theme';
import { strings } from '../../../constants';
import { AppContext, AuthContext } from '../../../hooks/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReportCall } from './Components/ReportCall/index';
import { LikeDislike } from './Components/LikeDislike';
import { variables } from '../../../constants/variables';
export const Call = ({ route, navigation }) => {
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [flip, setFlip] = useState(true);
    const [status, setStatus] = useState('disconnected');
    const [videoTracks, setVideoTracks] = useState(new Map());
    const [roomName, setRoom] = useState('');
    const [token, setToken] = useState('');
    const twilioVideo = useRef(null);
    const { event } = useContext(EventContext);
    const [userDetail, setUserDetail] = useState(null);
    const { socket } = useContext(AppContext);
    const [reportCallVisible, setReportCallVisible] = useState(false);
    const [countDown, setCountDown] = useState(null);
    const [showLikeDislike, setShowLikeDislike] = useState(0);
    const [time, setTime] = useState(null);
    const likeDislikeRef = useRef(null);
    const { profile } = useContext(AuthContext);
    const [callData, setCallData] = useState({ room: '', token: '', user: '' });
    let goBackAuto = Boolean(false);
    useKeepAwake();

    useEffect(() => {
        var s = new Date();
        setTime(s.setMinutes(s.getMinutes() + variables.callDuration));
        let ID = setInterval(() => {
            if (new Date(s).getTime() < new Date().getTime()) {
                setCountDown(0);
                clearInterval(ID);
            } else {
                setCountDown(new Date(s).getTime() - new Date().getTime());
            }
        }, 1000);
        return () => {
            clearInterval(ID);
        };
    }, []);

    useEffect(() => {
        fetchUser(route.params.data.user);
        return () => { };
    }, []);

    useEffect(() => {
        var s = new Date();
        setTime(s.setMinutes(s.getMinutes() + 1));

        let ID2 = setInterval(() => {
            if (showLikeDislike == 0) {
                if (
                    Math.floor(
                        ((new Date(s).getTime() - new Date().getTime()) %
                            (1000 * 60 * 60)) /
                        (1000 * 60),
                    ) == 0
                ) {
                    setShowLikeDislike(1);
                    clearInterval(ID2);
                    likeDislikeRef.current.openAsk();
                }
            }
        }, 100);
        return () => {
            clearInterval(ID2);
        };
    }, []);

    useEffect(() => {
        setCallData(route.params.data);
        twilioVideo.current.connect({
            accessToken: route.params.data.token,
            enableNetworkQualityReporting: true,
        });
        if (socket) {
            socket.on('leave-room', (data) => {
                goBackAuto = true;
                setRoom('');
                setStatus('disconnected');
                twilioVideo.current.disconnect();
                navigation.goBack();
                console.log('goBack................');
            });
        }

        return () => {
            setRoom('');
            setStatus('disconnected');
            twilioVideo.current.disconnect();
            socket.off('leave-room');
        };
    }, [socket]);

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            if (goBackAuto) {
                return;
            } else {
                // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                Alert.alert(
                    'Leave Call?',
                    'If you leave the call then you will not be able to call again this match in this event !',
                    [
                        {
                            text: "Don't leave",
                            style: 'cancel',
                            onPress: () => { },
                        },
                        {
                            text: 'Leave Call',
                            style: 'destructive',
                            onPress: () => {
                                navigation.dispatch(e.data.action);
                            },
                        },
                    ],
                );
            }
        });
    }, [goBackAuto]);
    const fetchUser = async () => {
        let user = await getUserDetail(route.params.data.user);
        setUserDetail(user);
    };

    const _onEndButtonPress = () => {
        setRoom('');
        setStatus('disconnected');
        twilioVideo.current.disconnect();
        navigation.navigate('StartEvent');
    };

    const _onMuteButtonPress = () => {
        console.log('Muted');
        twilioVideo.current
            .setLocalAudioEnabled(!isAudioEnabled)
            .then((isEnabled) => setIsAudioEnabled(isEnabled));
    };

    const _onVideoButtonPress = () => {
        console.log('Muted');
        twilioVideo.current
            .setLocalVideoEnabled(!isVideoEnabled)
            .then((isEnabled) => setIsVideoEnabled(isEnabled));
    };

    const _onFlipButtonPress = () => {
        setFlip(!flip);
        twilioVideo.current.flipCamera();
    };

    const _onRoomDidConnect = () => {
        console.log('connected');
        analytics().logEvent('user_event_call_connect', {
            event_id: event._id,
            registered_email: profile.email,
        });
        setStatus('connected');
    };

    const _onRoomDidDisconnect = ({ error }) => {
        console.log('_onRoomDidDisconnect');

        console.log('ERROR: ', error);

        setStatus('disconnected');
    };

    const _onRoomDidFailToConnect = (error) => {
        console.log('ERROR: ', error);
        console.log('_onRoomDidFailToConnect', token);

        setStatus('disconnected');
    };

    const _onParticipantAddedVideoTrack = ({ participant, track }) => {
        console.log('_onParticipantAddedVideoTrack');

        console.log('onParticipantAddedVideoTrack: ', participant, track);

        setVideoTracks(
            new Map([
                ...videoTracks,
                [
                    track.trackSid,
                    {
                        participantSid: participant.sid,
                        videoTrackSid: track.trackSid,
                    },
                ],
            ]),
        );
    };

    const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
        console.log('_onParticipantRemovedVideoTrack');

        console.log('onParticipantRemovedVideoTrack: ', participant, track);

        const videoTracks = new Map(videoTracks);
        videoTracks.delete(track.trackSid);

        setVideoTracks(videoTracks);
    };

    const _onNetworkLevelChanged = ({ participant, isLocalUser, quality }) => {
        console.log(
            'Participant',
            participant,
            'isLocalUser',
            isLocalUser,
            'quality',
            quality,
        );
    };

    return (
        <SafeAreaView
            edges={['bottom', 'left', 'right']}
            style={[styles.flex, styles.bgWhite]}>
            <ReportCall
                eventId={event._id}
                reporting={route.params.data.user}
                room={callData.room}
                reportCallVisible={reportCallVisible}
                setReportCallVisible={setReportCallVisible}
            />
            <View
                style={[localStyles.bgVideo, { backgroundColor: 'white' }]}
            >
                <View style={{ flex: 1, height: '100%', width: '100%' }}>
                    {status === 'connected' && (
                        <View style={{ height: '100%', width: '100%' }}>
                            {status === 'connected' && (
                                <View style={{ height: '100%', width: '100%' }}>
                                    {Array.from(
                                        videoTracks,
                                        ([trackSid, trackIdentifier]) => {
                                            return (
                                                <TwilioVideoParticipantView
                                                    key={trackSid}
                                                    trackIdentifier={
                                                        trackIdentifier
                                                    }
                                                    style={[localStyles.video]}
                                                />
                                            );
                                        },
                                    )}
                                </View>
                            )}

                            <TwilioVideoLocalView
                                enabled={true}
                                style={[localStyles.selfVideo]}
                            />
                        </View>
                    )}
                    <View
                        style={[
                            styles.pv_10,
                            styles.flex_column,
                            styles.mt_20,
                            localStyles.footerBar,
                        ]}>
                        <View style={[styles.mb_10]}>
                            {countDown !== 0 && (
                                <View
                                    style={[
                                        styles.flex_row,
                                        styles.justify_center,
                                    ]}>
                                    <View>
                                        <Text
                                            style={[styles.white, styles.f20]}>
                                            0
                                            {Math.floor(
                                                (countDown % (1000 * 60 * 60)) /
                                                (1000 * 60),
                                            )}{' '}
                                            :{' '}
                                            {Math.floor(
                                                (countDown % (1000 * 60)) /
                                                1000,
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                        <View
                            style={[
                                styles.flex,
                                styles.flex_row,
                                styles.items_center,
                                styles.justify_evenly,
                            ]}>
                            {isVideoEnabled ? (
                                <FAB
                                    onPress={_onVideoButtonPress}
                                    small
                                    color={theme.colors.white}
                                    style={[styles.bgWhiteT]}
                                    icon="video"
                                />
                            ) : (
                                    <FAB
                                        onPress={_onVideoButtonPress}
                                        color={theme.colors.white}
                                        small
                                        style={[styles.bgApp]}
                                        icon={'video-off'}
                                    />
                                )}
                            {isAudioEnabled ? (
                                <FAB
                                    onPress={_onMuteButtonPress}
                                    color={theme.colors.white}
                                    small
                                    style={[styles.bgWhiteT]}
                                    icon="volume-high"
                                />
                            ) : (
                                    <FAB
                                        onPress={_onMuteButtonPress}
                                        color={theme.colors.white}
                                        small
                                        style={[styles.bgWhiteT]}
                                        icon={'volume-off'}
                                    />
                                )}
                            <FAB
                                onPress={_onEndButtonPress}
                                color={theme.colors.white}
                                style={[styles.bgRed]}
                                icon="phone-hangup"
                            />
                            {flip ? (
                                <FAB
                                    onPress={_onFlipButtonPress}
                                    small
                                    color={theme.colors.white}
                                    style={[styles.bgWhiteT]}
                                    icon="camera-switch"
                                />
                            ) : (
                                    <FAB
                                        onPress={_onFlipButtonPress}
                                        small
                                        color={theme.colors.white}
                                        style={[styles.bgWhiteT]}
                                        icon="camera-switch"
                                    />
                                )}

                            <FAB
                                color={theme.colors.white}
                                small
                                onPress={() => setReportCallVisible(true)}
                                style={[styles.bgWhiteT]}
                                icon="alert-octagon"
                            />
                        </View>
                    </View>
                    <TwilioVideo
                        ref={twilioVideo}
                        onRoomDidConnect={_onRoomDidConnect}
                        onRoomDidDisconnect={_onRoomDidDisconnect}
                        onRoomDidFailToConnect={_onRoomDidFailToConnect}
                        onParticipantAddedVideoTrack={
                            _onParticipantAddedVideoTrack
                        }
                        onParticipantRemovedVideoTrack={
                            _onParticipantRemovedVideoTrack
                        }
                        onNetworkQualityLevelsChanged={_onNetworkLevelChanged}
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={[styles.phc_5]}>
                <Card style={[styles.mt_20]} elevation={3}>
                    <View
                        style={[
                            styles.flex_row,
                            styles.items_center,
                            styles.phc_3,
                            styles.pvc_3,
                        ]}>
                        <View style={[localStyles.flexB80]}>
                            <Avatar.Image
                                size={70}
                                source={{
                                    uri: userDetail && userDetail.photo,
                                }}
                            />
                        </View>
                        <View>
                            <Text style={[styles.f18, styles.bold]}>
                                {userDetail && userDetail.firstName}{' '}
                                {userDetail && userDetail.lastName}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.flex_row,
                            styles.items_center,
                            styles.phc_3,
                            styles.pvc_3,
                        ]}>
                        <View style={[localStyles.flexB80]}>
                            <Text style={[styles.bold, styles.f16]}>About</Text>
                        </View>
                        <View style={[styles.shrink]}>
                            <Text style={[styles.justify]}>
                                {userDetail && userDetail.about
                                    ? userDetail.about
                                    : 'Not mention!'}
                            </Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
            <LikeDislike
                ref={likeDislikeRef}
                user={callData.user}
                eventId={event._id}
            />
        </SafeAreaView>
    );
};
const localStyles = StyleSheet.create({
    bgVideo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        height: Dimensions.get('screen').height / 2,
    },
    video: {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
        height: '100%',
    },
    selfVideo: {
        flex: 1,
        width: 100,
        height: 120,
        position: 'absolute',
        right: 5,
        top: 5,
    },
    flexB80: {
        flexBasis: 80,
    },
    footerBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});
