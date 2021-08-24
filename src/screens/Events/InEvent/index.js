import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    StyleSheet,
} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../../../styles';
import theme from '../../../../theme';
import {strings} from '../../../constants';
export const InEvent = (params) => {
    return (
        <SafeAreaView edges={['bottom']}>
            <ImageBackground
                style={[localStyles.bgImg]}
                source={require('../../../assets/images/timerBgImage.png')}>
                <View style={[styles.mt_20]}>
                    <Text style={[styles.white, styles.f26, styles.bold]}>
                        {strings.Events.inEvent.header}
                    </Text>
                </View>
            </ImageBackground>
            <ScrollView contentContainerStyle={[styles.phc_5]}>
                {[1, 3, 6, 7, 8, 9, 12, 34, 56, 78, 4].map((i) => {
                    return (
                        <Card style={[styles.mt_20]}>
                            <View
                                style={[
                                    styles.flex_row,
                                    styles.justify_between,
                                    styles.items_center,
                                    styles.phc_3,
                                    styles.pvc_3,
                                ]}>
                                <View>
                                    <Image
                                        style={[localStyles.userImg]}
                                        source={require('../../../assets/icons/faceFemale.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={[styles.f26, styles.bold]}>
                                        Fatima
                                    </Text>
                                    <Text style={[styles.f12]}>
                                        Your date is in 2 minutes
                                    </Text>
                                </View>
                                <View style={[styles.flex_row]}>
                                    <IconButton
                                        size={25}
                                        icon="camera"
                                        color={theme.colors.red}
                                    />
                                    <IconButton
                                        size={25}
                                        icon="close"
                                        color={theme.colors.red}
                                    />
                                </View>
                            </View>
                        </Card>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};
const localStyles = StyleSheet.create({
    ptb: {
        paddingVertical: 20,
    },
    mtb: {
        marginVertical: 20,
    },
    bgImg: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('screen').height / 2.5,
    },
    userImg: {width: 60, height: 60},
});
