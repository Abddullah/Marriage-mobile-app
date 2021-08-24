/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './src/App';
import {name as appName} from './app.json';
import RNUxcam from 'react-native-ux-cam';
import RNBootSplash from "react-native-bootsplash";

RNBootSplash.hide({ fade: true }); // fade
RNUxcam.optIntoSchematicRecordings(); // Add this line to enable iOS screen recordings
RNUxcam.setAutomaticScreenNameTagging(false);
RNUxcam.startWithKey('w7e3cwkoo1625vy');

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
