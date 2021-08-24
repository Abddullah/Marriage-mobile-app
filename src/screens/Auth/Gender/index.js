import React, {useState, useContext} from 'react';
import {TextInput, KeyboardAvoidingView, Platform, View} from 'react-native';
import {Button, FAB, Caption, Headline, Paragraph} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import analytics from '@react-native-firebase/analytics';
import styles from '../../../../styles';
import theme from '../../../../theme';
import {RoundButton} from '../../../components';
import {strings} from '../../../constants';
import {AppContext, AuthContext} from '../../../hooks';
// import { useAuth } from '../../hooks/auth'
import RadioButtonRN from 'radio-buttons-react-native';

const data = [
    {
        label: 'Male',
    },
    {
        label: 'Female',
    },
];

export const Gender = ({navigation}) => {
    const {doUpdateProfile, profile} = useContext(AuthContext);
    // alert(profile.gender)
    const [gender, setGender] = useState(profile.gender);

    const saveProfile = () => {
        doUpdateProfile({
            gender: gender,
        }).then((ret) => {
            analytics().setUserProperty('registered_gender', gender);
            navigation.navigate('DOB');
        });
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
                        {strings.Auth.gender.header}
                    </Headline>
                    <Paragraph>{strings.Auth.gender.caption}</Paragraph>
                </View>

                <RadioButtonRN
                    data={data}
                    initial={profile.gender === 'Female' ? 2 : 1}
                    activeColor={theme.colors.primary}
                    selectedBtn={(e) => setGender(e.label)}
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
