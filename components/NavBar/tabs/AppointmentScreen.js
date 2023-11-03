import * as React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Upcoming, History } from "./appointmentTabs/Appointment";
import Detail from "./appointmentTabs/Detail";
import { createStackNavigator } from "@react-navigation/stack";
import During from "./appointmentTabs/During";
import { EditAppointment } from "./appointmentTabs/EditAppointment";

const Tab = createMaterialTopTabNavigator();

const UpcomingScreenStack = createStackNavigator();

/**
 *
 * @returns {JSX.Element} The Upcoming stack (Upcoming Appointment -> Appointment Detail -> During Appointment)
 * @constructor
 */
function UpcomingStackScreen({ bottomSheetRef }) {
  return (
    <UpcomingScreenStack.Navigator>
      <UpcomingScreenStack.Screen
        name="UpcomingStack"
        // component={Upcoming}
        options={{ headerShown: false }}
      >
        {(props) => <Upcoming {...props} bottomSheetRef={bottomSheetRef} />}
      </UpcomingScreenStack.Screen>
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
      <UpcomingScreenStack.Screen
        name="During"
        component={During}
        options={{
          headerTitle: "",
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      />
      <UpcomingScreenStack.Screen
        name="EditAppointment"
        component={EditAppointment}
        options={{
          headerTitle: "",
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      />
    </UpcomingScreenStack.Navigator>
  );
}

/**
 *
 * @returns {JSX.Element} The Appointment Tab (the first item in the bottom navigation bar)
 * @constructor
 */
export default function AppointmentScreen({ bottomSheetRef }) {
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
        <Tab.Screen name="Upcoming">
          {(props) => (
            <UpcomingStackScreen {...props} bottomSheetRef={bottomSheetRef} />
          )}
        </Tab.Screen>
        <Tab.Screen name="History">
          {(props) => <History {...props} bottomSheetRef={bottomSheetRef} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}
