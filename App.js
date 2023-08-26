import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionSpecs,TransitionPresets } from "@react-navigation/stack";
// Enables additional expo debugging messages.
// import 'expo-dev-client';
const Stack = createStackNavigator();

import NavBar from "./components/NavBar/NavBar";
import Choice from "./components/Onboarding/Choice";
import Login from "./components/Onboarding/Login";
import DetailsScreen from "./components/Onboarding/Details";
import SignUpScreen from "./components/Onboarding/Signup";
import ConfirmEmailScreen from "./components/Onboarding/ConfirmEmail";

import {Amplify} from "aws-amplify";
import config from "./aws-exports";

Amplify.configure(config);


function App() {
  return (
    <NavigationContainer>
      
      <Stack.Navigator 
      initialRouteName="details"
      screenOptions={TransitionPresets.SlideFromRightIOS}
      >
        <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              headerTitleAlign: 'center',
              headerShown:false,
              transitionSpec: {
                open: TransitionSpecs.BottomSheetSlideInSpec,
                close: TransitionSpecs.BottomSheetSlideOutSpec,
              },
            }}
          />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitleAlign: 'center',
            transitionSpec: {
              open: TransitionSpecs.BottomSheetSlideInSpec,
              close: TransitionSpecs.BottomSheetSlideOutSpec,
            },
            headerTintColor:"#25437B",
            headerTitleStyle: {
              fontSize:20,
              color:"#25437B"
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitle: 'Sign Up',
            transitionSpec: {
              open: TransitionSpecs.BottomSheetSlideInSpec,
              close: TransitionSpecs.BottomSheetSlideOutSpec,
            },
            headerTintColor:"#25437B",
            headerTitleStyle: {
              fontSize:20,
              color:"#25437B"
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="ConfirmEmail"
          component={ConfirmEmailScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitle: 'Confirm Email',
            transitionSpec: {
              open: TransitionSpecs.BottomSheetSlideInSpec,
              close: TransitionSpecs.BottomSheetSlideOutSpec,
            },
            headerTintColor:"#25437B",
            headerTitleStyle: {
              fontSize:20,
              color:"#25437B"
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Choice"
          component={Choice}
          
          options={{
            headerTitleAlign: 'center',
            headerTitle:"",
            // headerShown:false,
            headerTintColor:"#25437B",
            transitionSpec: {
              open: TransitionSpecs.BottomSheetSlideInSpec,
              close: TransitionSpecs.BottomSheetSlideOutSpec,
            },
            headerTintColor:"white",
            headerShadowVisible: false,
            headerTransparent: true

          }}
        />
        <Stack.Screen
          name="Home"
          component={NavBar}
          
          options={{
            headerTitle:"",
            headerShown:false,

          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

{
  /* <>
<Choice/>
<Login/>
<NavBar/>
</> */
}

export default App;