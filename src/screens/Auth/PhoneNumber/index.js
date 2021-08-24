import React, {useContext, useEffect, useState} from 'react';
import {
    StatusBar,
    Text,
    KeyboardAvoidingView,
    TextInput,
    Platform,
    View,
    FlatList,
} from 'react-native';
import {
    FAB,
    Headline,
    Card,
    Paragraph,
    TouchableRipple,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../../../styles';
import theme from '../../../../theme';
import {strings} from '../../../constants/strings';
import {AuthContext} from '../../../hooks/auth';
import {AppContext} from '../../../hooks/providers/App';
import {ToastContext} from '../../../hooks/providers/Toast';
import {RoundButton} from '../../../components';
// import { countries } from '../../../assets/countries/index'
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen';
export const PhoneNumber = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const {doGetOTP} = useContext(AuthContext);
    const {setToast} = useContext(ToastContext);
    const {countries, doGetCountries} = useContext(AppContext);
    const [country, setCountry] = useState(null);
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    // }
    const getOTP = () => {
        doGetOTP({
            resend: false,
            phoneNumber: phoneNumber,
            countryDailCode: country.dial_code,
            country: country.name,
            countryCode: country.code,
        })
            .then((ret) => {
                navigation.navigate('OTP');
            })
            .catch((err) => {});
    };
    useEffect(() => {
        doGetCountries();
        return () => {};
    }, []);
    useEffect(() => {
        console.log(countries)
        if (countries.length > 0) {
            setCountry(countries[0]);
        }
    }, [countries]);
    const toggleCountryPicker = () => {
        setShowCountryPicker(!showCountryPicker);
    };
    return (
        <SafeAreaView style={[styles.flex,styles.pv_20, styles.shrink, styles.bgWhite]}>
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
                        {strings.Auth.phoneNumber.header}
                    </Headline>
                    <Paragraph>{strings.Auth.phoneNumber.caption}</Paragraph>
                </View>
                <View>
                    <View style={[styles.flex_row, styles.items_end]}>
                        {country && (
                            <View style={[{flexBasis: 85}]}>
                                <TouchableRipple
                                    onPress={toggleCountryPicker}
                                    style={[
                                        styles.flex_row,
                                        styles.items_center,
                                        styles.justify_between,
                                        {
                                            height: 45,
                                            borderBottomWidth: 1,
                                            borderBottomColor:
                                                theme.colors.grey,
                                        },
                                    ]}>
                                    <View
                                        style={[
                                            styles.flex,
                                            styles.flex_row,
                                            styles.items_center,
                                            {
                                                borderRightWidth: 1,
                                                borderRightColor:
                                                    theme.colors.grey,
                                            },
                                        ]}>
                                        <Text style={[styles.f20]}>
                                            {country.flag}
                                        </Text>
                                        {/* <Text style={[styles.ml_20]} >{country.name} </Text> */}
                                        <Text style={[styles.ml_10]}>
                                            ({country.dial_code})
                                        </Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                        )}

                        <View style={[styles.flex]}>
                            <TextInput
                                // textContentType="telephoneNumber"
                                style={[styles.ph_10, styles.input]}
                                autoFocus={true}
                                mode="outlined"
                                returnKeyLabel="Next"
                                returnKeyType="next"
                                keyboardType="numeric"
                                placeholder={
                                    strings.Auth.phoneNumber.placeholder
                                }
                                value={phoneNumber}
                                underlineColor={theme.colors.primary}
                                onChangeText={(text) => setPhoneNumber(text)}
                            />
                        </View>
                    </View>
                    {showCountryPicker === true && (
                        <Card
                            style={[
                                {
                                    position: 'absolute',
                                    right: 0,
                                    left: 0,
                                    top: 55,
                                },
                            ]}>
                            <FlatList
                                data={countries}
                                style={[{height:100}]}
                                renderItem={(c) => (
                                    <TouchableRipple
                                        onPress={() => {
                                            setCountry(c.item);
                                            setShowCountryPicker(false);
                                        }}>
                                        <View
                                            style={[
                                                styles.flex_row,
                                                styles.pv_10,
                                                styles.items_center,
                                            ]}>
                                            <Text style={[styles.f26]}>
                                                {c.item.flag}
                                            </Text>
                                            <Text style={[styles.ml_20]}>
                                                {c.item.name} (
                                                {c.item.dial_code})
                                            </Text>
                                        </View>
                                    </TouchableRipple>
                                )}
                            />
                        </Card>
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
                        onPress={getOTP}
                        icon="arrow-right"
                        color={theme.colors.white}
                        style={[styles.bgApp]}
                    />
                    <View style={[{width: 56, height: 56}]}></View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
