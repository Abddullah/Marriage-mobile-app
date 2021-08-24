import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { theme } from '@theme';
import { strings } from '@constants';

import styles from '../../../../../../styles';
export const Waiting = ({ navigation, countDown }) => {
    return (
        <>
            <View
                style={[
                    styles.items_center,
                    styles.justify_center,
                    { flexGrow: 1 },
                ]}>
                <View style={[styles.flex_row, localStyles.timer]}>
                    <View style={[styles.timerCell]}>
                        <Text style={[styles.white, styles.f26]}>
                            {Math.floor(countDown / (1000 * 60 * 60 * 24))}d
                        </Text>
                    </View>
                    <View style={[styles.timerCell]}>
                        <Text style={[styles.white, styles.f26]}>
                            {Math.floor(
                                (countDown % (1000 * 60 * 60 * 24)) /
                                (1000 * 60 * 60),
                            )}
                            h
                        </Text>
                    </View>
                    <View style={[styles.timerCell]}>
                        <Text style={[styles.white, styles.f26]}>
                            {Math.floor(
                                (countDown % (1000 * 60 * 60)) / (1000 * 60),
                            )}
                            m
                        </Text>
                    </View>
                    <View style={[styles.timerCell]}>
                        <Text style={[styles.white, styles.f26]}>
                            {Math.floor((countDown % (1000 * 60)) / 1000)}s
                        </Text>
                    </View>
                </View>
                <View style={[styles.mt_20]}>
                    <Text style={[styles.black, styles.f26, styles.bold]}>
                        {strings.Events.startEvent.offlineHeader}
                    </Text>
                </View>
                <View style={[styles.mt_20]}>
                    <Text style={[styles.black]}>
                        {strings.Events.startEvent.offlineCaption1}
                    </Text>
                    <Text style={[styles.black, styles.center]}>
                        {strings.Events.startEvent.offlineCaption2}
                    </Text>
                </View>
            </View>
        </>
    );
};

const localStyles = StyleSheet.create({

    timer: {
        width: 330,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: theme.colors.white,
        backgroundColor: 'transparent',
    }
});
