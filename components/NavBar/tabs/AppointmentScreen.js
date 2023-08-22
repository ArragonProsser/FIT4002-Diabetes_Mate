import * as React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Upcoming, History } from "./appointmentTabs/Appointment";
import Detail from "./appointmentTabs/Detail";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialTopTabNavigator();

const UpcomingScreenStack = createStackNavigator();

function UpcomingStackScreen() {
  return (
    <UpcomingScreenStack.Navigator>
      <UpcomingScreenStack.Screen
        name="UpcomingStack"
        component={Upcoming}
        options={{ headerShown: false }}
      />
      <UpcomingScreenStack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTitle: "",
          headerBackTitleVisible: false,
          headerTintColor: "white",
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      />
    </UpcomingScreenStack.Navigator>
  );
}

export default function AppointmentScreen() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            width: "40%",
            marginHorizontal: 20,
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
            textTransform: "none",
          },
        }}
      >
        <Tab.Screen name="Upcoming" component={UpcomingStackScreen} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
    </>
  );
}
