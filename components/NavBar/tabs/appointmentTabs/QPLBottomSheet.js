import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetSectionList,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { updateAppointmentsData } from "./During";

export default function QPLBottomSheet({ sheetRef, appointmentData }) {
  let count = -1;
  console.log("QPL BOTTOM SHEET NEW ----");
  // Adds Sections Separators only for the end of each
  function customSectionSeparator() {
    // Reset Count to -1
    if (count >= appointmentData.questions.length - 1) {
      count = -1;
    }
    // console.log("count: " + count);
    // console.log(appointmentData);
    count += 1;
    //Only render if it is smaller than the appointment quesiton data list
    return count < appointmentData.questions.length ? (
      <View style={{ height: 10, backgroundColor: "#E8EBF0" }}></View>
    ) : null;
  }

  const snapPoints = useMemo(() => ["80%"], []);

  //callbacks
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    //update biomarkers in database
    let updateAppointment = appointmentData;
    let tempDT = updateAppointment.dtDisplay;
    let tempDateReminder = updateAppointment.dateReminder;
    delete updateAppointment.dtDisplay;
    delete updateAppointment.dateReminder;
    updateAppointmentsData(updateAppointment)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    updateAppointment.dtDisplay = tempDT;
    updateAppointment.dateReminder = tempDateReminder;
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
    sectionListHeaderText: {
      color: "#4B5E7D",
      fontWeight: "bold",
      fontSize: 18,
    },
    sectionListBodyText: {
      maxWidth: 300,
      color: "#4B5E7D",
      fontSize: 14,
      fontWeight: "500",
    },
    sectionListView: {
      paddingVertical: 10,
      marginHorizontal: 20,
      flexDirection: "row",
      backgroundColor: "white",
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
  renderSeparator = () => {
    return (
      <View style={{ height: 2, backgroundColor: "#E8EBF0", marginLeft: 15 }} />
    );
  };
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
      snapPoints={snapPoints}
      style={styles.everythingWrapper}
      enablePanDownToClose
      // enableDynamicSizing={"true"}
      backdropComponent={renderBackdrop}
      index={-1}
    >
      <TouchableOpacity style={styles.closeButton}>
        <Icon name="close" size={30} onPress={handleClosePress}></Icon>
      </TouchableOpacity>
      <Text style={styles.heading1}>Appointment Questions</Text>
      <Text style={styles.heading2}>
        If you need help with anything, choose some common questions to ask your
        doctor during your appointment.
      </Text>
      <BottomSheetSectionList
        // stickySectionHeadersEnabled
        sections={appointmentData.questions}
        renderItem={({ item, section, index }) => (
          <View style={styles.sectionItemView}>
            <Text style={styles.sectionListBodyText}>{item["question"]}</Text>
            <View style={styles.checkboxWrapper}>
              <BouncyCheckbox
                isChecked={item["checked"]}
                onPress={(isChecked) => {
                  //update biomarkers locally
                  appointmentData["questions"][section["id"]]["data"][index][
                    "checked"
                  ] =
                    !appointmentData["questions"][section["id"]]["data"][index][
                      "checked"
                    ];
                }}
                fillColor="#3DCE66"
                size={20}
                style={styles.checkboxStyle}
              />
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title }, index }) => (
          <View style={styles.sectionListView}>
            <View style={styles.barWrapper}>
              <View style={styles.bar}></View>
            </View>
            <Text style={styles.sectionListHeaderText}>{title}</Text>
          </View>
        )}
        renderSectionFooter={customSectionSeparator}
        ItemSeparatorComponent={this.renderSeparator}
      ></BottomSheetSectionList>
      <TouchableOpacity style={styles.button} onPress={handleClosePress}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
}
