import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';

export const getFirebaseDeviceToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
    return fcmToken;
};

export const setUserOnCrashlytics = (user) => {
    console.log('setting crashlytics user id', user._id);
    crashlytics().setUserId(user._id);
    crashlytics().setAttributes({
        gender: user.gender,
        email: user.email,
        username: user.firstName + ' ' + user.lastName,
    });
};
export const logCrashlytics = (msg) => {
    crashlytics().log(msg);
};
export const logErrorOnCrashlytics = (error) => {
    crashlytics().recordError(new Error(error));
};

export const getInitials = (f, l) => {
    const firstInitial = f.toUpperCase()[0];
    const lastInitial = l.toUpperCase()[0];
    return firstInitial + '' + lastInitial;
};
