import React, { useCallback, useRef, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  SectionList,
  TouchableOpacity,
  Separator,
} from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetSectionList,
} from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { color } from "react-native-reanimated";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 200,
  },
});

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

export default function QPLBottomSheet({ isActive, setActive }) {
  // hooks
  let count = useRef(0);
  count.current = -1;
  const seperator = (e) => {
    // console.log(count.current > DATA.length * 2);
    if (count.current >= DATA.length * 2 - 1) {
      count.current = -1;
    }
    count.current += 1;
    return count.current % 2 == 1 && count.current < DATA.length * 2 - 1 ? (
      <View style={{ height: 10, backgroundColor: "grey" }} />
    ) : null;
  };
  const sheetRef = useRef(null); //React.createRef(null); //(useRef < BottomSheet) | (null > null);

  const snapPoints = useMemo(() => ["100%"], []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handlePresentModalPress = useCallback(() => {
    if (isActive) {
      sheetRef.current?.present();
    }
  }, [isActive]);

  //callbacks
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    setActive(false);
  }, []);

  const styles = StyleSheet.create({
    closeButton: {
      paddingRight: 15,
      alignSelf: "flex-start",
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
    },
    heading2: {
      color: "#4B5E7D",
      fontSize: 14,
      paddingBottom: 10,
      // fontWeight: "300",
    },
    everythingWrapper: {
      // paddingHorizontal: 15,
    },
    sectionListHeaderText: {
      color: "#4B5E7D",
      fontWeight: "bold",
      fontSize: 18,
    },
    sectionListBodyText: {
      color: "#4B5E7D",
      fontSize: 14,
    },
    sectionListView: {
      paddingVertical: 10,
    },
    sectionItemView: {
      paddingVertical: 10,
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
  });

  renderSeparator = () => {
    return <View style={{ height: 2, backgroundColor: "grey" }} />;
  };
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      onClose={() => handleClosePress}
      style={styles.everythingWrapper}
    >
      {/* <BottomSheetScrollView
        contentContainerStyle={styles.contentContainer}
        horizontal={false}
      > */}
      {/* <View style={styles.everythingWrapper}> */}
      <View style={styles.closeButtonWrapper}>
        <TouchableOpacity style={styles.closeButton}>
          <Icon name="close" size={30}></Icon>
        </TouchableOpacity>
      </View>
      <Text style={styles.heading1}>Appointment Questions</Text>
      <Text style={styles.heading2}>
        If you need help with anything, choose some common questions to ask your
        doctor during your appointment.
      </Text>
      <BottomSheetSectionList
        sections={DATA}
        renderSeparator={this.renderSeparator}
        render
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.sectionItemView}>
            <Text style={styles.sectionListBodyText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionListView}>
            <Text style={styles.sectionListHeaderText}>{title}</Text>
          </View>
        )}
        SectionSeparatorComponent={(e) => seperator(e)}
        ItemSeparatorComponent={this.renderSeparator}
        // contentContainerStyle
      ></BottomSheetSectionList>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
      {/* </BottomSheetScrollView> */}
      {/* </View> */}
    </BottomSheet>
  );
}
