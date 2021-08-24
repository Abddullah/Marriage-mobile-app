import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Headline, FAB} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../../../styles';
import theme from '../../../../theme';
import {RoundButton} from '../../../components';
import {DatePicker_} from '../../../components/DatePicker';
import {strings} from '../../../constants';
import {AppContext, AuthContext} from '../../../hooks';
import Draggable from 'react-native-draggable';
import {variables} from '../../../constants/variables';
// import DatePicker from 'react-native-datepicker';
export const DOB = ({navigation}) => {
    const {doUpdateProfile, profile} = useContext(AuthContext);
    const [dob, setDob] = useState(new Date());
    useEffect(() => {
        if (profile.status === 1 && profile.dob) {
            setDob(profile.dob);
        } else {
            var s = new Date();
            s.setMonth(s.getMonth() - 12 * variables.defaultUserAge);
            s.setMonth(1);
            s.setDate(1);
            setDob(s);
        }
    }, []);

    const saveProfile = () => {
        doUpdateProfile({
            dob: dob,
            socialStatus: 1,
        }).then((ret) => {
            navigation.navigate('ProfilePicture');
        });
    };
    return (
        <SafeAreaView
            style={[
                styles.flex,
                styles.bgWhite,
                styles.screensContents,
                styles.justify_between,
            ]}>
            <View>
                <Headline
                    style={[
                        styles.primary,
                        styles.bold,
                        styles.f26,
                        // styles.center,
                        styles.mb_20,
                    ]}>
                    {strings.Auth.dob.header}
                </Headline>
            </View>

            <DatePicker_ dob={dob} setDob={setDob} />
            <View style={[styles.justify_center, styles.items_center]}>
                <FAB
                    onPress={saveProfile}
                    icon="arrow-right"
                    color={theme.colors.white}
                    style={[styles.bgApp]}
                />
            </View>
        </SafeAreaView>
    );
};
