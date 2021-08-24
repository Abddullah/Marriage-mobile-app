import React from 'react';
import {Chip} from 'react-native-paper';
import {Text} from 'react-native';
import styles from '../../../../../../styles';
export const Ended = () => {
    return (
        <Chip style={[styles.bgBlack]}>
            <Text style={[styles.white]}>Event Ended</Text>
        </Chip>
    );
};
