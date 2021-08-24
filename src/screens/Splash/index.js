import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext, useEffect } from 'react';
import { Image, StatusBar, View } from 'react-native';
import styles from '../../../styles';
import Logo from '../../../Right.png';
import { variables } from '../../constants/variables';
import { AuthContext } from '../../hooks/auth';
import { AppContext } from '../../hooks/providers/App';
import io from 'socket.io-client';
import { localStyle } from './style';
import { CommonActions } from '@react-navigation/native';
export const Splash = ({ navigation }) => {
    const { setSocket, setNavigation } = useContext(AppContext);
    const { doGetProfile, setProfile } = useContext(AuthContext);
    useEffect(() => {
        if (navigation) {
            setNavigation(navigation);
        }
    }, []);

    useEffect(() => {
        (async () => {
            let token = await AsyncStorage.getItem('token');
            if (token) {
                getProfile(token);
            } else {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{ name: 'StartUp' }],
                    }),
                );
            }
        })();
    }, []);
    const getProfile = () => {
        doGetProfile()
            .then(async (ret) => {
                setProfile(ret);
                let socket = io(variables.baseUrl, {
                    query: {
                        token: await AsyncStorage.getItem('token'),
                        id: await AsyncStorage.getItem('id'),
                    },
                });
                setSocket(socket);
                if (ret.profileStatus === 0) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: 'Location' }],
                        }),
                    );
                } else {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: 'Tab' }],
                        }),
                    );
                }
            })
            .catch((err) => {
                if (err === 'notfound') {
                    navigation.navigate('StartUp');
                } else if (err === '403') {
                    navigation.navigate('StartUp');
                }
                navigation.navigate('StartUp');
                console.log(err);
            });
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <View
                style={[
                    styles.flex,
                    styles.bgApp,
                    styles.screensContents,
                    styles.justify_center,
                    styles.items_center,
                    { backgroundColor: 'white' }
                ]}>
                <Image resizeMode="contain" style={[localStyle.logo]} source={Logo} />
            </View>
        </>
    );
};
