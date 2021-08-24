import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Headline, Paragraph, FAB, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '@theme';
import { strings } from '@constants';
import FastImage from 'react-native-fast-image';
import styles from '../../../../styles';
import { AuthContext } from '../../../hooks';
import ImagePicker from 'react-native-image-crop-picker';
import { getInitials } from '../../../utils';
import S3Image from '../../../components/S3Images/index'

export const ProfilePicture = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const { profile, doUpdateProfilePhoto } = useContext(AuthContext);
    const [photoSelected, setPhotoSelected] = useState(false);
    const saveProfile = () => {
        if (photoSelected) {
            const formdata = new FormData();
            formdata.append('photo', {
                uri: image.path,
                name: image.filename,
                type: image.mime,
            });

            doUpdateProfilePhoto(formdata)
                .then(() => {
                    navigation.navigate('About');
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            navigation.navigate('About');
        }
    };
    const _pickImage = async () => {
        try {
            ImagePicker.openPicker({
                mediaType: 'photo',
                cropping: true,
            }).then((out) => {
                console.log(out);
                if (out.filename) {
                    setImage(out);
                } else {
                    out.filename = 'photo';
                    setImage(out);
                }
                setPhotoSelected(true);
            });
        } catch (E) {
            console.log(E);
        }
    };

    const _takeImage = async () => {
        try {
            ImagePicker.openCamera({
                mediaType: 'photo',
                cropping: true,
            }).then((out) => {
                console.log(out);
                if (out.filename) {
                    setImage(out);
                } else {
                    out.filename = 'photo';
                    setImage(out);
                }
                setPhotoSelected(true);
            });
        } catch (E) {
            console.log(E);
        }
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
                        styles.center,
                        styles.mb_20,
                    ]}>
                    {strings.Auth.profilePhoto.header}
                </Headline>
                <Paragraph style={[styles.center]}>
                    {strings.Auth.profilePhoto.caption}
                </Paragraph>
            </View>

            <View style={[styles.self_center]}>
                {/* <TouchableRipple
                    onPress={_pickImage}
                    style={[
                        styles.bgWhite,
                        styles.justify_center,
                        styles.items_center,
                        styles.cardShadow,
                        localStyles.photoEdit,
                    ]}>
                    <View>
                        <Icon
                            name="pencil"
                            color={theme.colors.grey}
                            size={25}
                        />
                    </View>
                </TouchableRipple> */}

                {profile && profile.photo && !photoSelected ? (
                    <S3Image
                        photo={profile.photo}
                        styles={[localStyles.profileImg]}
                    />
                ) : (
                        <>
                            {image && image.path ? (
                                <FastImage
                                    source={{
                                        uri: image.path,
                                    }}
                                    style={[localStyles.profileImg]}
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
                        </>
                    )}
                <View
                    style={[
                        styles.flex_row,
                        styles.self_center,
                        styles.justify_between,
                        styles.mt_20,
                    ]}>
                    <FAB
                        onPress={_takeImage}
                        style={[styles.self_center, styles.bgWhite]}
                        icon={'camera-outline'}
                    />

                    <FAB
                        onPress={_pickImage}
                        style={[
                            styles.self_center,
                            styles.bgWhite,
                            styles.ml_20,
                        ]}
                        icon={'image-outline'}
                    />
                </View>
            </View>
            {photoSelected || profile.photo ? (
                <View style={[styles.justify_center, styles.items_center]}>
                    <FAB
                        onPress={saveProfile}
                        icon="arrow-right"
                        color={theme.colors.white}
                        style={[styles.bgApp]}
                    />
                </View>
            ) : (
                    <View style={[styles.justify_center, styles.items_center]} />
                )}
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
});
