import React, {useState, useContext} from 'react';
import {
    View,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import {Headline,Caption, FAB, Paragraph} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../../../styles';
import theme from '../../../../theme';
import {strings} from '../../../constants';
import {AuthContext, ToastContext} from '../../../hooks';
export const About = ({navigation}) => {
    const {doUpdateProfile,profile} = useContext(AuthContext);
    const {openToast} = useContext(ToastContext);
    const [about, setAbout] = useState(profile.about);

    const saveProfile = () => {
        if (String(about).trim().length < 20) {
            openToast('error', 'Please write more about yourself.');
        } else {
            doUpdateProfile({
                about: about,
                profileStatus: 1
            }).then((ret) => {
                navigation.navigate('Completed');
            });
        }
    };
    return (
        <SafeAreaView style={[styles.flex,styles.pv_20, styles.bgWhite]}>
            <KeyboardAvoidingView
                style={[
                    styles.flex,
                    styles.screensContents,
                    styles.justify_between,
                    styles.pv_20,
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
                        {strings.Auth.about.header}
                    </Headline>
                    <Paragraph>{strings.Auth.about.caption}</Paragraph>
                    <Caption>{strings.Auth.about.minimum}</Caption>
                </View>

                <TextInput
                    textContentType="none"
                    style={[styles.input, {height: 200}]}
                    numberOfLines={10}
                    multiline={true}
                    autoFocus={true}
                    placeholderTextColor={theme.colors.grey}
                    placeholder={strings.Auth.about.placeholder}
                    value={about}
                    underlineColor={theme.colors.primary}
                    onChangeText={(text) => setAbout(text)}
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
