import React from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import styles from '../../../../styles';
import theme from '../../../../theme';
import {strings} from '../../../constants';

export const AttendEvent = ({navigation}) => {
    const insets = useSafeAreaInsets();

    const navigateTo = (to) => {
        navigation.navigate(to);
    };
    return (
        <SafeAreaView edges={['bottom']} style={[styles.flex, styles.bgWhite]}>
            <StatusBar barStyle="light-content" />
            <ImageBackground
                style={[localStyles.bgImg]}
                source={{
                    uri:
                        'https://images.pexels.com/photos/5076309/pexels-photo-5076309.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                }}>
                <View style={[localStyles.profileBtn, {marginTop: insets.top}]}>
                    <IconButton
                        onPress={() => navigateTo('Profile')}
                        icon="account"
                        color={theme.colors.primary}
                    />
                </View>
            </ImageBackground>
            <View>
                <View
                    style={[
                        styles.phc_5,
                        styles.borderBottom,
                        localStyles.ptb,
                    ]}>
                    <View>
                        <Text style={[styles.f20, styles.f600]}>
                            {strings.Events.attendEvent.find_match}
                        </Text>
                    </View>
                    <View>
                        <Text style={[styles.f16, styles.gray]}>
                            {strings.Events.attendEvent.find_match_caption}
                        </Text>
                    </View>
                </View>
                <View
                    style={[
                        styles.phc_5,
                        localStyles.ptb,
                        styles.flex_row,
                        styles.justify_between,
                    ]}>
                    <Button
                        mode="text"
                        contentStyle={[styles.buttonContentStyleSm]}
                        labelStyle={[styles.textDefault]}
                        style={[styles.mt_20, styles.buttonContainer]}>
                        {strings.Events.attendEvent.avalibility}
                    </Button>
                    <Button
                        mode="contained"
                        dark
                        contentStyle={[styles.buttonContentStyleSm]}
                        labelStyle={[styles.textDefault]}
                        style={[styles.mt_20, styles.buttonContainer]}>
                        {strings.Events.attendEvent.attend_event_btn}
                    </Button>
                </View>
                <View
                    style={[
                        styles.phc_5,
                        localStyles.ptb,
                        styles.flex_row,
                        styles.justify_between,
                    ]}>
                    <View style={[styles.flex_row, styles.items_start]}>
                        <View style={[localStyles.iconWrapper]}>
                            <Image
                                style={[localStyles.iconImge]}
                                source={require('../../../assets/icons/congratsIcon.png')}
                            />
                        </View>
                        <View style={[styles.ml_10]}>
                            <View style={[styles.pv_10]}>
                                <Text style={[styles.f600, styles.f18]}>
                                    {
                                        strings.Events.attendEvent
                                            .attend_event_btn
                                    }
                                </Text>
                            </View>
                            <View style={[styles.shrink]}>
                                <Text style={[styles.f12]}>
                                    {
                                        strings.Events.attendEvent
                                            .attend_event_btn
                                    }
                                    Members of our comminuty throw private
                                    events for different groups.
                                </Text>
                                <Text style={[styles.f12]}>
                                    {strings.Events.attendEvent.enter_code}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
const localStyles = StyleSheet.create({
    ptb: {
        paddingVertical: 20,
    },
    profileBtn: {
        position: 'absolute',
        zIndex: 2,
        right: 10,
    },
    bgImg: {
        width: '100%',
        height: Dimensions.get('screen').height / 2.2,
    },
    iconWrapper: {
        padding: 12,
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
    },
    iconImge: {
        height: 20,
        width: 20,
        backgroundColor: theme.colors.primary,
    },
});
