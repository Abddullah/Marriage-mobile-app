import React, {useState, useContext} from 'react';
import {TextInput, Platform, KeyboardAvoidingView, View} from 'react-native';
import {Button, FAB, Paragraph, Headline} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../../../styles';
import theme from '../../../../theme';
import {RoundButton} from '../../../components';
import {strings} from '../../../constants';
import { AppContext, AuthContext, ToastContext } from '../../../hooks';
export const Name = ({navigation}) => {
    const { doUpdateProfile, profile } = useContext(AuthContext);
    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const { openToast } = useContext(ToastContext )

    const saveProfile = () => {
        if (firstName?.trim().length > 0 && lastName?.trim().length > 0) {
            
        doUpdateProfile({
            firstName: firstName,
            lastName: lastName,
        }).then((ret) => {
            navigation.navigate('Email');
        });
        } else {
            openToast('error','Please enter first and last name')
        }
    };
    return (
        <SafeAreaView style={[styles.flex,
            styles.pv_20,
        styles.bgWhite]}>
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
                        {strings.Auth.name.header}
                    </Headline>
                    <Paragraph>{strings.Auth.name.caption}</Paragraph>
                </View>
                <View>
                    <TextInput
                        textContentType="name"
                        style={styles.input}
                        autoFocus={true}
                        placeholderTextColor={theme.colors.grey}
                        placeholder={strings.Auth.name.placeholder}
                        value={firstName}
                        underlineColor={theme.colors.primary}
                        onChangeText={(text) => setFirstName(text)}
                    />
                    <TextInput
                        textContentType="name"
                        style={styles.input}
                        placeholderTextColor={theme.colors.grey}
                        placeholder={strings.Auth.name.placeholder1}
                        value={lastName}
                        underlineColor={theme.colors.primary}
                        onChangeText={(text) => setLastName(text)}
                    />
                </View>
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
