import React, { useCallback, useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const DATA = [
  {
    title: "General Information",
    data: [
      "How may diabetes affect my vision?",
      "How may diabetes affect my driving?",
      "How may diabetes affect my heart and blood vessels?",
    ],
  },
  {
    title: "Healthy Eating",
    data: ["What kind of foods should i avoid?"],
  },
  {
    title: "Being Active",
    data: [
      "How does excercise affect my glucose levels?",
      "Is the type of excercise important in how my glucose levels change?",
    ],
  },
];

export default function QPLBottomSheet({ sheetRef }) {
  let count = -1;
  console.log("NEW!!!!!!!!!");
  function customSectionSeparator() {
    if (count >= DATA.length - 1) {
      count = -1;
    }
    console.log("count: " + count);
    console.log("Data:" + DATA.length);
    console.log(count > DATA.length * 2);
    count += 1;
    return count < DATA.length - 1 ? (
      <View style={{ height: 10, backgroundColor: "#E8EBF0" }}></View>
    ) : null;
  }

  const snapPoints = useMemo(() => ["90%"], []);

  // const handleSnapPress = useCallback((index) => {
  //   sheetRef.current?.snapToIndex(index);
  // }, []);
  // const handlePresentModalPress = useCallback(() => {
  //   if (isActive) {
  //     sheetRef.current?.present();
  //   }
  // },);

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
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      style={styles.everythingWrapper}
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
        sections={DATA}
        render
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <View style={styles.sectionItemView}>
            <Text style={styles.sectionListBodyText}>{item}</Text>
            <View style={styles.checkboxWrapper}>
              <BouncyCheckbox
                onPress={(isChecked) => {}}
                fillColor="#3DCE66"
                size={20}
                style={styles.checkboxStyle}
              />
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
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
