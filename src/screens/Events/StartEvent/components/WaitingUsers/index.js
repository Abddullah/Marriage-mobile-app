import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@theme';
import styles from '../../../../../../styles';
import {strings} from '../../../../../constants';
import {variables} from '../../../../../constants/variables';
export const WaitingUsers = ({navigation}) => {
    const [countDown, setCountDown] = useState(null);
    useEffect(() => {
        var s = new Date();
        s.setMinutes(s.getMinutes() + variables.callDuration);
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

    return (
        <>
            <View
                style={[
                    styles.items_center,
                    styles.justify_center,
                    {flexGrow: 1},
                ]}>
                <View style={[styles.mt_20]}>
                    <Text style={[styles.black, styles.f26, styles.bold]}>
                        {strings.Events.startEvent.waitingForUserHeader}
                    </Text>
                </View>
                <View style={[styles.mt_20]}>
                    <View style={[styles.mt_20]}>
                        <Text style={[styles.black]}>
                            {
                                strings.Events.startEvent
                                    .waitingForUserHeaderCaption
                            }
                        </Text>
                    </View>
                </View>
                <View style={[styles.mt_20]}>
                    {countDown !== 0 && (
                        <View style={[styles.flex_row, styles.justify_center]}>
                            <View>
                                <Text style={[styles.black, styles.f20]}>
                                    0
                                    {Math.floor(
                                        (countDown % (1000 * 60 * 60)) /
                                            (1000 * 60),
                                    )}{' '}
                                    :{' '}
                                    {Math.floor(
                                        (countDown % (1000 * 60)) / 1000,
                                    )}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </>
    );
};