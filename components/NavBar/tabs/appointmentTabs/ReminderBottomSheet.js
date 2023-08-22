import React, { useCallback, useRef, useMemo, useState } from "react";
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
import BouncyCheckbox from "react-native-bouncy-checkbox";
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

export default function QPLBottomSheet({ isActive, setActive, sheetRef }) {
  // hooks
  let [count, setCount] = useState(-1);
  // setCount(-1);
  console.log("new__________");
  const seperator = (e) => {
    if (count >= DATA.length * 2) {
      setCount(-1);
    }
    console.log("count: " + count);
    console.log("Data:" + DATA.length);
    console.log(count > DATA.length * 2);
    count += 1;
    // count += 1;
    return count % 2 == 1 && count < DATA.length * 2 - 1 ? (
      <View style={{ height: 10, backgroundColor: "#E8EBF0" }}>
        {/* <Text>{count}</Text> */}
      </View>
    ) : null;
  };
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  //React.createRef(null); //(useRef < BottomSheet) | (null > null);

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
      // fontWeight: "300",
    },
    everythingWrapper: {
      // paddingHorizontal: 10,
      // marginHorizontal:10
    },
    sectionListHeaderText: {
      color: "#4B5E7D",
      fontWeight: "bold",
      fontSize: 18,
      // marginHorizontal: 20,
    },
    sectionListBodyText: {
      maxWidth: 300,
      color: "#4B5E7D",
      fontSize: 14,
      // marginHorizontal: 20,
      fontWeight: "500",
    },
    sectionListView: {
      paddingVertical: 10,
      marginHorizontal: 20,
      flexDirection: "row",
      // justifyContent: "center",
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
      // position: "relative",
    },
    barWrapper: {
      justifyContent: "center",
    },
    checkboxWrapper: {
      // borderColor: "yellow",
      // borderWidth: 2,
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
      // onClose={() => handleClosePress}
      style={styles.everythingWrapper}
    >
      {/* <BottomSheetScrollView
        contentContainerStyle={styles.contentContainer}
        horizontal={false}
      > */}
      {/* <View style={styles.everythingWrapper}> */}
      {/* <View style={styles.closeButtonWrapper}> */}
      <TouchableOpacity style={styles.closeButton}>
        <Icon name="close" size={30} onPress={handleClosePress}></Icon>
      </TouchableOpacity>
      {/* </View> */}
      <Text style={styles.heading1}>Reminders</Text>
      <Text style={styles.heading2}>
        Things that the doctor will need before the appointment.
      </Text>
      <BottomSheetSectionList
        sections={DATA}
        renderSeparator={this.renderSeparator}
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
        SectionSeparatorComponent={(e) => seperator(e)}
        // SectionSeparatorComponent={this.renderSeparator}
        ItemSeparatorComponent={this.renderSeparator}
        // contentContainerStyle
      ></BottomSheetSectionList>
      <TouchableOpacity style={styles.button} onPress={handleClosePress}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
      {/* </BottomSheetScrollView> */}
      {/* </View> */}
    </BottomSheet>
  );
}
