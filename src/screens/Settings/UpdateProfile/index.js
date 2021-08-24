import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button, FAB, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../../../styles';
import theme from '../../../../theme';
import FastImage from 'react-native-fast-image';
import { strings } from '../../../constants';
import { AuthContext, ToastContext } from '../../../hooks';
import ImagePicker from 'react-native-image-crop-picker';
import S3Image from '../../../components/S3Images/index'

export const UpdateProfile = ({ navigation }) => {
    const [about, setAbout] = useState('');
    const [image, setImage] = useState(null);
    const { openToast } = useContext(ToastContext);
    const { profile, doUpdateProfile, doUpdateProfilePhoto } = useContext(
        AuthContext,
    );
    const [photoSelected, setPhotoSelected] = useState(false);

    useEffect(() => {
        if (profile) {
            setAbout(profile.about);
        }
    }, [profile]);
    const saveProfileExtra = () => {
        doUpdateProfile({
            about,
        }).then(() => {
            openToast('success', 'Profile updated');
        });
    };

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
                    saveProfileExtra();
                })
                .catch(() => { });
        } else {
            saveProfileExtra();
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
    console.log(image, 'iamge coming from the aws')
    return (
        <SafeAreaView style={[styles.bgWhite, styles.flex]}>
            <ScrollView contentContainerStyle={[styles.phc_5]}>
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

                <Title style={[styles.mt_30, styles.center]}>About Me</Title>
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
            </ScrollView>
            <View style={[styles.phc_5, styles.mb_20]}>
                <Button
                    mode="contained"
                    onPress={saveProfile}
                    dark
                    style={[styles.buttonContainer, styles.mt_20]}
                    contentStyle={[styles.buttonContentStyle]}>
                    Save
                </Button>
            </View>
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
