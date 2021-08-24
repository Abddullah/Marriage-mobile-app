import {DefaultTheme, configureFonts} from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        ...DefaultTheme.colors,
        primary: '#EB5A6D',
        primaryOverlay: 'rgba(96 ,106 ,161,.2)',
        primaryUnderlay:'rgba(235, 90, 109,.2)',
        grey: 'grey',
        black: 'black',
        blueBlack:'rgb(96 106 161)',
        // accent: 'rgba(255,255,255,0.5)',
        red: '#FA5148',
        green: '#1DBF73',
        facebookColor: "#4267B2",
        placeholder: 'rgba(255,255,255,0.5)',
        // text: 'rgba(255,255,255,0.8)',
        text:'rgba(25,25,25,0.8)',
        // buttonActive: 'rgba(0, 255, 198, 0.2)',
        // buttonDisabled: 'rgba(0, 255, 198, 0.1)',
        white: '#FFFFFF',
    },
};
export default theme;
