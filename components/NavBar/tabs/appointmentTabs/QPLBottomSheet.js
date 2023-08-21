import React, { useCallback, useRef, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  SectionList,
  TouchableOpacity,
} from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

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

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      onClose={() => handleClosePress}
    >
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <Text>Appointment Questions</Text>
        <Text>
          If you need help with anything, choose some common questions to ask
          your doctor during your appointment.
        </Text>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
