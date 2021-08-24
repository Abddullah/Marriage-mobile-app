import React, { useEffect, useContext, useState } from 'react';
import {
    View,
    Text,
    Platform,
    Keyboard,
    Image,
    RefreshControl,
    ScrollView,
    ImageBackground,
    TextInput,
    Dimensions,
    StyleSheet,
    FlatList,
    StatusBar,
    KeyboardAvoidingView,
} from 'react-native';
import {
    Button,
    Paragraph,
    Card,
    IconButton,
    TouchableRipple,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../../../styles';
import theme from '../../../../theme';
import { EventContext, EventProvider } from '../../../hooks/event';
import { AuthContext, LoaderContext } from '../../../hooks';
import { Item } from './components/item';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
export const Events = ({ navigation }) => {
    const { profile } = useContext(AuthContext);
    const [offset, setOffset] = useState(100);
    const [events, setEvents] = useState([]);
    const { loader } = useContext(LoaderContext);
    const [loading, setLoading] = useState(true);
    const { doGetEvents } = useContext(EventContext);
    useEffect(() => {
        Keyboard.addListener('keyboardWillHide', () => {
            console.log('Hide');
            setOffset(0);
        });
        Keyboard.addListener('keyboardWillShow', () => {
            setOffset(100);
            console.log('Show');
        });
        getEvents();
    }, []);
    const getEvents = () => {
        // console.log(profile.countryCode);
        // console.log(profile.country);
        setLoading(true);
        doGetEvents({
            countryCode: profile.countryCode,
            country: profile.country,
        })
            .then((events) => {
                let eventsClone = []
                for (let i = 0; i < 10; i++) {
                    eventsClone.push(events[0])
                }
                setEvents(eventsClone)
                // setEvents(events);
                setLoading(false);
                console.log(events.length);
            })
            .catch(() => {
                setLoading(false);
            });
    };
    return (
        <SafeAreaView
            style={[styles.bgWhite, styles.flex]}
            edges={['right', 'top', 'left']}>
            <StatusBar barStyle={'dark-content'} />
            {events.length > 0 && loading === false ? (
                <KeyboardAvoidingScrollView
                    // style={[styles.flex]}
                    // behavior={Platform.OS === 'ios' ? 'padding' : 'hieght'}
                    >
                    <FlatList
                        contentContainerStyle={[styles.pv_10]}
                        style={[styles.flex, styles.shrink]}
                        refreshControl={
                            <RefreshControl
                                colors={['#9Bd35A', '#689F38']}
                                refreshing={loading}
                                onRefresh={getEvents}
                            />
                        }
                        keyExtractor={(e, i) => i}
                        data={events}
                        renderItem={(item) => (
                            <Item e={item.item} navigation={navigation} />
                        )}
                    />

                </KeyboardAvoidingScrollView>
            ) : (events.length == 0 || events.length > 0) &&
                loading === true ? (
                        <View
                            style={[
                                styles.flex,
                                styles.justify_center,
                                styles.items_center,
                            ]}>
                            <Paragraph>loading...</Paragraph>
                        </View>
                    ) : (
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    colors={['#9Bd35A', '#689F38']}
                                    refreshing={loader}
                                    onRefresh={getEvents}
                                />
                            }
                            contentContainerStyle={[
                                styles.flex,
                                styles.justify_center,
                                styles.items_center,
                            ]}>
                            <View>
                                <Paragraph>No Event found!</Paragraph>
                            </View>
                        </ScrollView>
                    )}
        </SafeAreaView>
    );
};
