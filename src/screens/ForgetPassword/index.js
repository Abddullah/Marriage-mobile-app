import React, {useContext, useState} from 'react';
import {TextInput, View} from 'react-native';
import {Button, Headline, Paragraph} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../../styles';
import theme from '../../../theme';
import {strings} from '../../constants/strings';
import {AuthContext} from '../../hooks/auth';
import {ToastContext} from '../../hooks/providers/Toast';
// import { useAuth } from '../../hooks/auth'
export const ForgetPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const {doLogin} = useContext(AuthContext);
    const {setToast} = useContext(ToastContext);
    const navigateTo = (name) => {
        navigation.navigate(name);
    };
    return (
        <SafeAreaView
            style={[
                styles.flex,
                styles.bgWhite,
                styles.screensContents,
                styles.justify_center,
            ]}>
            {/* <View style={[styles.items_center]}> */}
            {/* <Image source={Logo} /> */}
            {/* </View> */}
            <Headline
                style={[
                    styles.primary,
                    styles.bold,
                    styles.f26,
                    styles.center,
                    styles.mb_20,
                ]}>
                {strings.forgetPassword.header}
            </Headline>

            <Paragraph>{strings.forgetPassword.caption}</Paragraph>

            <TextInput
                textContentType="telephoneNumber"
                style={styles.input}
                mode="outlined"
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
            />
            <Button
                mode="contained"
                dark
                onPress={() => doLogin({email: email, password: password})}
                contentStyle={[styles.buttonContentStyle]}
                style={[styles.mt_20, styles.buttonContainer]}>
                {strings.forgetPassword.btn}
            </Button>
        </SafeAreaView>
    );
};
