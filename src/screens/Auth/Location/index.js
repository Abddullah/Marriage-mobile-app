import React, { useContext, useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TextInput, View } from 'react-native';
import { Button, FAB, Headline, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../../../styles';
import theme from '../../../../theme';
import { strings } from '../../../constants/strings';
import { AuthContext } from '../../../hooks/auth';
import { AppContext } from '../../../hooks/providers/App';
import { ToastContext } from '../../../hooks/providers/Toast';
import { RoundButton } from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
export const Location = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('+923421464075');
    const { doUpdateProfile } = useContext(AuthContext);
    const { setToast, openToast } = useContext(ToastContext);
    // }
    const enableLocation = async () => {
        Geolocation.getCurrentPosition(
            (res) => {
                doUpdateProfile({
                    location: {
                        type: 'Point',
                        coordinates: [
                            res.coords.latitude,
                            res.coords.longitude,
                        ],
                    },
                })
                    .then((ret) => {
                        navigation.navigate('Name');
                    })
                    .catch((err) => { });
            },
            (err) => {
                console.log(err);
                openToast('error', err.message);
                setTimeout(() => {
                    navigation.navigate('Name');
                }, 2000);
            },
            {
                enableHighAccuracy: true,
            },
        );
    };
    return (
        <SafeAreaView
            style={[
                styles.flex,
                styles.shrink,
                styles.bgWhite,
                styles.pv_20,
                styles.screensContents,
                styles.justify_between,
            ]}>
            <StatusBar barStyle="dark-content" />

            <View>
                <Ionicons
                    size={80}
                    name="location-outline"
                    color={theme.colors.primary}
                />
                <Headline
                    style={[
                        styles.primary,
                        styles.bold,
                        styles.f26,
                        styles.mb_20,
                    ]}>
                    {strings.Auth.location.header}
                </Headline>
                <Paragraph>{strings.Auth.location.caption}</Paragraph>
            </View>

            <View style={[styles.items_center]}>
                <View style={[styles.justify_center, styles.items_center]}>
                    <Button
                        onPress={enableLocation}
                        // icon="arrow-right"
                        mode="contained"
                        dark
                        contentStyle={[styles.buttonContentStyle]}
                        // contentStyle={[{
                        // borderRadius:50
                        // }]}
                        style={[styles.buttonContainer]}
                        labelStyle={[styles.buttonLabel]}
                    // color={theme.colors.white}
                    // style={[styles.bgApp]}
                    >
                        {strings.Auth.location.enable}
                    </Button>

                    <Button
                        onPress={() => navigation.navigate('Name')}
                        // icon="arrow-right"
                        mode="text"
                        // dark
                        // contentStyle={[]}
                        contentStyle={[styles.buttonContentStyle]}
                        labelStyle={[styles.buttonLabel]}
                        style={[styles.mt_10, styles.buttonContainer]}
                    // color={theme.colors.white}
                    // style={[styles.bgApp]}
                    >
                        {strings.Auth.location.no}
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};
