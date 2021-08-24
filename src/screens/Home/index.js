import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feed from '../Feed';
import Connections from '../Connections';
import Messages from '../Messages';
import Profile from '../Profile';
// import Notifications from '../Notifications'

const Tab = createBottomTabNavigator();

const Home = () => {
    return (
        <Tab.Navigator initialRouteName="Feed">
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="Connections" component={Connections} />
            <Tab.Screen name="Messages" component={Messages} />
            {/* <Tab.Screen name="Notifications" component={Notifications} /> */}
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default Home;
