import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Subheading, TouchableRipple} from 'react-native-paper';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import theme from '../../../theme';
import backLogo from '../../../assets/images/navbuttonBack.png';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Header = ({navigation, title}) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[localStyles.wrapper, {marginTop: insets.top}]}>
            <TouchableRipple
                style={localStyles.backArrow}
                onPress={() => navigation.goBack()}>
                <Image source={backLogo} />
            </TouchableRipple>
            <Subheading style={localStyles.title}>{title}</Subheading>
        </View>
    );
};

export default Header;
const localStyles = StyleSheet.create({
    wrapper: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: theme.colors.placeholder,
        height: hp('8%'),
        // marginTop:40
    },
    backArrow: {
        position: 'absolute',
        left: wp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    title: {
        fontSize: hp('2.7%'),
        color: theme.colors.primary,
    },
});
