import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { Button, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../../../styles';
import moment from 'moment';
import { getUserDetail } from '../../../api/event';
import theme from '../../../../theme';
import { localStyle } from './style';
import { getInitials } from '../../../utils';
import FastImage from 'react-native-fast-image';
import S3Image from '../../../components/S3Images/index'

export const MatchProfile = ({ route, navigation }) => {
    const [userDetail, setUserDetail] = useState(null);
    useEffect(() => {
        getUserDataDetail(route.params.user);
        return () => { };
    }, []);

    const getUserDataDetail = async (id) => {
        let user = await getUserDetail(id);
        setUserDetail(user);
    };

    return (
        <SafeAreaView
            edges={['bottom', 'left', 'right']}
            style={[styles.flex, styles.bgWhite]}>
            <ScrollView contentContainerStyle={[styles.phc_5]}>
                {[1].map((i) => {
                    return (
                        <View style={[styles.mt_20]} elevation={3}>
                            <View
                                style={[
                                    styles.flex_row,
                                    styles.items_center,
                                    styles.pvc_3,
                                ]}>
                                <View style={[localStyle.imageWraperOuter]}>
                                    {userDetail && userDetail.photo ? (
                                        <TouchableRipple
                                            underlayColor={
                                                theme.colors.primaryUnderlay
                                            }
                                            onPress={() =>
                                                navigation.navigate(
                                                    'ViewPhoto',
                                                    {
                                                        photo: userDetail.photo,
                                                    },
                                                )
                                            }
                                            style={[
                                                styles.flex_row,
                                                styles.items_center,
                                                styles.justify_center,
                                                localStyle.imageWraper,
                                            ]}>
                                            <S3Image
                                                photo={userDetail &&
                                                    userDetail.photo}
                                                styles={[localStyle.image]}
                                            />
                                        </TouchableRipple>
                                    ) : (
                                            <View
                                                style={[
                                                    styles.matchesDefaultPic,
                                                    styles.mr_20,
                                                ]}>
                                                <Text
                                                    style={[styles.f16, styles.white]}>
                                                    {getInitials(
                                                        userDetail && userDetail.firstName ? userDetail.firstName : 'A',
                                                        userDetail && userDetail.lastName ? userDetail.lastName : 'M',
                                                    )}
                                                </Text>
                                            </View>
                                        )}
                                </View>
                                <View>
                                    <Text style={[styles.f18, styles.bold]}>
                                        {userDetail && userDetail.firstName}{' '}
                                    </Text>
                                </View>
                            </View>
                            {/* <View
                                style={[
                                    styles.flex_row,
                                    styles.items_center,
                                    styles.pvc_3,
                                ]}>
                                <View style={[localStyle.flex80]}>
                                    <Text style={[styles.bold, styles.f16]}>
                                        Phone
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {userDetail
                                            ? userDetail.phoneNumber
                                            : ''}
                                    </Text>
                                </View>
                            </View> */}

                            {/* <View
                                style={[
                                    styles.flex_row,
                                    styles.items_center,
                                    styles.pvc_3,
                                ]}>
                                <View style={[localStyle.flex80]}>
                                    <Text style={[styles.bold, styles.f16]}>
                                        Email
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {userDetail ? userDetail.email : ''}
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={[
                                    styles.flex_row,
                                    styles.items_center,
                                    styles.pvc_3,
                                ]}>
                                <View style={[localStyle.flex80]}>
                                    <Text style={[styles.bold, styles.f16]}>
                                        Birthday
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {userDetail
                                            ? moment(userDetail.dob).format(
                                                  'YYYY-MM-DD',
                                              )
                                            : ''}
                                    </Text>
                                </View>
                            </View> */}

                            <View
                                style={[
                                    styles.flex_row,
                                    styles.items_center,
                                    styles.pvc_3,
                                ]}>
                                <View style={[localStyle.flex80]}>
                                    <Text style={[styles.bold, styles.f16]}>
                                        Age
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {userDetail &&
                                            userDetail.dob &&
                                            new Date().getFullYear() -
                                            new Date(
                                                userDetail.dob,
                                            ).getFullYear()}
                                    </Text>
                                </View>
                            </View>

                            {/* <View
                                style={[
                                    styles.flex_row,
                                    styles.items_center,
                                    styles.pvc_3,
                                ]}>
                                <View style={[localStyle.flex80]}>
                                    <Text style={[styles.bold, styles.f16]}>
                                        Gender
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {userDetail && userDetail.gender}
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={[
                                    styles.flex_row,
                                    styles.items_center,
                                    styles.pvc_3,
                                ]}>
                                <View style={[localStyle.flex80]}>
                                    <Text style={[styles.bold, styles.f16]}>
                                        Country
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {userDetail && userDetail.country}
                                    </Text>
                                </View>
                            </View> */}

                            <View style={[styles.flex_row, styles.pvc_3]}>
                                <View style={[localStyle.flex80]}>
                                    <Text style={[styles.bold, styles.f16]}>
                                        About
                                    </Text>
                                </View>
                                <View style={[styles.shrink]}>
                                    <Text style={[styles.justify]}>
                                        {userDetail && userDetail.about
                                            ? userDetail.about
                                            : 'I am very calm and have clear thoughts. You can ask me about my hobbies as well'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
            <View
                style={[styles.flex_row, styles.justify_evenly, styles.mb_20]}>
                <Button
                    mode="contained"
                    dark
                    contentStyle={[styles.buttonContentStyle]}
                    style={[styles.buttonContainer, styles.self_center]}
                    labelStyle={[styles.buttonLabel]}>
                    Remove Match
                </Button>
                <Button
                    mode="contained"
                    dark
                    contentStyle={[styles.buttonContentStyle]}
                    color={theme.colors.black}
                    style={[styles.self_center, styles.buttonContainer]}
                    labelStyle={[styles.buttonLabel]}>
                    Report Match
                </Button>
            </View>
        </SafeAreaView>
    );
};
