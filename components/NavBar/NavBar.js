import * as React from "react";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";

// Screens
import AppointmentScreen from "./tabs/AppointmentScreen";
import BiomarkerScreen from "./tabs/BiomarkerScreen";
import EducationScreen from "./tabs/EducationScreen";
import ProfileBottomSheet from "./ProfileBottomSheet";

// Screen Names:
const appointmentName = "Appointments";
const biomarkerName = "Biomarker History";
const educationName = "Education";

const Tab = createBottomTabNavigator();

export default function NavBar({ navigation }) {
  const profileRef = useRef(null);
  return (
    <>
      <Tab.Navigator
        // Start in the appointments tab.
        initalRouteName={appointmentName}
        // Sequentially define the Icons

        screenOptions={({ route }) => ({
          tabBarStyle: { height: 80, paddingVertical: 10 },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routeName = route.name;

            if (routeName === appointmentName) {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (routeName === biomarkerName) {
              iconName = focused ? "stats-chart" : "stats-chart-outline";
            } else if (routeName === educationName) {
              iconName = focused ? "book" : "book-outline";
            }

            // Icons (IonIcons happened to match figma diagram icons).
            return <IonIcons name={iconName} size={size} color={color} />;
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                profileRef.current?.expand();
              }}
            >
              <Icon
                name="user"
                size={25}
                color="#5398FF"
                style={{ marginRight: 13 }}
              ></Icon>
            </TouchableOpacity>
          ),
        })}
      >
        {/*
                    Appointment, Biomarker, Education Tabs
                    options field hides the word name & only displays in the Icon.
                    */}
        <Tab.Screen
          name={appointmentName}
          component={AppointmentScreen}
          options={{ tabBarLabel: "", headerTitleAlign: "center" }}
        />
        <Tab.Screen
          name={biomarkerName}
          component={BiomarkerScreen}
          options={{ tabBarLabel: "", headerTitleAlign: "center" }}
        />
        <Tab.Screen
          name={educationName}
          component={EducationScreen}
          options={{ tabBarLabel: "", headerTitleAlign: "center" }}
        />
      </Tab.Navigator>
      <ProfileBottomSheet
        sheetRef={profileRef}
        navigation={navigation}
      ></ProfileBottomSheet>
    </>
  );
}
