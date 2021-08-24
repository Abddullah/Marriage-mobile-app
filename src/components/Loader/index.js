import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const Loader = () => {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" />
        </View>
    );
};
export default Loader;
const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        zIndex: 10,
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
