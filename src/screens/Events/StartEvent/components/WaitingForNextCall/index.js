import React from 'react';
import {View, Text} from 'react-native';
import {strings} from '@constants';
import styles from '../../../../../../styles';
export const WaitingForNextCall = ({navigation}) => {
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
                        {strings.Events.startEvent.waitingForNextCallHeader}
                    </Text>
                </View>
                <View style={[styles.mt_20]}>
                    <View style={[styles.mt_20]}>
                        <Text style={[styles.black]}>
                            {
                                strings.Events.startEvent
                                    .waitingForNextCallHeaderCaption
                            }
                        </Text>
                        <Text style={[styles.black, styles.center]}>
                            {
                                strings.Events.startEvent
                                    .waitingForNextCallHeaderCaption1
                            }
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
};
