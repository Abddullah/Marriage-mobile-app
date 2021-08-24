import React, { useState, useContext } from 'react';
import { TextInput, Platform, KeyboardAvoidingView, View } from 'react-native';
import { FAB, Headline, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import analytics from '@react-native-firebase/analytics';
import styles from '../../../../styles';
import theme from '../../../../theme';
import { strings } from '../../../constants';
import { AuthContext, ToastContext } from '../../../hooks';
export const Email = ({ navigation }) => {
    const { doUpdateProfile, profile } = useContext(AuthContext);
    const [email, setEmail] = useState(profile.email);
    const { openToast } = useContext(ToastContext);

    const validateEmail = (l) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email.replace(/\s/g, '')).toLowerCase());
    };
    const saveProfile = () => {
        if (validateEmail()) {
            doUpdateProfile({
                email: email,
            }).then((ret) => {
                analytics().setUserProperty('registered_email', email);
                navigation.navigate('Gender');
            });
        } else {
            openToast('error', 'Please enter valid email');
        }
    };
    return (
        <SafeAreaView style={[styles.flex, styles.pv_20, styles.bgWhite]}>
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
                        {strings.Auth.email.header}
                    </Headline>
                    <Paragraph>{strings.Auth.email.caption}</Paragraph>
                </View>

                <TextInput
                    textContentType="name"
                    style={styles.input}
                    autoCapitalize={'none'}
                    autoFocus={true}
                    placeholderTextColor={theme.colors.grey}
                    placeholder={strings.Auth.email.placeholder}
                    value={email}
                    underlineColor={theme.colors.primary}
                    onChangeText={(text) => setEmail(text)}
                />
                <View style={[styles.justify_center, styles.items_center]}>
                    <FAB
                        onPress={saveProfile}
                        icon="arrow-right"
                        color={theme.colors.white}
                        style={[styles.bgApp]}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
