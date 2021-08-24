import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../../../styles';
export const ContactUs = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.bgWhite, styles.flex]}>
            <ScrollView contentContainerStyle={[styles.phc_5]}>
                <View>
                    <Text>Contact Us</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
