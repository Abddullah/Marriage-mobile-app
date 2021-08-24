import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styles from '../../../../../../styles';
import theme from '../../../../../../theme';
export const Waiting = ({countDown}) => {
    return (
        <View style={[styles.flex_row, localStyles.timers]}>
            <View style={[styles.timerCells]}>
                <Text style={[styles.white, styles.f12, styles.bold]}>
                    {Math.floor(countDown / (1000 * 60 * 60 * 24))}d
                </Text>
            </View>
            <View style={[styles.timerCells]}>
                <Text style={[styles.white, styles.f12, styles.bold]}>
                    {Math.floor(
                        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                    )}
                    h
                </Text>
            </View>
            <View style={[styles.timerCells]}>
                <Text style={[styles.white, styles.f12, styles.bold]}>
                    {Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))}m
                </Text>
            </View>
            <View style={[styles.timerCells]}>
                <Text style={[styles.white, styles.f12, styles.bold]}>
                    {Math.floor((countDown % (1000 * 60)) / 1000)}s
                </Text>
            </View>
        </View>
    );
};
const localStyles = StyleSheet.create({
    timers: {
        width: 140,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: theme.colors.white,
        backgroundColor: 'transparent',
    },
});
