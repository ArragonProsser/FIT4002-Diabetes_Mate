import * as React from 'react';
import {Stylesheet, View, Text} from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import Resources from './resourceTabs/Resources';
import QuestionPrompts from './resourceTabs/QuestionPrompts';

export default function ResourceScreen({navigation}) {
    return(
        <>
            <Tab.Navigator
            screenOptions={{
                tabBarIndicatorStyle: {
                  width: '40%',
                  marginHorizontal: 20,
                },
                tabBarLabelStyle: {
                  fontWeight: 'bold',
                  // textTransform: 'none',
                },
              }}
            >
                <Tab.Screen name="Question prompts" component={QuestionPrompts} />
                <Tab.Screen name="Resources" component={Resources} />
            </Tab.Navigator>
        </>
    );
}