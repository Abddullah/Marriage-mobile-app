import React, {useContext, useEffect, useState} from 'react';
import {
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import {Button, FAB, Paragraph, Headline} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../../../styles';
import theme from '../../../../theme';
// import {strings} from '@constants';
import {AuthContext} from '../../../hooks/auth';
import {ToastContext} from '../../../hooks/providers/Toast';
import {LoginButton, LoginManager, AccessToken} from 'react-native-fbsdk';
import {RoundButton} from '../../../components';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
// import { useAuth } from '../../hooks/auth'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {strings} from '../../../constants';
const CELL_COUNT = 6;

export const OTP = ({navigation}) => {
    const [code, setCode] = useState('');
    const [value, setValue] = useState('');
    const {openToast} = useContext(ToastContext);
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const {
        phoneNumber,
        countryCode,
        countryDailCode,
        country,
        doGetOTP,
        doVerifyOTP,
        doAddFcmToken,
    } = useContext(AuthContext);
    const {setToast} = useContext(ToastContext);
    const [timer, setTimer] = useState(30);
    const verifyOTP = async () => {
        if (value.length < 6) {
            openToast('error', 'Please enter 6 digits code.');
        } else {
            doVerifyOTP({
                navigation: navigation,
                phoneNumber: `${countryDailCode}${phoneNumber}`,
                country,
                code: value,
            })
                .then(async () => {
                    await doAddFcmToken();
                })
                .catch(() => {});
        }
    };
    const getOTP = () => {
        doGetOTP({
            phoneNumber: phoneNumber,
            countryDailCode: countryDailCode,
            resend: true,
        })
            .then((ret) => {
                startTimer();
            })
            .catch((err) => {});
    };

    useEffect(() => {
        startTimer();
    }, []);

    const startTimer = () => {
        setTimer(30);
        let ID = setInterval(() => {
            if (timer == 0) {
                clearInterval(ID);
            } else {
                setTimer((state) => {
                    console.log(state);
                    console.log(typeof state);
                    if (state < 2) {
                        clearInterval(ID);
                    } else {
                        return state - 1;
                    }
                });
            }
        }, 1000);
        return () => {
            clearInterval(ID);
            setTimer(30);
        };
    };
    return (
        <SafeAreaView style={[styles.flex, styles.pv_20, styles.bgWhite]}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                style={[
                    styles.flex,
                    styles.screensContents,
                    styles.justify_between,
                ]}
                behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <View>
                    <Headline
                        style={[
                            styles.primary,
                            styles.bold,
                            styles.f26,
                            styles.mb_20,
                        ]}>
                        {strings.Auth.OTP.header}
                    </Headline>
                    <Paragraph>
                        {strings.Auth.OTP.caption} {country}({countryCode})
                        {countryDailCode}
                        {phoneNumber}
                    </Paragraph>
                </View>
                <View>
                    {/* <CodeField
            ref={ref}
                        {...props}
                        focusable={true}
                                            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={localStyles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[localStyles.cell, isFocused && localStyles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      /> */}
                    <TextInput
                        // textContentType="oneTimeCode"
                        style={styles.input}
                        mode="outlined"
                        autoFocus={true}
                        importantForAutofill="true"
                        keyboardType="numeric"
                        placeholder={strings.Auth.OTP.placeholder}
                        value={value}
                        underlineColor={theme.colors.primary}
                        onChangeText={(text) => setValue(text)}
                    />
                    {/* <View><Text>Not received code ?</Text></View> */}
                    {timer > 1 ? (
                        <View style={[styles.mt_30]}>
                            <Text>
                                {strings.Auth.OTP.resend} 00:{timer < 10 && '0'}
                                {timer}{' '}
                            </Text>
                        </View>
                    ) : (
                        <Button
                            onPress={getOTP}
                            mode="text"
                            labelStyle={[styles.buttonLabel]}
                            style={[styles.self_center, styles.mt_30]}>
                            Resend Code
                        </Button>
                    )}
                </View>

                <View
                    style={[
                        styles.flex_row,
                        styles.justify_between,
                        styles.items_center,
                    ]}>
                    <FAB
                        onPress={() => navigation.goBack()}
                        icon="arrow-left"
                        style={[styles.bgWhite]}
                    />
                    <FAB
                        onPress={verifyOTP}
                        icon="arrow-right"
                        color={theme.colors.white}
                        style={[styles.bgApp]}
                    />
                    <View style={[localStyles.rightItem]} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
const localStyles = StyleSheet.create({
    rightItem: {width: 56, height: 56},
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
        flex: 1,
        marginRight: 10,
        //   width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.grey,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: theme.colors.primary,
    },
    timers: {
        width: 140,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: theme.colors.white,
        backgroundColor: 'transparent',
    },
});
