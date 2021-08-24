import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Headline, Button, Title, Paragraph, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '@theme';
import { strings } from '@constants';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../../../styles';
import { AuthContext, ToastContext } from '../../../hooks';
import S3Image from '../../../components/S3Images/index'

export const UpdatePhoto = ({ navigation }) => {
    const [about, setAbout] = useState('');
    const [image, setImage] = useState(null);
    const { openToast } = useContext(ToastContext);
    const { profile, doUpdateProfile, doUpdateProfilePhoto } = useContext(
        AuthContext,
    );
    const [photoSelected, setPhotoSelected] = useState(false);

    const saveProfileExtra = () => {
        doUpdateProfile({
            // email,
            // firstName,
            // lastName,
            // dob,
            // gender,
            about,
        }).then((ret) => {
            openToast('success', 'Profile updated');
        });
    };
    const saveProfile = () => {
        const formdata = new FormData();

        formdata.append('photo', {
            uri: image.path,
            name: image.filename,
            type: image.mime,
        });

        doUpdateProfilePhoto(formdata)
            .then(() => {
                saveProfileExtra();
                // openToast('success', 'Profile Photo updated');
            })
            .catch(() => { });
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
        } catch (e) {
            openToast('error', e);
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
        } catch (e) {
            openToast('error', e);
        }
    };

    return (
        <SafeAreaView
            style={[
                styles.flex,
                styles.bgWhite,
                styles.phc_5,
                styles.pvc_3,
                // styles.center,
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
                                    <FastImage
                                        source={{
                                            uri:
                                                'https://images.pexels.com/photos/5076309/pexels-photo-5076309.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                                        }}
                                        style={[localStyles.profileImg]}
                                    />
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
            {/* {photoSelected ? (
                <View
                    style={[
                        styles.flex_row,
                        styles.justify_center,
                        styles.items_center,
                    ]}>
                    <FAB
                        onPress={() => navigation.goBack()}
                        icon="close"
                        color={theme.colors.white}
                        style={[styles.bgBlack]}
                    />
                    <FAB
                        onPress={saveProfile}
                        icon="arrow-up"
                        color={theme.colors.white}
                        style={[styles.bgApp, styles.ml_10]}
                    />
                </View>
            ) : (
                <View style={[styles.justify_center, styles.items_center]} />
            )} */}

            <Title style={[styles.mt_20, styles.center]}>About Me</Title>
            <TextInput
                textContentType="none"
                style={[styles.input, { height: 100 }]}
                numberOfLines={5}
                multiline={true}
                autoFocus={true}
                placeholderTextColor={theme.colors.grey}
                placeholder={strings.Auth.about.placeholder}
                value={about}
                underlineColor={theme.colors.primary}
                onChangeText={(text) => setAbout(text)}
            />
            <Button mode="contained" dark labelStyle={[styles.buttonLabel]} style={[styles.buttonContainer, styles.self_center]} contentStyle={[styles.buttonContentStyle]} >Save Profile</Button>
        </SafeAreaView>
    );
};
const localStyles = StyleSheet.create({
    profileImg: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
    },
});
