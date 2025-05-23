import React, { useRef, useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import QPLBottomSheet from "./QPLBottomSheet";
import ReminderBottomSheet from "./ReminderBottomSheet";

/**
 *
 * @param route The navigation route
 * @param navigation
 * @returns {JSX.Element} The Appointment Detail page
 * @constructor
 */
export default function Detail({ route, navigation }) {
  const spacerHeight = 1000;
  const styles = StyleSheet.create({
    topContainer: {
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor: "#447FD6",
    },
    bottomContainer: {
      flex: 1,
      paddingVertical: 40,
      paddingHorizontal: 20,
      backgroundColor: "white",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    spacer: {
      backgroundColor: "#447FD6",
      height: spacerHeight,
      position: "absolute",
      top: -spacerHeight,
      left: 0,
      right: 0,
    },
    dateReminderContainer: {
      backgroundColor: "#6A99DE",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 25,
    },
    button: {
      backgroundColor: "#5398FF",
      borderRadius: 50,
      marginHorizontal: 30,
      marginVertical: 15,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      paddingVertical: 20,
      textAlign: "center",
    },
    cardContainer: {
      borderRadius: 20,
      borderColor: "#E8EBF0",
      borderWidth: 1,
      marginTop: 16,
    },
    cardTitle: {
      color: "#5398FF",
      fontWeight: "bold",
      fontSize: 16,
      paddingTop: 24,
      paddingHorizontal: 16,
    },
    cardText: {
      color: "#25437B",
      paddingTop: 12,
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
  });
  const sheetRefQPL = useRef(null);
  const sheetRefReminder = useRef(null);
  const { appointment_type, datetime, dateReminder, appointment } = route.params;

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: true });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.spacer}></View>
          <View style={styles.topContainer}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.dateReminderContainer}>
                <Text style={{ color: "white" }}>{dateReminder}</Text>
              </View>
            </View>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 24,
                paddingTop: 15,
              }}
            >
              {appointment_type}
            </Text>
            <Text style={{ color: "white", paddingTop: 15 }}>{datetime}</Text>
          </View>
          <View style={{ backgroundColor: "#447FD6" }}>
            <View style={styles.bottomContainer}>
              <Text
                style={{
                  color: "#25437B",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                Before your appointment
              </Text>
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => {
                  sheetRefQPL.current?.expand();
                }}
              >
                <Text style={styles.cardTitle}>Pick some questions</Text>
                <Text style={styles.cardText}>
                  Choose some common questions to ask your doctor during your
                  appointment.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => {
                  sheetRefReminder.current?.expand();
                }}
              >
                <Text style={styles.cardTitle}>Check Reminders</Text>
                <Text style={styles.cardText}>
                  View any items that have been set by the practitioner that
                  need to be completed.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            borderBottomColor: "#E8EBF0",
            borderBottomWidth: 1,
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("During", {
              appointment: appointment,
            });
          }}
        >
          <Text style={styles.buttonText}>Start Appointment</Text>
        </TouchableOpacity>
      </View>
      <QPLBottomSheet
        sheetRef={sheetRefQPL}
        appointmentData={appointment}
      ></QPLBottomSheet>
      <ReminderBottomSheet
        sheetRef={sheetRefReminder}
        appointmentData={appointment}
      ></ReminderBottomSheet>
    </GestureHandlerRootView>
  );
}
