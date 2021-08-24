import React, {useContext, useState} from 'react';
import {Image, TextInput, View} from 'react-native';
import {
    Modal,
    Title,
    //   TextInput,
    Portal,
    Text,
    Button,
    Provider,
    IconButton,
    Headline,
    Paragraph,
} from 'react-native-paper';
import styles from '../../../../../../styles';
import theme from '../../../../../../theme';
import {strings} from '../../../../../constants';
import {EventContext} from '../../../../../hooks/event';
export const ReportCall = ({
    reportCallVisible,
    reporting,
    eventId,
    room,
    setReportCallVisible,
}) => {
    const [body, setBody] = useState('');
    const {doReportCall} = useContext(EventContext);
    const hideModal = () => setReportCallVisible(false);
    const containerStyle = {
        backgroundColor: 'white',
        borderRadius: 5,
        marginHorizontal: '5%',
        padding: '5%',
    };

    const reportCall = () => {
        doReportCall({
            room: room,
            body: body,
            reporting: reporting,
            eventId: eventId,
        })
            .then(async (ret) => {
                setReportCallVisible(false);
            })
            .catch((err) => {});
    };

    return (
        <Portal>
            <Modal
                visible={reportCallVisible}
                // onDismiss={hideModal}
                contentContainerStyle={containerStyle}>
                <View style={[styles.flex_row, styles.justify_between]}>
                    <View>
                        <Headline style={[styles.center]}>
                            {strings.Call.report.reportVideo}
                        </Headline>
                    </View>
                    <View
                        style={[
                            styles.flex_row,
                            styles.items_end,
                            styles.justify_end,
                        ]}>
                        <IconButton
                            onPress={hideModal}
                            color="red"
                            icon="close"
                        />
                    </View>
                </View>
                <View >
                    <TextInput
                        textContentType="none"
                        style={[styles.input, {height: 100}]}
                        autoFocus={true}
                        numberOfLines={5}
                        keyboardType="default"
                        placeholder={'Write...'}
                        value={body}
                        underlineColor={theme.colors.primary}
                        onChangeText={(text) => setBody(text)}
                    />
                </View>

                <View
                    style={[
                        styles.flex_row,
                        styles.mt_30,
                        styles.items_center,
                        styles.justify_between,
                    ]}
                />

                <View
                    style={[
                        styles.flex_row,
                        styles.margin_t_30,
                        styles.items_center,
                        styles.justify_between,
                    ]}
                />

                <Button
                    mode="contained"
                    icon={'alert'}
                    onPress={reportCall}
                    dark
                    contentStyle={[styles.buttonContentStyle]}
                    labelStyle={[styles.buttonLabel]}
                    style={[
                        styles.self_center,
                        styles.buttonContainer,
                        styles.margin_t_50,
                    ]}>
                    {strings.Call.report.button}
                </Button>
            </Modal>
        </Portal>
    );
};
