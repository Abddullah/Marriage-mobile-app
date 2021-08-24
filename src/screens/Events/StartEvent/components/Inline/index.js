import React from 'react';
import {View, Text} from 'react-native';

import styles from '../../../../../../styles';
import {strings} from '../../../../../constants';
export const Inline = ({navigation}) => {
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
                        {strings.Events.startEvent.inlineHeader}
                    </Text>
                </View>
                <View style={[styles.mt_20]}>
                    <View style={[styles.mt_20]}>
                        <Text style={[styles.black]}>
                            {strings.Events.startEvent.inlineCaption1}
                        </Text>
                        <Text style={[styles.black, styles.center]}>
                            {strings.Events.startEvent.inlineCaption2}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
};
