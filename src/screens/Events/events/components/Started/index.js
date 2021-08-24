import React from 'react';
import {Chip} from 'react-native-paper';
import {Text} from 'react-native';
import styles from '../../../../../../styles';
export const Started = () => {
    return (
        <Chip mode="outlined" style={[styles.borderPrimary]}>
            <Text style={[styles.primary]}>Event Started</Text>
        </Chip>
    );
};
