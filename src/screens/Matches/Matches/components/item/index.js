import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import analytics from '@react-native-firebase/analytics';
import styles from '../../../../../../styles';
import theme from '../../../../../../theme';
import { AuthContext } from '../../../../../hooks';
import { MatchContext } from '../../../../../hooks/providers/Match';
import { localStyle } from './style';
import { getInitials } from '../../../../../utils';
import FastImage from 'react-native-fast-image';
import S3Image from '../../../../../components/S3Images/index'

export const Item = ({ navigation, m }) => {
    const { doGetMessages, setUser } = useContext(MatchContext);
    const { profile } = useContext(AuthContext);

    const openChat = async ({ _id, firstName, lastName }) => {
        analytics().logEvent('user_initiated_chat', {
            registered_email: profile.email,
            secondary_user_email: m.user.email,
        });
        navigation.navigate('Messages', { firstName, lastName });
        setUser({ _id: _id });
        await doGetMessages({ limit: 50, userId: _id, page: 1 });
    };

    // const getInitials = (user) => {
    //     const firstInitial = user.firstName.toUpperCase()[0];
    //     const lastInitial = user.lastName.toUpperCase()[0];
    //     return firstInitial +''+ lastInitial;
    // }
    return (
        <TouchableRipple onPress={() => openChat(m.user)}>
            <View
                style={[
                    styles.flex_row,
                    styles.justify_start,
                    styles.items_center,
                ]}>
                <View style={[localStyle.matchProfileWrapper]}>
                    <TouchableRipple
                        underlayColor={theme.colors.primaryUnderlay}
                        // onPress={() => openChat(m.user)}
                        style={[
                            styles.flex_row,
                            styles.items_center,
                            styles.justify_center,
                            localStyle.matchImageWrapper,
                        ]}>
                        {m.user.photo ? (
                            <S3Image
                                photo={m.user.photo}
                                styles={[localStyle.matchImage]}
                            />
                        ) : (
                                <View style={[styles.matchesDefaultPic]}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>
                                        {getInitials(
                                            m.user.firstName,
                                            m.user.lastName,
                                        )}
                                    </Text>
                                </View>
                            )}
                    </TouchableRipple>
                </View>

                <View>
                    <>
                        {/* <TouchableRipple */}
                        {/* underlayColor={theme.colors.primaryUnderlay}> */}
                        <Text
                            // onPress={() =>
                            // navigation.navigate('MatchProfile', {
                            // user: m.user._id,
                            // })
                            // }
                            style={[styles.f20, styles.bold]}>
                            {m.user.firstName} {m.user.lastName}
                        </Text>
                        {/* </TouchableRipple> */}
                        {m.lastMessage && (
                            <Text style={[styles.f300]}>
                                {' '}
                                {m.lastMessage.body}{' '}
                            </Text>
                        )}
                    </>
                </View>
                {/* <View style={[styles.flex_row]} >
                <IconButton size={25} icon="camera" color="red" />
                <IconButton size={25}  icon="close" color="red" />
            </View> */}
            </View>
        </TouchableRipple>
    );
};
