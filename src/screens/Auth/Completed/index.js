import React, {useEffect, useState, useContext} from 'react';
import {TextInput, View} from 'react-native';
import {
    Button,
    Paragraph,
    Caption,
    Headline,
    FAB,
    IconButton,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import analytics from '@react-native-firebase/analytics';
import styles from '../../../../styles';
import theme from '../../../../theme';
import {RoundButton} from '../../../components';
import {strings} from '../../../constants';
import {AppContext, AuthContext} from '../../../hooks';
import { StackActions } from '@react-navigation/native';
export const Completed = ({navigation}) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {doSignup} = useContext(AuthContext);

    useEffect(() => {
        analytics().logSignUp({method: 'phoneNumber'});
    }, []);
    const navigateToHome = () => {
        navigation.dispatch(StackActions.replace('Tab'));
    };

    return (
        <SafeAreaView
            style={[
                styles.flex,
                styles.bgWhite,
                styles.phc_5,
                styles.center,
                styles.pv_20,
                styles.justify_between,
            ]}>
            <View>
                <Headline
                    style={[
                        styles.primary,
                        styles.bold,
                        styles.f26,
                        styles.center,
                        styles.mb_20,
                    ]}>
                    {strings.Auth.completed.header}
                </Headline>
                <Paragraph style={[styles.center]}>
                    {strings.Auth.completed.caption}
                </Paragraph>
            </View>
            <View style={[styles.justify_center, styles.items_center]}>
                <IconButton
                    style={[styles.bgApp]}
                    size={100}
                    color={theme.colors.white}
                    icon="check"
                />
            </View>
            <View style={[styles.justify_center, styles.items_center]}>
                <FAB
                    onPress={navigateToHome}
                    icon="arrow-right"
                    color={theme.colors.white}
                    style={[styles.bgApp]}
                />
            </View>
        </SafeAreaView>
    );
};
