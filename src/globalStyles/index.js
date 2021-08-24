import flexStyles from './flexStyles';
import marginStyles from './paddingMarginStyles';
import textStyles from './textStyles';
import {
    heightPercentageToDP,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import theme from '../../theme';
import elementStyles from './elementStyles';

export default {
    screensContents: {
        paddingHorizontal: wp(5),
        paddingVertical: heightPercentageToDP(4),
    },
    inputErrorLabel: {
        color: theme.colors.red,
        paddingLeft: 0,
    },
    ...flexStyles,
    ...marginStyles,
    ...textStyles,
    ...elementStyles,
};
