import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  WebView,
} from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/Feather";
import { API, Auth } from "aws-amplify";

export default function AppointmentOptionsBottomSheet({
  sheetRef,
  navigation,
}) {
  //APPOINTMENT IS STORED IN sheetRef.current.appointment
  async function deleteAppointment() {
    if (!sheetRef.current.appointment) {
      return;
    }
    const apiName = "Diabetesmate";
    const path = "/appointments/DELETE";
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    let appt = {
      "appointment_id": sheetRef.current.appointment["appointment_id"],
      "user_id": sheetRef.current.appointment["patient_id"]
    };
    console.log("fef", appt);
    const myInit = {
      headers: {
        Authorization: token,
      },
      signerServiceInfo: {
        service: null,
        region: null,
      },
      body: appt,
    };
    console.log("Appointment Options Bottom Sheet.js");
    try {
      console.log(await API.del(apiName, path, myInit));
    } catch (e) {
      console.log('del error', e);
    }

    // try {
    //   await Auth.signOut({ global: true });
    //   navigation.navigate("Choice");
    //   // nav;
    // } catch (error) {
    //   console.log("error signing out: ", error);
    // }
  }
  function editAppointment() {
    const appt = sheetRef.current.appointment;
    sheetRef.current?.close();
    navigation.navigate("EditAppointment", {
      appointment_type: appt.appointment_type,
      datetime: appt.appointment_datetime,
      method: "UPDATE",
      appointment: appt,
    });
  }
  const sectionData = [
    { title: "Edit Appointment", data: "edit", action: editAppointment },
    { title: "Delete Appointment", data: "x", action: deleteAppointment },
  ];
  //callbacks
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const styles = StyleSheet.create({
    closeButton: {
      paddingRight: 15,
      alignSelf: "flex-end",
    },
    closeButtonWrapper: {
      marginVertical: 5,
    },
    heading1: {
      color: "#25437B",
      paddingTop: 20,
      paddingBottom: 15,
      fontSize: 20,
      fontWeight: "bold",
      marginHorizontal: 20,
    },
    heading2: {
      color: "#4B5E7D",
      fontSize: 14,
      paddingBottom: 10,
      marginHorizontal: 20,
    },
    everythingWrapper: {},
    sectionListBodyText: {
      maxWidth: 300,
      color: "#1D2741",
      fontSize: 16,
      fontWeight: "500",
      height: 25,
      flex: 1,
    },
    sectionListView: {
      paddingVertical: 15,
      marginHorizontal: 20,
      flexDirection: "row",
      backgroundColor: "white",
      textAlign: "justify",
    },
    sectionItemView: {
      paddingVertical: 10,
      paddingBottom: 20,
      marginHorizontal: 20,
      flexDirection: "row",
    },
    button: {
      backgroundColor: "#5398FF",
      borderRadius: 50,
      marginHorizontal: 30,
      marginTop: 5,
      marginBottom: 35,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      paddingVertical: 20,
      textAlign: "center",
    },
    bar: {
      width: 15,
      height: 4,
      marginRight: 10,
      borderRadius: 5,
      backgroundColor: "#457FD6",
      justifyContent: "center",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
    },
    barWrapper: {
      justifyContent: "center",
    },
    checkboxWrapper: {
      alignContent: "flex-end",
      flex: 1,
    },
    checkboxStyle: { alignSelf: "flex-end" },
  });
  // console.log(appointmentData["questions"]["data"]);
  renderItemSeparator = () => {
    return (
      <View style={{ height: 2, backgroundColor: "#E8EBF0", marginLeft: 15 }} />
    );
  };
  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      style={styles.everythingWrapper}
      index={-1}
      enablePanDownToClose
      enableDynamicSizing={"true"}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetFlatList
        data={sectionData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.action}>
            <View style={styles.sectionListView}>
              <Icon
                name={item.data}
                size={25}
                color="#5398FF"
                style={{ marginHorizontal: 13 }}
              ></Icon>
              <View
                style={{ alignItems: "center", flexDirection: "row", flex: 1 }}
              >
                <Text style={styles.sectionListBodyText}>{item.title}</Text>
              </View>
              {item.title == "Feedback" && (
                <Icon
                  name="external-link"
                  size={25}
                  color="#D2D7E1"
                  style={{ marginHorizontal: 5 }}
                ></Icon>
              )}
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={renderItemSeparator}
      ></BottomSheetFlatList>
    </BottomSheet>
  );
}
