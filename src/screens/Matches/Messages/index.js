import React, { useContext, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {
    Button,
    Chip,
    FAB,
    Portal,
    Modal,
    TouchableRipple,
} from 'react-native-paper';
import {
    setUserOnCrashlytics,
    logCrashlytics,
    logErrorOnCrashlytics,
    getFirebaseDeviceToken,
} from '../../../utils/index';
import { variables } from "../../../constants/variables"

import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import analytics from '@react-native-firebase/analytics';
import styles from '../../../../styles';
import theme from '../../../../theme';
import { AuthContext } from '../../../hooks';
import { MatchContext } from '../../../hooks/providers/Match';
import { localStyles } from './style';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import PushNotification from "react-native-push-notification";
const axios = require('axios');


export const Messages = ({ navigation, route }) => {
    const listRef = useRef(null);
    const {
        messages,
        user,
        doSendMessage,
        doDeleteMessage,
        doUpdateMessage,
    } = useContext(MatchContext);
    const { profile } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [selectedMessage, setSelectedMessage] = useState({});

    const [visible, setVisible] = React.useState(false);
    const [editVisible, setEditVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: 'white',
        height: 200,
        borderRadius: 5,
        marginLeft: '5%',
        marginRight: '5%',
        padding: 30,
    };

    const sendMessage = () => {
        doSendMessage({ from: profile._id, to: user._id, body: message })
            .then((ret) => {
                analytics().logEvent('send_message', {
                    message_sender_email: profile.email,
                    message_sender_gender: profile.gender,
                    message_receiver_email: user.email,
                    message_receiver_gender: user.gender,
                });
                setMessage('');
                sendPushNotification();

            })
            .catch(() => { });
    };

    const sendPushNotification = () => {
        let data = {
            _id: user._id,
            msg: message
        }
        var options = {
            method: 'POST',
            // url: "http://192.168.10.3:3400/",
            url: `${variables.baseUrl}/sendPushNotification`,
            headers: {
                "Content-type": "application/json",
            },
            data: data
        }
        axios(options)
            .then(result => {
                let dataResult = result
                console.log(dataResult, 'dataResult',)
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
            })
    };

    const updateMessage = () => {
        doUpdateMessage({ id: selectedMessage._id, body: selectedMessage.body })
            .then((ret) => { })
            .catch((err) => { });
    };

    const deleteMessage = () => {
        doDeleteMessage({ id: selectedMessage._id })
            .then((ret) => { })
            .catch((err) => { });
    };

    const dateCheck = (m, index) => {
        if (index === 0) {
            return (
                <Chip style={[styles.self_center, styles.bgBlack]}>
                    <Text style={[styles.white]}>
                        {new Date(m.createdAt).toDateString()}
                    </Text>
                </Chip>
            );
        } else {
            if (
                new Date(m.createdAt).getDate() +
                new Date(m.createdAt).getMonth() !==
                new Date(messages[index - 1].createdAt).getDate() +
                new Date(messages[index - 1].createdAt).getMonth()
            ) {
                return (
                    <Chip style={[styles.self_center, styles.bgBlack]}>
                        <Text style={[styles.white]}>
                            {new Date(m.createdAt).toDateString()}
                        </Text>
                    </Chip>
                );
            }
        }
    };
    return (
        <SafeAreaView
            style={[styles.bgWhite, styles.flex, styles.flex_column]}
            edges={['right', 'top', 'bottom', 'left']}>
            <View
                style={[
                    styles.flex_row,
                    styles.items_center,
                    styles.justify_evenly,
                ]}>
                <View style={[styles.flex, styles.items_start]}>
                    <Button
                        onPress={() => {
                            navigation.goBack();
                        }}
                        dark
                        icon="chevron-left"
                        contentStyle={[styles.backButtonContentStyle]}
                        style={[styles.buttonContainer]}
                        labelStyle={[styles.f26]}
                    />
                </View>
                <View style={[styles.flex]}>
                    <Text />
                </View>
                <View style={[{ right: 50 }]}>
                    <Text
                        onPress={() =>
                            navigation.navigate('MatchProfile', {
                                user: user._id,
                            })
                        }
                        style={[styles.bold, styles.f16]}>
                        {route.params.firstName} {route.params.lastName}{' '}
                    </Text>
                </View>
                <View style={[styles.flex]}>
                    <Text />
                </View>
            </View>
            {/* <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Button
                        icon="pencil"
                        mode="outlined"
                        dark
                        onPress={() => {
                            // editMessage()
                            setEditVisible(true)
                            setVisible(false)
                        }}
                        labelStyle={[styles.buttonLabel]}
                    >
                        Edit
                    </Button>

                    <Button
                        style={[styles.mt_20]}
                        icon="delete"
                        mode="outlined"
                        onPress={() => { deleteMessage(); setVisible(false) } }
                        // mode="contained"
                        dark
                        color={theme.colors.red}
                        labelStyle={[styles.buttonLabel]}
                    >
                        Delete
                    </Button>
        </Modal>

            <Modal visible={editVisible} onDismiss={()=>setEditVisible(false)} contentContainerStyle={containerStyle}>
                <TextInput
                        style={styles.input}
                        // autoFocus={true}
                        mode="outlined"
                        keyboardType="default"
                        placeholder={'Edit your message'}
                        value={selectedMessage.body}
                        underlineColor={theme.colors.primary}
                        onChangeText={(text) => setSelectedMessage({... selectedMessage, body: text})}
                />
                 <Button
                    mode="contained"
                        dark
                        onPress={() => { updateMessage(); setEditVisible(false)  } }

                        style={[styles.mt_20]}
                        labelStyle={[styles.buttonLabel]}>
                        Save
                </Button>

        </Modal>

            </Portal>
         */}
            <KeyboardAvoidingView
                style={[styles.flex]}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                // behavior="padding"
                enabled>
                <ScrollView
                    ref={listRef}
                    onContentSizeChange={() =>
                        listRef.current.scrollToEnd({ animated: true })
                    }
                    contentContainerStyle={[styles.pv_20, styles.ph_20]}
                    style={[styles.flex, styles.shrink]}>
                    {messages.map((m, index) => {
                        return (
                            <>
                                {dateCheck(m, index)}
                                {m.image && m.body ? (
                                    <View
                                        key={index}
                                        style={[
                                            m.from === profile._id
                                                ? localStyles.receiver
                                                : localStyles.sender,
                                        ]}>
                                        <Image
                                            source={{ uri: m.image }}
                                            style={[localStyles.img]}
                                        />
                                        <Text
                                            style={[
                                                styles.mt_10,
                                                m.from === profile._id &&
                                                styles.white,
                                            ]}>
                                            {m.body}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.f12,
                                                m.from === profile._id
                                                    ? styles.white
                                                    : styles.gray,
                                                localStyles.date,
                                            ]}>
                                            {new Date(
                                                m.createdAt,
                                            ).toDateString()}
                                        </Text>
                                    </View>
                                ) : m.body ? (
                                    <TouchableRipple
                                        // TouchableRipple="red"
                                        key={index}
                                        onPress={() => { }}
                                        onLongPress={() => {
                                            setSelectedMessage(m);
                                            setVisible(true);
                                        }}
                                        style={[
                                            m.from === profile._id
                                                ? localStyles.sender
                                                : localStyles.receiver,
                                        ]}>
                                        <>
                                            <Text
                                                style={[
                                                    m.from === profile._id &&
                                                    styles.white,
                                                ]}>
                                                {m.body}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.f12,
                                                    m.from === profile._id
                                                        ? styles.white
                                                        : styles.gray,
                                                    localStyles.date,
                                                ]}>
                                                {new Date(
                                                    m.createdAt,
                                                ).toDateString()}
                                            </Text>
                                        </>
                                    </TouchableRipple>
                                ) : (
                                            <View
                                                key={index}
                                                style={[
                                                    m.type === 0
                                                        ? localStyles.receiverImg
                                                        : localStyles.senderImg,
                                                ]}>
                                                <Image
                                                    source={{ uri: m.image }}
                                                    style={[localStyles.messageImage]}
                                                />
                                                <Text
                                                    style={[
                                                        styles.f12,
                                                        styles.white,
                                                        localStyles.date,
                                                    ]}>
                                                    {new Date(
                                                        m.createdAt,
                                                    ).toDateString()}
                                                </Text>
                                            </View>
                                        )}
                            </>
                        );
                    })}
                </ScrollView>
                <View
                    style={[
                        styles.phc_5,
                        styles.flex_row,
                        styles.pv_5,
                        styles.items_center,
                        styles.shrink,
                        // styles.cardShadow
                    ]}>
                    <TextInput
                        textContentType="none"
                        style={[styles.flex, styles.chatInput]}
                        placeholder="Start Typing..."
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                    />
                    <FAB
                        icon="send"
                        onPress={sendMessage}
                        color={theme.colors.white}
                        style={[styles.bgApp, styles.ml_10]}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
