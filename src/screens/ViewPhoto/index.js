import React, {useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FAB} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../../styles';
export const ViewPhoto = ({route, navigation}) => {
    const [photo, setPhoto] = useState('');
    const [dimensions, setDimensions] = useState({width: 1, height: 1});
    useEffect(() => {
        setPhoto(route.params.photo);
        Image.getSize(route.params.photo, (width, height) => {
            setDimensions({width, height});
        });
        return () => {};
    }, []);

    return (
        <SafeAreaView
            edges={['left', 'right']}
            style={[styles.flex, styles.justify_center, styles.bgWhite]}>
            <FastImage
                style={[{aspectRatio: dimensions.width / dimensions.height}]}
                source={{uri: photo}}
            />
            <FAB
                onPress={() => navigation.goBack()}
                icon="arrow-left"
                style={[styles.bgWhite, styles.self_center, localStyles.back]}
            />
        </SafeAreaView>
    );
};
const localStyles = StyleSheet.create({
    back: {
        position: 'absolute',
        bottom: 80,
    },
});
