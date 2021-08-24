import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Button, FAB} from 'react-native-paper';
import styles from '../../styles';
import ContinueProfileIcon from '../../assets/svgs/ContinueProfileIcon';
import theme from '../../theme';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wd,
} from 'react-native-responsive-screen';

const CompleteProfile = ({navigation}) => {
    return (
        <LinearGradient
            colors={['#0A2841', '#20525D']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            style={[styles.flex, styles.screensContents]}>
            <View style={[localStyles.wrapper]}>
                <View style={[styles.items_center]}>
                    <ContinueProfileIcon />
                </View>

                <View>
                    <Text
                        style={[
                            localStyles.firstSentence,
                            styles.center,
                            styles.screensContents,
                        ]}>
                        Would you like to complete your profile now?
                    </Text>

                    <Text
                        style={[
                            localStyles.secondSentence,
                            styles.center,
                            styles.screensContents,
                        ]}>
                        Completing will provide you with a stronger profile and
                        make you standout. It is recommended you complete but
                        feel free to do so later.
                    </Text>
                </View>

                <View style={[styles.flex_row, styles.justify_between]}>
                    <Button
                        mode="outlined"
                        labelStyle={styles.buttonLabel}
                        contentStyle={styles.buttonContentStyle}
                        style={[localStyles.btnCompleteNow]}
                        onPress={() => navigation.navigate('Sport')}>
                        Complete Now
                    </Button>
                    <Button
                        mode="outlined"
                        labelStyle={styles.buttonLabel}
                        contentStyle={styles.buttonContentStyle}
                        style={[localStyles.btnCompleteLater]}
                        onPress={() => navigation.navigate('Sport')}>
                        Complete Later
                    </Button>
                </View>
            </View>
        </LinearGradient>
    );
};

export default CompleteProfile;
const localStyles = StyleSheet.create({
    wrapper: {
        marginTop: hp('5%'),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '100%',
    },
    firstSentence: {
        color: theme.colors.surface,
        fontSize: 26,
    },
    secondSentence: {
        marginTop: hp('5%'),
        color: theme.colors.placeholder,
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 15,
    },
    btnCompleteNow: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.buttonActive,
        flexBasis: wd('40%'),
        marginRight: wd('5%'),
    },
    btnCompleteLater: {
        borderColor: theme.colors.primary,
        flexBasis: wd('40%'),
        marginRight: wd('5%'),
    },
});
