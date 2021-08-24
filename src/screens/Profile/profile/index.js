import React, { useContext } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { FAB, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginManager } from 'react-native-fbsdk';
import styles from '../../../../styles';
import { AuthContext, LoaderContext } from '../../../hooks';
import moment from 'moment';
import theme from '../../../../theme';
import { CommonActions } from '@react-navigation/native';
import { getInitials } from '../../../utils';
import S3Image from '../../../components/S3Images/index'
import { useState, useEffect,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const Profile = ({ navigation }) => {
    const { profile, doRemoveFcmToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const { setLoader } = useContext(LoaderContext);
    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            setLoading(false)
            return () => {
                setLoading(true)
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, []),
    );

    const logout = async () => {
        setLoader(true);
        setTimeout(() => {
            console.log(profile);
            if (profile.isSocial) {
                LoginManager.logOut();
            }
            AsyncStorage.removeItem('token');
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'StartUp' }],
                }),
            );
            setLoader(false);
        }, 3000);
        await doRemoveFcmToken();
    };
    const getAge = () => {
        let age = moment().diff(profile.dob, 'years', true);
        age = age.toFixed(0);
        return age;
    };

    return (
        <SafeAreaView edges={[]} style={[styles.flex, styles.bgWhite]}>
            <View
                style={[
                    styles.flex_row,
                    styles.justify_center,
                    styles.items_center,
                    styles.phc_5,
                    styles.mt_20,
                ]}>

                <View>

                    <FAB
                        icon={'pencil'}
                        small
                        onPress={() => navigation.navigate('UpdateProfile')}
                        style={[
                            styles.bgWhite,
                            styles.self_center,
                            localStyles.photoEdit,
                        ]}
                    />
                    {profile && profile.photo ? (
                        loading ?
                            null
                            : <S3Image
                                photo={profile.photo}
                                styles={[localStyles.profileImg]}
                            />
                    ) : (
                            <View
                                style={[
                                    styles.placeholderProfileImg,
                                    styles.bgApp,
                                ]}>
                                <Text style={[styles.f26, styles.white]}>
                                    {getInitials(
                                        profile && profile.firstName
                                            ? profile.firstName
                                            : 'A',
                                        profile && profile.firstName
                                            ? profile.lastName
                                            : 'M',
                                    )}
                                </Text>
                            </View>
                        )}
                    <Text style={localStyles.profileName}>
                        {profile.firstName}
                    </Text>
                   
                    <Text style={localStyles.userAge}>Age: {getAge()}</Text>
                </View>
            </View>

            <View style={[styles.phc_5]}>
                <View style={[styles.mt_15]}>
                    <View style={[styles.pvc_3]}>
                        <View
                            style={[
                                styles.flex_row,
                                styles.items_center,
                                styles.justify_between,
                            ]}>
                            <View>
                                <Text style={[styles.bold, styles.f16]}>
                                    About Me
                                </Text>
                            </View>
                            {/* <FAB
                                onPress={() =>
                                    navigation.navigate('UpdateProfile')
                                }
                                small
                                style={[styles.bgWhite]}
                                icon="pencil"
                            /> */}
                        </View>
                        <View>
                            <Text>{profile && profile.about}</Text>
                        </View>
                    </View>
                </View>

                {/* <View
                    style={[
                        styles.phc_5,
                        localStyles.ptb,
                        styles.flex_row,
                        styles.mt_20,
                        styles.justify_evenly,
                    ]}> */}
                <View
                    style={[
                        styles.flex_row,
                        styles.justify_evenly,
                        styles.mt_30,
                    ]}>
                    <Button
                        mode="contained"
                        dark
                        onPress={() => navigation.navigate('Settings')}
                        labelStyle={[styles.buttonLabel]}
                        contentStyle={[styles.buttonContentStyle]}
                        style={[
                            styles.flex,
                            styles.mr_10,
                            // styles.self_center,
                            styles.buttonContainer,
                        ]}>
                        Settings
                    </Button>
                    <Button
                        mode="contained"
                        color={theme.colors.black}
                        dark
                        onPress={logout}
                        labelStyle={[styles.buttonLabel]}
                        contentStyle={[styles.buttonContentStyle]}
                        style={[
                            styles.flex,
                            styles.ml_10,
                            // styles.self_center,
                            styles.buttonContainer,
                        ]}>
                        Logout
                    </Button>
                </View>
                {/* <FAB
                        onPress={() => navigation.navigate('Settings')}
                        icon="cog-outline"
                        style={[styles.bgWhite]}
                    />
                    <FAB
                        style={[styles.bgWhite]}
                        onPress={logout}
                        icon="power-off"
                    /> */}
                {/* </View> */}
            </View>

            {/*
            <View style={[styles.phc_5]}>
                <View>
                    <View elevation={0} style={[styles.mt_15]}>
                        <View
                            style={[
                                styles.flex_row,
                                styles.justify_between,
                                styles.items_center,
                                // styles.phc_3,
                                styles.pvc_3,
                            ]}>
                            <View>

                                <View>
                                    <Text style={[styles.mt_15]}>
                                        {profile && profile.firstName}{' '}
                                        {profile && profile.lastName},{' '}
                                        {profile &&
                                            profile.dob &&
                                            new Date().getFullYear() -
                                                new Date(
                                                    profile.dob,
                                                ).getFullYear()}
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={[
                                            // styles.f16,
                                            styles.mt_15,
                                            // styles.gray,
                                        ]}>
                                        {profile && profile.email}
                                    </Text>
                                </View>
                                <View>
                                    {profile && (
                                        <Text
                                            style={[
                                                // styles.f16,
                                                styles.mt_15,
                                                // styles.gray,
                                            ]}>
                                            {new Date(
                                                profile.dob,
                                            ).getFullYear()}
                                            -{new Date(profile.dob).getMonth()}-
                                            {new Date(profile.dob).getDate()}
                                        </Text>
                                    )}
                                </View>
                                <View>
                                    <Text
                                        style={[
                                            // styles.f16,
                                            styles.mt_15,
                                            // styles.gray,
                                        ]}>
                                        {profile && profile.gender}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <FAB
                                        onPress={() =>
                                            navigation.navigate('UpdateProfile')
                                        }
                                        // small
                                        style={[styles.bgWhite]}
                                        icon="pencil"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View
                    style={[
                        styles.phc_5,
                        localStyles.ptb,
                        styles.flex_row,
                        styles.mt_20,
                        styles.justify_evenly,
                    ]}>
                    <FAB
                        onPress={() => navigation.navigate('Settings')}
                        icon="cog-outline"
                        style={[styles.bgWhite]}
                    />
                    <FAB
                        style={[styles.bgWhite]}
                        onPress={logout}
                        icon="power-off"
                    />
                </View>
            </View>
         */}
        </SafeAreaView>
    );
};
const localStyles = StyleSheet.create({
    imgTop: {
        marginTop: 50,
    },
    photoEdit: {
        position: 'absolute',
        zIndex: 5,
        top: 5,
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        right: 5,
    },
    profileImg: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
    },
    profileName: {
        left: 40,
        fontSize: 25,
    },
    userAge: {
        left: 40,
        fontSize: 20,
    },
});
