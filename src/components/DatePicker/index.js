import React, {useEffect, useState} from 'react';
import {Dimensions, Platform} from 'react-native';
import DatePicker from 'react-native-datepicker';
import theme from '../../../theme';
export const DatePicker_ = ({dob, style, setDob}) => {
    const [maxDate, setMaxDate] = useState(new Date());
    useEffect(() => {
        var s = new Date();
        s.setMonth(s.getMonth() - 12 * 20);
        setMaxDate(s);
        // alert(s);
    }, []);
    return (
        <DatePicker
            style={{width: '100%'}}
            date={dob}
            mode="date"
            placeholder="Birthday"
            format="YYYY-MM-DD"
            minDate="1960-01-01"
            maxDate={maxDate}
            confirmBtnText="&#10003;"
            cancelBtnText="&#x2718;"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    width: 0,
                    display: 'none',
                    top: 4,
                    marginLeft: 0,
                },
                placeholderText: {
                    color: theme.colors.grey,
                    fontSize: Platform.OS === 'ios' ? 15 : 14,
                },
                dateInput: {
                    marginLeft: 0,
                    // height: 50,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    // borderRadius: 50,
                    borderColor: theme.colors.grey,
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    // ...style
                },
                dateText: {
                    textAlign: 'left',
                    fontSize: 16,
                },
                btnConfirm: {
                    height: 60,
                    width: 60,
                    borderRadius: 50,
                    marginRight: 20,
                    backgroundColor: theme.colors.primary,
                },
                btnTextConfirm: {
                    color: theme.colors.white,
                    fontSize: 25,
                    fontWeight: 'bold',
                },
                btnCancel: {
                    height: 60,
                    width: 60,
                    borderRadius: 50,
                    marginLeft: 20,
                    backgroundColor: theme.colors.red,
                },
                btnTextCancel: {
                    color: theme.colors.white,
                    fontSize: 25,
                    fontWeight: 'bold',
                },
                datePicker: {
                    justifyContent: 'center',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    marginTop: 60,
                },
                datePickerCon: {
                    height: Dimensions.get('screen').height / 2.2,
                },
            }}
            onDateChange={(date) => setDob(date)}
        />
    );
};

// import React, {useEffect, useState} from 'react';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {View, Text, Platform} from 'react-native';
// import {Button, TouchableRipple} from 'react-native-paper';
// import theme from '../../../theme';
// import moment from 'moment';
// import styles from '../../../styles';
// export const DatePicker_ = ({navigation, style, setDob, dob}) => {
//     const [date, setDate] = useState(new Date(dob));
//     const [mode, setMode] = useState('date');
//     const [show, setShow] = useState(false);
//     const [maxDate, setMaxDate] = useState(new Date());

//     useEffect(() => {
//         var s = new Date();
//         s.setMonth(s.getMonth() - 12 * 20);
//         setMaxDate(s);
//         // alert(s);
//     }, []);
//     const onChange = (event, selectedDate) => {
//         const currentDate = selectedDate || date;
//         setDate(currentDate);
//     };

//     const showMode = (currentMode) => {
//         setShow(true);
//         setMode(currentMode);
//     };

//     const showDatepicker = () => {
//         showMode('date');
//     };
//     return (
//         <View>
//             <TouchableRipple
//                 onPress={showDatepicker}
//                 style={{
//                     marginLeft: 0,
//                     height: 50,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     // borderRadius: 50,
//                     borderColor: theme.colors.grey,
//                     borderWidth: 0,
//                     borderBottomWidth: 1,
//                     ...style,
//                 }}>
//                 <Text>{moment(dob).format('YYYY-MM-DD')}</Text>
//             </TouchableRipple>

//             {show && Platform.OS === 'ios' ? (
//                 <View>
//                     <DateTimePicker
//                         testID="dateTimePicker"
//                         value={new Date(dob)}
//                         mode={mode}
//                         minimumDate={new Date('1996-01-01')}
//                         maximumDate={maxDate}
//                         is24Hour={true}
//                         display="spinner"
//                         onChange={onChange}
//                     />
//                     <View style={[styles.flex_row, styles.items_center]}>
//                         <Button
//                             mode="contained"
//                             onPress={() => setDob(date)}
//                             dark
//                             color={theme.colors.black}
//                             style={[
//                                 styles.buttonContainer,
//                                 styles.mr_10,
//                                 styles.mt_20,
//                                 styles.flex,
//                             ]}
//                             contentStyle={[styles.buttonContentStyle]}>
//                             Cancel
//                         </Button>
//                         <Button
//                             mode="contained"
//                             onPress={() => setDob(date)}
//                             dark
//                             style={[
//                                 styles.buttonContainer,
//                                 styles.ml_10,
//                                 styles.mt_20,
//                                 styles.flex,
//                             ]}
//                             contentStyle={[styles.buttonContentStyle]}>
//                             Select
//                         </Button>
//                     </View>
//                 </View>
//             ) : (
//                 show &&
//                 Platform.OS === 'android' && (
//                     <DateTimePicker
//                         testID="dateTimePicker"
//                         value={date}
//                         mode={mode}
//                         is24Hour={true}
//                         display="spinner"
//                         onChange={onChange}
//                     />
//                 )
//             )}
//         </View>
//     );
// };
