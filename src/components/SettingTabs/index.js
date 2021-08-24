import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, IconButton, TouchableRipple } from 'react-native-paper';
import styles from '../../../styles';
import theme from '../../../theme'
export const SettingTabs = ({ navigation, props }) => {
    return (
        <TouchableRipple
            onPress={() => props.type == 'url' ? Linking.openURL(props.link) : navigation.navigate(props.name)}
            style={[styles.mt_10]} >
            <View
                style={[
                    styles.flex_row,
                    styles.justify_between,
                    styles.items_center,
                    styles.phc_5,
                    styles.pv_5,
                    // styles.pvc_3,
                ]}>
                <View>
                    <Text
                        style={[
                            styles.f18,
                            styles.gray,
                            // styles.bold,
                        ]}>
                        {props.title}
                    </Text>
                </View>
                <View style={[styles.flex_row]}>
                    <IconButton
                        size={25}
                        icon="arrow-right"
                        color={theme.colors.primary}
                    />
                </View>
            </View>
        </TouchableRipple>
    );
};
