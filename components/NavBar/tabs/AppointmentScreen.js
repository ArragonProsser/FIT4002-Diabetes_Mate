import * as React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Upcoming from "./appointmentTabs/Upcoming";
import History from "./appointmentTabs/History";

const Tab = createMaterialTopTabNavigator();

export default function AppointmentScreen() {
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarIndicatorStyle: {
                        width: '40%',
                        marginHorizontal: 20,
                    },
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                        textTransform: 'none',
                    },
                }}
            >
                <Tab.Screen name="Upcoming" component={Upcoming}/>
                <Tab.Screen name="History" component={History}/>
            </Tab.Navigator>
        </>
    );
}