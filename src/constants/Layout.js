import React from 'react';
import {Button} from 'react-native-paper';
import styles from '../../styles';
import theme from '../../theme';

export const NavigationOptions = ({navigation}) => ({
    headerTitleStyle: {
        fontSize: 20,
        alignSelf: 'center',
    },
    headerTintColor: theme.colors.primary,
    headerTitleAlign: 'center',
    headerLeft: () => (
        <Button
            onPress={() => {
                navigation.goBack();
            }}
            dark
            icon="chevron-left"
            contentStyle={[styles.backButtonContentStyle]}
            style={[styles.buttonContainer]}
            labelStyle={{
                fontSize: 36,
            }}
        />
    ),
});
