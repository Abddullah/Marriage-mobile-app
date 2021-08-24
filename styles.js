import {Platform, StyleSheet} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import stl from './src/globalStyles';
import theme from './theme';
// import  { theme } from '@theme'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        textAlign: 'center',
    },
    buttonLabel: {
        // color: theme.colors.primary,
        textTransform: 'capitalize',
    },
    backButtonContentStyle: {
        height: 40,
    },
    buttonContainer: {
        borderRadius: 50,
    },
    fullButtonContainer: {
        borderColor: theme.colors.primary,
        borderWidth: 1,
        backgroundColor: theme.colors.buttonActive,
        width: '100%',
    },
    textFullButtonContainer: {
        width: '100%',
    },
    buttonContentStyle: {
        paddingVertical: hp('.3'),
        borderRadius: 50,
        // ...fonts.regular
    },
    buttonContentStyleSm: {
        paddingVertical: hp('0.5%'),
        borderRadius: 50,
        // ...fonts.regular
    },
    timerCell: {
        height: 60,
        width: 60,
        backgroundColor: theme.colors.primary,
        borderRadius: 60 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerCells: {
        height: 32,
        width: 32,
        backgroundColor: theme.colors.primary,
        borderRadius: 32 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pvc_3: {
        paddingVertical: wp(3),
    },
    phc_3: {
        paddingHorizontal: wp(3),
    },
    phc_5: {
        paddingHorizontal: wp(5),
    },
    facebookButtonContainer: {
        backgroundColor: theme.colors.facebookColor,
        borderRadius: theme.roundness,
        marginBottom: '5%',
    },
    facebookButtonLabel: {
        color: theme.colors.white,
        textTransform: 'capitalize',
        fontSize: hp('2.1%'),
        // ...fonts.semibold,
    },
    stickBottom: {
        position: 'absolute',
        bottom: 20,
    },
    stickBtn: {
        position: 'absolute',
        left: wp('5%'),
        bottom: hp('3%'),
        right: wp('5%'),
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
        color: theme.colors.white,
        // ...fonts.semibold,
    },
    desc: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        // ...fonts.thin,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        padding: 10,
    },
    input: {
        backgroundColor: 'transparent',
        marginTop: 15,
        height: 40,
        borderColor: theme.colors.grey,
        borderBottomWidth: 1,
        fontSize: Platform.OS === 'ios' ? 15 : 14,
    },
    textArea: {
        backgroundColor: 'transparent',
        // marginTop: 15,
        height: 150,
        borderRadius: 5,
        borderColor: theme.colors.grey,
        borderWidth: 1,
        fontSize: Platform.OS === 'ios' ? 15 : 14,
    },
    borderPrimary: {
        borderColor: theme.colors.primary,
    },
    chatInput: {
        borderRadius: 50,
        backgroundColor: 'transparent',
        height: 50,
        padding: 15,
        borderColor: theme.colors.grey,
        borderWidth: 0.8,
        // borderBottomWidth: 1,
        fontSize: Platform.OS === 'ios' ? 15 : 14,
    },
    fullWidth: {
        width: '92%',
    },
    bgApp: {
        backgroundColor: theme.colors.primary,
    },
    bgBlack: {
        backgroundColor: theme.colors.black,
    },
    bgRed: {
        backgroundColor: theme.colors.red,
    },
    bgWhiteT: {
        backgroundColor: 'rgba(235, 90, 109,.7)',
    },
    bgGrey: {
        backgroundColor: 'rgba(100, 100, 100,.5)',
    },
    bgTransparent: {
        backgroundColor: 'transparent',
    },
    shadowBox: {
        paddingVertical: wp('3.25%'),
        paddingHorizontal: wp('4%'),
        backgroundColor: '#0F3248',
        width: wp('100%'),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        zIndex: 2,
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 7,
    },
    cardShadow: {
        shadowColor: '#0000001a',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 7,
        borderRadius: theme.roundness,
    },
    darkCards: {
        backgroundColor: '#072437',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 7,
        flex: 0,
        width: '100%',
        marginVertical: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        marginVertical: hp('4%'),
        padding: wp('4%'),
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1,
        backgroundColor: '#1F4457',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 7,
        flex: 0,
    },
    placeholderProfileImg: {
        justifyContent:'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        backgroundColor: theme.colors.primary,
    },
    matchesDefaultPic: {
        paddingTop: 13,
        alignContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 60,
        backgroundColor: theme.colors.primary,
    },

    ...stl,
});

export default styles;
