import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Button} from 'react-native-paper';
import analytics from '@react-native-firebase/analytics';
import moment from 'moment';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Started} from '../Started';
import {Ended} from '../Ended';
import styles from '../../../../../../styles';
import theme from '../../../../../../theme';
import {EventContext} from '../../../../../hooks/event';
import {AppContext, AuthContext, ToastContext} from '../../../../../hooks';
import {Waiting} from '../Waiting';
const CELL_COUNT = 4;

export const Item =  ({navigation, e}) => {
    const {doJoinEvent, doAttendEvent, setEvent, doLeaveEvent} = useContext(
        EventContext,
    );
    const {profile} = useContext(AuthContext);
    const {socket} = useContext(AppContext);
    const {openToast} = useContext(ToastContext);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [countDown, setCountDown] = useState(e.dataTime);
    const [intId, setIntId] = useState(null);

    useEffect(() => {
        checkTime();
        let ID = setInterval(() => {
            // console.log(new Date(e.dateTime).getTime());
            console.log(new Date().getTime());
            if (new Date(e.dateTime).getTime() < new Date().getTime()) {
                clearInterval(ID);
                setCountDown(0);
                clearInterval(intId);
            } else {
                setCountDown(
                    new Date(e.dateTime).getTime() - new Date().getTime(),
                );
            }
        }, 1000);
        console.log(ID)
        setIntId(ID);
        return () => {
            console.log(ID)
            // alert('clear')
            clearInterval(ID);
        }
    }, []);

    const checkTime = () => {
        if (new Date(e.dateTime).getTime() < new Date().getTime()) {
            setCountDown(0);
        } else {
            setCountDown(new Date(e.dateTime).getTime() - new Date().getTime());
        }
    };

    const joinEvent = () => {
        if (value.length < 4) {
            openToast('error', 'Please enter code.');
        } else {
            doJoinEvent({eventId: e._id, code: value})
                .then((ret) => {
                    setValue('');
                })
                .catch(() => {});
        }
    };

    const leaveEvent = () => {
        doLeaveEvent({eventId: e._id, code: value})
            .then((ret) => {
                console.log('user leaved event successfully');
            })
            .catch(() => {
                console.log('user leaved event error');
            });
    };

    const openEvent = async () => {
        doAttendEvent({
            event: e._id,
            user: profile._id,
            gender: profile.gender,
        })
            .then(() => {
                setEvent(e);
                const userProperties = {
                    attended_user: profile.email,
                    attended_user_gender: profile.gender,
                    registered_email: profile.email,
                    registered_gender: profile.gender,
                    event_id: e._id,
                };
                analytics().setUserProperties(userProperties);
                analytics().logEvent('user_attend_event', userProperties);
                socket.emit('join-event', {
                    event: e,
                    user: profile._id,
                    gender: profile.gender,
                });
                console.log('join evnet hit,', profile);
                navigation.navigate('StartEvent');
            })
            .catch(() => {});
        // console.log(e,'here I console the value of the e');
    };

    return (
        <Card
            elevation={1}
            // onPress={openEvent}

            style={[
                // styles.pv_10,
                styles.bgWhite,
                styles.mt_10,
                styles.mhc_5,
            ]}>
            <Card.Content>
                <View style={[styles.flex_row, styles.justify_start]}>
                    <View style={[styles.flex]}>
                        <Text style={[styles.f20, styles.bold]}>{e.name}</Text>
                        <View
                            style={[
                                styles.flex_row,
                                styles.items_center,
                                styles.justify_between,
                            ]}>
                            <View>
                                <Text>
                                    {' '}
                                    {moment(e.dateTime).format(
                                        'YYYY-MM-DD hh:mm:ss',
                                    )}{' '}
                                </Text>
                            </View>

                            {(countDown === 0 && e.status === 0) ||
                            (countDown === 0 && e.status === 1) ? (
                                <Started />
                            ) : countDown === 0 && e.status === 2 ? (
                                <Ended />
                            ) : (
                                <Waiting countDown={countDown} />
                            )}
                        </View>

                        <Text
                            style={[styles.f300, styles.justify, styles.mt_5]}>
                            {e.notes}
                        </Text>
                    </View>
                </View>
                <View style={[styles.flex]}>
                    {e.type === 'free' ? (
                        <>
                            {countDown === 0 && e.status === 2 ? (
                                <View>
                                    <Text />
                                </View>
                            ) : (
                                <Button
                                    onPress={openEvent}
                                    mode="contained"
                                    color={theme.colors.pr}
                                    dark
                                    style={[
                                        styles.mt_20,
                                        styles.buttonContainer,
                                    ]}
                                    contentStyle={[styles.buttonContentStyle]}
                                    labelStyle={[styles.buttonLabel]}>
                                    Attend Event
                                </Button>
                            )}
                        </>
                    ) : (
                        <>
                            {countDown === 0 && e.status === 2 ? (
                                <View>
                                    <Text />
                                </View>
                            ) : (
                                <>
                                    {profile &&
                                    profile.events.includes(e._id) ? (
                                        <>
                                            <Button
                                                onPress={openEvent}
                                                mode="contained"
                                                color={theme.colors.pr}
                                                dark
                                                style={[
                                                    styles.mt_20,
                                                    styles.buttonContainer,
                                                ]}
                                                contentStyle={[
                                                    styles.buttonContentStyle,
                                                ]}
                                                labelStyle={[
                                                    styles.buttonLabel,
                                                ]}>
                                                Attend Event
                                            </Button>
                                            <Button
                                                onPress={leaveEvent}
                                                mode="contained"
                                                color={theme.colors.black}
                                                dark
                                                style={[
                                                    styles.mt_10,
                                                    styles.buttonContainer,
                                                ]}
                                                contentStyle={[
                                                    styles.buttonContentStyle,
                                                ]}
                                                labelStyle={[
                                                    styles.buttonLabel,
                                                ]}>
                                                leave
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <CodeField
                                                ref={ref}
                                                {...props}
                                                value={value}
                                                onChangeText={setValue}
                                                cellCount={CELL_COUNT}
                                                rootStyle={
                                                    localStyles.codeFieldRoot
                                                }
                                                keyboardType="default"
                                                // enablesReturnKeyAutomatically="true"
                                                // returnKeyType="done"
                                                renderCell={({
                                                    index,
                                                    symbol,
                                                    isFocused,
                                                }) => (
                                                    <Text
                                                        key={index}
                                                        style={[
                                                            localStyles.cell,
                                                            isFocused &&
                                                                localStyles.focusCell,
                                                        ]}
                                                        onLayout={getCellOnLayoutHandler(
                                                            index,
                                                        )}>
                                                        {symbol ||
                                                            (isFocused ? (
                                                                <Cursor />
                                                            ) : null)}
                                                    </Text>
                                                )}
                                            />

                                            <Button
                                                onPress={joinEvent}
                                                mode="contained"
                                                dark
                                                style={[
                                                    styles.mt_20,
                                                    styles.buttonContainer,
                                                ]}
                                                contentStyle={[
                                                    styles.buttonContentStyle,
                                                ]}
                                                labelStyle={[
                                                    styles.buttonLabel,
                                                ]}>
                                                join
                                            </Button>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </View>
            </Card.Content>
        </Card>
    );
};

const localStyles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
        flex: 1,
        marginRight: 10,
        //   width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.grey,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: theme.colors.primary,
    },
});
