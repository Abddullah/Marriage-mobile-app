import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../../../styles';
export const MikeCamera = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.bgWhite, styles.flex]}>
            <ScrollView contentContainerStyle={[styles.phc_5]}>
                <View>
                    <Text>Mike Camera</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
