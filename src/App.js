import React, {useEffect, useContext, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import theme from '../theme';

import {
    PhoneNumber,
    Location,
    OTP,
    Email,
    Gender,
    DOB,
    About,
    Name,
    ProfilePicture,
    Completed,
    InEvent,
    Call,
    SettingsScreen,
    UpdatePhoto,
    AttendEvent,
    Events,
    StartEvent,
    Profile,
    UpdateProfile,
    PrivacyPolicy,
    MikeCamera,
    ContactUs,
    ViewPhoto,
    FAQ,
    Terms,
    Country,
    ForgetPassword,
    Matches,
    MatchProfile,
    Messages,
    Splash,
    StartUp,
} from '@screens';
import {NavigationOptions} from './constants/Layout';
import {ToastProvider, ToastContext} from './hooks/providers/Toast';
import {AuthProvider} from './hooks/auth';
import {LoaderProvider} from './hooks/providers/Loader';
import {AppProvider} from './hooks/providers/App';
import {EventProvider} from './hooks/event';
import {MatchProvider} from './hooks/providers/Match';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import RNUxcam from 'react-native-ux-cam';
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const TabScreens = () => {
    const {openToast} = useContext(ToastContext);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            const {
                notification: {title, body},
            } = remoteMessage;
            openToast('success', body);
            //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
        return unsubscribe;
    }, []);

    return (
        <Tab.Navigator
            activeColor={theme.colors.primary}
            inactiveColor={theme.colors.grey}
            barStyle={{backgroundColor: 'white'}}
            initialRouteName="Home"
            shifting={true}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Matches') {
                        iconName = focused ? 'heart' : 'heart-half';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={25} color={color} />;
                },
            })}>
            <Tab.Screen name="Home" component={Events} />
            <Tab.Screen name="Matches" component={Matches} />
            <Tab.Screen name="Profile" component={Profile} />
            {/* <Tab.Screen name="Chat" component={ChatUsers} /> */}
        </Tab.Navigator>
    );
};

export default () => {
    const routeNameRef = useRef();
    const navigationRef = useRef();

    useEffect(() => {
        requestUserPermission();

        // const channel = new firebase.notifications.Android.Channel(
        //     'insider',
        //     'insider channel',
        //     firebase.notifications.Android.Importance.Max,
        //   );
        //   firebase.notifications().android.createChannel(channel);
        // checkPermission();
        // createNotificationListeners(); //add this line
        // // io.io(variables.baseUrl)
        // // io(variables.baseUrl);
        // return () => {
        //     notificationListener();
        //     notificationOpenedListener();
        // }
    }, []);

    // const getToken = async () => {

    // const createNotificationListeners = async () =>  {
    //     // To dipslay foreground message as notification
    //     // firebase.notifications().onNotification(notification => {
    //     //   notification.android.setChannelId('insider').setSound('default');
    //     //   firebase.notifications().displayNotification(notification);
    //     // });

    //     /*
    //      * Triggered when a particular notification has been received in foreground
    //      * */
    //     this.notificationListener = firebase
    //       .notifications()
    //       .onNotification(notification => {
    //         const {title, body} = notification;
    //         alert(body)
    //         // this.openAlert(title, body);
    //       });

    //     /*
    //      * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    //      * */
    //     this.notificationOpenedListener = firebase
    //       .notifications()
    //       .onNotificationOpened(notificationOpen => {
    //         const {title, body} = notificationOpen.notification;
    //         alert(body);
    //         // this.openAlert(title, body);
    //         // this.showAlert(title, body);
    //       });

    //     /*
    //      * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    //      * */
    //     const notificationOpen = await firebase
    //       .notifications()
    //       .getInitialNotification();
    //     if (notificationOpen) {
    //       const {title, body} = notificationOpen.notification;
    //         // this.openAlert(title, body);
    //         alert(body)
    //     }
    //     /*
    //      * Triggered for data only payload in foreground
    //      * */
    //     this.messageListener = firebase.messaging().onMessage(message => {
    //       //process data message
    //       console.log(JSON.stringify(message));
    //     });
    // }
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    };

    const onNavigationChange = async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
            RNUxcam.tagScreenName(`Screen_${currentRouteName}`);
            await analytics().logEvent(`page_${currentRouteName}`, {
                screen_name: currentRouteName,
                screen_class: currentRouteName,
            });
        }
        routeNameRef.current = currentRouteName;
    };

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() =>
                (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
            }
            onStateChange={onNavigationChange}>
            <PaperProvider theme={theme}>
                <LoaderProvider>
                    <ToastProvider>
                        <AppProvider>
                            <AuthProvider>
                                <EventProvider>
                                    <MatchProvider>
                                        <Stack.Navigator
                                            initialRouteName="Splash"
                                            screenOptions={NavigationOptions}>
                                            <Stack.Screen
                                                name="Splash"
                                                options={{header: () => null}}
                                                component={Splash}
                                            />
                                            <Stack.Screen
                                                name="StartUp"
                                                options={{header: () => null}}
                                                component={StartUp}
                                            />
                                            <Stack.Screen
                                                name="Country"
                                                options={{header: () => null}}
                                                component={Country}
                                            />
                                            <Stack.Screen
                                                name="PhoneNumber"
                                                options={{header: () => null}}
                                                component={PhoneNumber}
                                            />
                                            <Stack.Screen
                                                name="OTP"
                                                options={{header: () => null}}
                                                component={OTP}
                                            />
                                            <Stack.Screen
                                                name="Location"
                                                options={{header: () => null}}
                                                component={Location}
                                            />
                                            <Stack.Screen
                                                name="Name"
                                                options={{header: () => null}}
                                                component={Name}
                                            />

                                            <Stack.Screen
                                                name="Email"
                                                options={{header: () => null}}
                                                component={Email}
                                            />
                                            <Stack.Screen
                                                name="DOB"
                                                options={{header: () => null}}
                                                component={DOB}
                                            />
                                            <Stack.Screen
                                                name="Gender"
                                                options={{header: () => null}}
                                                component={Gender}
                                            />
                                            <Stack.Screen
                                                name="ProfilePicture"
                                                options={{header: () => null}}
                                                component={ProfilePicture}
                                            />
                                            <Stack.Screen
                                                name="About"
                                                options={{header: () => null}}
                                                component={About}
                                            />
                                            <Stack.Screen
                                                name="Completed"
                                                options={{header: () => null}}
                                                component={Completed}
                                            />
                                            <Stack.Screen
                                                name="ForgetPassword"
                                                component={ForgetPassword}
                                            />
                                            <Stack.Screen
                                                name="Profile"
                                                component={Profile}
                                            />

                                            <Stack.Screen
                                                name="UpdatePhoto"
                                                options={{
                                                    title: 'Update Photo',
                                                }}
                                                component={UpdatePhoto}
                                            />
                                            <Stack.Screen
                                                name="Settings"
                                                component={SettingsScreen}
                                            />
                                            <Stack.Screen
                                                name="UpdateProfile"
                                                options={{
                                                    title: 'Update Profile',
                                                }}
                                                component={UpdateProfile}
                                            />
                                            <Stack.Screen
                                                name="PrivacyPolicy"
                                                options={{
                                                    title: 'Privacy Policay',
                                                }}
                                                component={PrivacyPolicy}
                                            />
                                            <Stack.Screen
                                                name="FAQ"
                                                component={FAQ}
                                            />
                                            <Stack.Screen
                                                name="ContactUs"
                                                component={ContactUs}
                                            />
                                            <Stack.Screen
                                                name="Terms"
                                                component={Terms}
                                            />
                                            <Stack.Screen
                                                name="MikeCamera"
                                                options={{title: 'Mike Camera'}}
                                                component={MikeCamera}
                                            />
                                            <Stack.Screen
                                                name="AttendEvent"
                                                options={{header: () => null}}
                                                component={AttendEvent}
                                            />
                                            <Stack.Screen
                                                name="Call"
                                                options={{header: () => null}}
                                                component={Call}
                                            />
                                            <Stack.Screen
                                                name="InEvent"
                                                component={InEvent}
                                            />
                                            <Stack.Screen
                                                name="StartEvent"
                                                options={{header: () => null}}
                                                component={StartEvent}
                                            />
                                            <Stack.Screen
                                                name="Tab"
                                                options={{header: () => null}}
                                                component={TabScreens}
                                            />
                                            <Stack.Screen
                                                name="MatchProfile"
                                                options={{
                                                    title: 'Match Profile',
                                                }}
                                                component={MatchProfile}
                                            />
                                            <Stack.Screen
                                                name="Messages"
                                                options={{header: () => null}}
                                                component={Messages}
                                            />
                                            <Stack.Screen
                                                name="ViewPhoto"
                                                options={{header: () => null}}
                                                component={ViewPhoto}
                                            />
                                        </Stack.Navigator>
                                    </MatchProvider>
                                </EventProvider>
                            </AuthProvider>
                        </AppProvider>
                    </ToastProvider>
                </LoaderProvider>
            </PaperProvider>
        </NavigationContainer>
    );
};
