import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, IconButton, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../../styles';
import theme from '../../../theme';
import { AuthContext } from '../../hooks';
import { SettingTabs } from '../../components'
export const SettingsScreen = ({ navigation }) => {
    const { doBlockAccount } = useContext(AuthContext);

    const blockAccount = () => {
        doBlockAccount()
            .then(async () => {
                await AsyncStorage.removeItem('token');
                navigation.navigate('StartUp');
            })
            .catch(() => { });
    };
    const navigateTo = (name) => {
        navigation.navigate(name);
    };


    const [list, setList] = useState([
        { title: 'Update Profile', type: 'screen', name: 'UpdateProfile' },
        { title: 'Contact Us', type: 'url', name: 'ContactUs', link: "https://muslimmarriagequiz.typeform.com/to/QZhuNcHJ" },
        { title: 'FAQ', type: 'url', name: 'FAQ', link: "https://www.1umatch.com/faq" },
        { title: 'Terms of Services', type: 'url', name: 'Terms', link: 'https://www.1umatch.com/terms-of-service' },
        { title: 'Privacy Policy', type: 'url', name: 'PrivacyPolicy', link: 'https://www.1umatch.com/privacy-policy' },
    ]);
    return (
        <SafeAreaView style={[styles.bgWhite, styles.flex]} edges={['bottom']}>
            <ScrollView>
                {list.map((item, index) => (
                    <SettingTabs navigation={navigation} props={item} />
                ))}
            </ScrollView>
            <View
                style={[
                    styles.flex_row,
                    styles.phc_5,
                    styles.justify_evenly,
                    styles.mb_20,
                ]}>
                <Button
                    mode="contained"
                    dark
                    labelStyle={[styles.buttonLabel]}
                    contentStyle={[styles.buttonContentStyle]}
                    style={[styles.flex, styles.mr_10, styles.buttonContainer]}>
                    Rate Us
                </Button>
                <Button
                    mode="contained"
                    color={theme.colors.black}
                    dark
                    onPress={blockAccount}
                    labelStyle={[styles.buttonLabel]}
                    contentStyle={[styles.buttonContentStyle]}
                    style={[styles.flex, styles.ml_10, styles.buttonContainer]}>
                    Delete Account
                </Button>
            </View>
        </SafeAreaView>
    );
};
