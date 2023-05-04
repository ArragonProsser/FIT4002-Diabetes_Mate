import * as React from 'react';
import {View, Text} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons'

// Screens
import AppointmentScreen from './tabs/AppointmentScreen';
import BiomarkerScreen from './tabs/BiomarkerScreen';
import ResourceScreen from './tabs/ResourceScreen';

// Screen Names:
const appointmentName = 'Appointments';
const biomarkerName = 'Biomarkers';
const resourcesName = 'Resources';

const Tab = createBottomTabNavigator();

export default function NavBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                // Start in the appointments tab.
                initalRouteName={appointmentName}
                
                // Sequentially define the Icons
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let routeName = route.name;

                        if (routeName === appointmentName) {
                            iconName = focused ? 'calendar' : 'calendar-outline'
                        } else if (routeName == biomarkerName) {
                            iconName = focused ? 'stats-chart' : 'stats-chart-outline'
                        } else if (routeName == resourcesName) {
                            iconName = focused ? 'book' : 'book-outline'
                        }
                        
                        // Icons (IonIcons happened to match figma diagram icons).
                        return <IonIcons name={iconName} size={size} color={color}/>;
                    },
                })}
                >
                    {/*
                    Appointment, Biomarker, Resource Tabs 
                    options field hides the word name & only displays in the Icon.
                    */}
                    <Tab.Screen name={appointmentName} component={AppointmentScreen} options={{tabBarLabel: '',}}/>
                    <Tab.Screen name={biomarkerName} component={BiomarkerScreen} options={{tabBarLabel: '',}}/>
                    <Tab.Screen name={resourcesName} component={ResourceScreen} options={{tabBarLabel: '',}}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}
