import React, { useCallback, useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { updateAppointmentsData } from "./During";

const DATA_REMINDERS = [
  {
    id: 0,
    title: "Urine Tests",
    instructions: "Get urine tests sample delivered to main office",
  },
  {
    id: 1,
    title: "Blood Tests",
    instructions: "Get blood tests done at the local blood transfer service",
  },
  {
    id: 2,
    title: "Bring Glucometer",
    instructions: "Bring the device fully charged with recorded data.",
  },
];

export default function ReminderBottomSheet({ sheetRef, appointmentData }) {
  let count = -1;

  const snapPoints = useMemo(() => ["80%"], []);

  //callbacks
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    let updateAppointment = appointmentData;
    delete updateAppointment.dtDisplay;
    delete updateAppointment.dateReminder;
    updateAppointmentsData(updateAppointment)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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

  // render
  const renderItem = useCallback(
    ({ item, index }) => (
      <View>
        <View style={styles.sectionItemView}>
          <Text style={styles.sectionListHeaderText}>{item.title}</Text>
          <View style={styles.checkboxWrapper}>
            <BouncyCheckbox
              isChecked={item["checked"]}
              onPress={(isChecked) => {
                appointmentData["reminders"][index]["checked"] =
                  !appointmentData["reminders"][index]["checked"];
              }}
              fillColor="#3DCE66"
              size={20}
              style={styles.checkboxStyle}
            />
          </View>
        </View>
        <View style={styles.sectionListView}>
          <Text style={styles.sectionListBodyText}>{item.instructions}</Text>
        </View>
      </View>
    ),
    []
  );
  const renderItemSeparator = useCallback(
    () => (
      <View style={{ height: 2, backgroundColor: "#E8EBF0", marginLeft: 15 }} />
    ),
    []
  );
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
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      index={-1}
    >
      <TouchableOpacity style={styles.closeButton}>
        <Icon name="close" size={30} onPress={handleClosePress}></Icon>
      </TouchableOpacity>
      <Text style={styles.heading1}>Reminders</Text>
      <Text style={styles.heading2}>
        Things that the doctor will need before the appointment.
      </Text>
      <BottomSheetFlatList
        data={appointmentData.reminders}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        ItemSeparatorComponent={renderItemSeparator}
        ListFooterComponent={renderItemSeparator}
      ></BottomSheetFlatList>
      <TouchableOpacity style={styles.button} onPress={handleClosePress}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
}
