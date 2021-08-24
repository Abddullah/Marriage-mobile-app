import React, {useState, useContext, useEffect, createContext} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Animated,
    TouchableHighlight,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../../styles';
import theme from '../../../theme';
import {LoaderContext} from './Loader';

export const ToastContext = createContext();
export const ToastProvider = ({children}) => {
    const [top, setTop] = useState(new Animated.Value(-300));
    const [height, setHeight] = useState(0);
    const {setLoader} = useContext(LoaderContext);

    const [toast, setToast] = useState({
        show: false,
        message: 'Hello buddy',
        type: 'error',
    });

    useEffect(() => {
        setTimeout(() => {}, 5000);
    }, []);

    const openToast = (type, msg, interval) => {
        setToast({
            type: type,
            message: msg,
            height: 'auto',
        });
        // this.setState({type: type, msg: msg, height: 'auto'});
        Animated.spring(top, {
            bounciness: 10,
            speed: 15,
            // useNativeDriver:true,
            toValue: 45,
            duration: 500,
        }).start();

        if (interval === undefined) {
            interval = 3000;
        }
        setTimeout(() => {
            closeToast();
        }, interval);
    };
    const closeToast = () => {
        Animated.spring(top, {
            bounciness: 10,
            speed: 15,
            toValue: -300,
            duration: 500,
        }).start();
        setTimeout(() => {
            setHeight(0);
        }, 500);
    };

    return (
        <ToastContext.Provider value={{toast, setToast, openToast}}>
            <>
                <Animated.View
                    style={[
                        toast.type === 'error'
                            ? localStyles.wrapper_red
                            : localStyles.wrapper_green,
                        {top: top},
                    ]}>
                    <TouchableHighlight
                        underlayColor={theme.colors.white}
                        onPress={closeToast}>
                        <View
                            style={[
                                styles.phc_3,
                                styles.pv_10,
                                localStyles.viewWrapper,
                            ]}>
                            <View
                                style={[localStyles.iconWrapper]}
                                onPress={() => this.props.navigation.goBack()}>
                                {toast.type === 'success' ? (
                                    <Icon
                                        name="star-face"
                                        color={theme.colors.white}
                                        size={30}
                                    />
                                ) : (
                                    <Icon
                                        name="alert-circle"
                                        color={theme.colors.white}
                                        size={30}
                                    />
                                )}
                            </View>
                            <View style={[styles.flex, styles.flex_row]}>
                                <Text
                                    style={[
                                        styles.gray,
                                        styles.white,
                                        localStyles.message,
                                    ]}>
                                    {toast.message}
                                </Text>
                            </View>
                            <IconButton
                                icon="close"
                                onPress={closeToast}
                                color={theme.colors.white}
                            />
                        </View>
                    </TouchableHighlight>
                </Animated.View>
            </>
            {children}
        </ToastContext.Provider>
    );
};

const localStyles = StyleSheet.create({
    viewWrapper: {
        height: 'auto',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    message: {
        flex: 0,
        flexWrap: 'wrap',
        textAlign: 'justify',
    },
    wrapper_red: {
        position: 'absolute',
        backgroundColor: theme.colors.red,
        borderRadius: 10,
        right: '5%',
        left: '5%',
        zIndex: 5,
        paddingLeft: 0,
        overflow: 'hidden',
    },
    wrapper_green: {
        position: 'absolute',
        backgroundColor: theme.colors.green,
        borderRadius: 10,
        right: '5%',
        left: '5%',
        paddingLeft: 0,
        zIndex: 5,
        overflow: 'hidden',
    },
    iconWrapper: {
        height: 50,
        width: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});
