import React, {
    useState,
    forwardRef,
    useImperativeHandle,
    useContext,
} from 'react';
import {
    StyleSheet,
    Animated,
} from 'react-native';
import {Button, Card} from 'react-native-paper';
import styles from '../../../../../../styles';
import {EventContext} from '../../../../../hooks/event';
import {AuthContext} from '../../../../../hooks/index';
import analytics from '@react-native-firebase/analytics';
import {MatchContext} from '../../../../../hooks/providers/Match';
import { strings } from '../../../../../constants';

export const LikeDislike = forwardRef((props, ref) => {
    const {doAddMatch} = useContext(MatchContext);
    const [bottom, setBottom] = useState(new Animated.Value(-500));
    const [height, setHeight] = useState(0);
    const {event} = useContext(EventContext);
    const {profile} = useContext(AuthContext);
    const [likeDislike, setLikeDislike] = useState(false);

    useImperativeHandle(ref, () => ({
        openAsk() {
            openLikeDislike();
        },
        closeAsk() {
            closeLikeDislike();
        },
    }));

    const addMatch = () => {
        const userProperties = {
            event_id: event._id,
            matched_user: profile.email,
            registered_user: profile.email,
            registered_gender: profile.gender,
        };
        analytics().setUserProperties(userProperties);
        analytics().logEvent('event_matched_user', userProperties);
        doAddMatch({user: props.user, eventId: props.eventId})
            .then(() => {
                closeLikeDislike();
            })
            .catch(() => {
                closeLikeDislike();
            });
    };
    const openLikeDislike = () => {
        setLikeDislike(true);
        Animated.spring(bottom, {
            bounciness: 10,
            speed: 15,
            toValue: 45,
            duration: 700,
        }).start();
    };
    const closeLikeDislike = () => {
        logAnalyticsOnPass();
        Animated.spring(bottom, {
            bounciness: 10,
            speed: 15,
            toValue: -500,
            duration: 700,
        }).start();
        setTimeout(() => {
            setHeight(0);
        }, 500);
    };

    const logAnalyticsOnPass = () => {
        const userProperties = {
            event_id: event._id,
            unMatched_user: profile.email,
            registered_user: profile.email,
            registered_gender: profile.gender,
        };
        analytics().setUserProperties(userProperties);
        analytics().logEvent('event_unmatched_user', userProperties);
    };

    return (
        <Animated.View
            style={[
                // styles.bgApp,
                localStyles.wrapper_white,
                {bottom: bottom},
            ]}>
            <Card>
                <Card.Content>
                    <Button
                        onPress={addMatch}
                        dark
                        mode="contained"
                        style={[
                            styles.mt_15,
                            styles.buttonContainer,
                            styles.self_center,
                        ]}
                        contentStyle={[styles.buttonContentStyle]}
                        icon={'heart'}>
                        {strings.Call.likeDislike.like}
                    </Button>
                    <Button
                        onPress={closeLikeDislike}
                        dark
                        mode="contained"
                        style={[
                            styles.mt_15,
                            styles.buttonContainer,
                            styles.self_center,
                        ]}
                        contentStyle={[styles.buttonContentStyle]}
                        icon={'thumb-down'}>
                        {strings.Call.likeDislike.dislike}
                    </Button>
                    {/* <FAB
                        style={[styles.self_center,styles.bgBlack,styles.mt_15]}
                        underlayColor={theme.colors.white}
                        onPress={closeLikeDislike}
                        icon="close"
                    /> */}
                </Card.Content>
            </Card>
        </Animated.View>
    );
});

const localStyles = StyleSheet.create({
    wrapper_white: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderRadius: 10,
        right: '5%',
        left: '5%',
        zIndex: 5,
        paddingLeft: 0,
        overflow: 'hidden',
    },
});
