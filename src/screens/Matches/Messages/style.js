import {StyleSheet} from 'react-native';
import theme from '../../../../theme';
export const localStyles = StyleSheet.create({
    date: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 5,
    },
    receiver: {
        paddingTop: 10,
        paddingBottom: 25,
        minWidth: 150,
        alignSelf: 'flex-start',
        backgroundColor: '#e5e5e5',
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
    },
    sender: {
        paddingTop: 10,
        paddingBottom: 25,
        minWidth: 150,
        alignSelf: 'flex-end',
        backgroundColor: theme.colors.primary,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        borderBottomRightRadius: 0,
    },
    receiverImg: {
        alignSelf: 'flex-start',
        backgroundColor: '#e5e5e5',
        marginVertical: 10,
        padding: 3,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
    },
    senderImg: {
        alignSelf: 'flex-end',
        backgroundColor: theme.colors.primary,
        marginVertical: 10,
        padding: 3,
        borderRadius: 10,
        borderBottomRightRadius: 0,
    },
    messageImage: {
        width: 200,
        borderRadius: 10,
        height: 200,
    },
});
