import React, {useState, createContext} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import theme from '../../../theme';
export const LoaderContext = createContext();
export const LoaderProvider = ({children}) => {
    const [loader, setLoader] = useState(false);
    return (
        <LoaderContext.Provider value={{loader, setLoader}}>
            <View
                style={[
                    loader ? localStyles.openLoader : localStyles.closeLoader,
                    localStyles.loader,
                ]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
            {children}
        </LoaderContext.Provider>
    );
};

const localStyles = StyleSheet.create({
    loader: {
        backgroundColor: theme.colors.primaryOverlay,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
    },
    openLoader: {
        zIndex: 1000,
    },
    closeLoader: {
        zIndex: 0,
    },
});
