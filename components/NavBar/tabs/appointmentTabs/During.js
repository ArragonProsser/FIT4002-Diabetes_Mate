import React, { useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SectionList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TextInput } from "react-native-gesture-handler";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Snackbar } from "react-native-paper";
import { API, Auth } from "aws-amplify";

/**
 *
 * @param appointment Request body of the updated appointment
 * @returns {Promise<any>} Object that contains the data of the current appointment
 */
export async function updateAppointmentsData(appointment) {
  const apiName = "Diabetesmate";
  const path = "/appointments/UPDATE";
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  const myInit = {
    headers: {
      Authorization: token,
    },
    signerServiceInfo: {
      service: null,
      region: null,
    },
    body: appointment,
  };
  return API.put(apiName, path, myInit);
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  topContainer: {
    flexDirection: "row",
    marginBottom: 40,
  },
  numberFrame: {
    backgroundColor: "#ECF2FB",
    height: 56,
    width: 56,
    borderRadius: 16,
    marginRight: 16,
  },
  numberText: {
    textAlign: "center",
    lineHeight: 56,
    color: "#5398FF",
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    fontSize: 16,
    color: "#25437B",
    marginBottom: 8,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#4B5E7D",
    fontWeight: "400",
  },
  biomarkerContainer: {
    marginBottom: 20,
  },
  biomarkerRowFlexContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  biomarkerTitle: {
    fontSize: 14,
    color: "#25437B",
    marginBottom: 16,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  biomarkerSubtitle: {
    fontSize: 14,
    color: "#25437B",
    marginBottom: 16,
    fontWeight: "500",
  },
  biomarkerPlaceholder: {
    fontSize: 14,
    fontWeight: "400",
    flexWrap: "wrap",
  },
  notesPlaceholder: {
    fontSize: 14,
    height: 70,
    width: screenWidth - 20,
    fontWeight: "400",
  },
  buttonDivider: {
    borderBottomColor: "#E8EBF0",
    borderBottomWidth: 1,
  },
  biomarkerDivider: {
    borderBottomColor: "#E8EBF0",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#5398FF",
    borderRadius: 50,
    marginVertical: 15,
    width: "90%",
    alignSelf: "center",
  },
  startRecordButton: {
    borderColor: "#5398FF",
    borderWidth: 1,
    backgroundColor: "white",
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
  recordButtonText: {
    color: "#5398FF",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 20,
    textAlign: "center",
  },
  recordBarBase: {
    width: (screenWidth * 2) / 3,
    height: 15,
    backgroundColor: "lightgray",
    borderRadius: 10,
    position: "absolute",
    zIndex: 0,
    marginTop: 15,
  },
  recordBar: {
    height: 15,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "#5398FF",
    zIndex: 1,
  },
  recordButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#5398FF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: (screenWidth * 5) / 7,
    position: "absolute",
    zIndex: 0,
  },
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
  bar: {
    width: 15,
    height: 4,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#457FD6",
    justifyContent: "center",
    display: "flex",
    alignContent: "center",
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

const Tab = createMaterialTopTabNavigator();
/**
 *
 * @param route The navigation route
 * @param navigation
 * @returns {JSX.Element} The During Appointment page
 * @constructor
 */
export default function During({ route, navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.spacer}></View>
      <Tab.Navigator
        options={{
          headerStyle: { color: "red" },
        }}
        screenOptions={{
          tabBarIndicatorStyle: {
            width: "25%",
            marginHorizontal: 20,
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
            textTransform: "none",
          },
        }}
      >
        <Tab.Screen
          name="Questions"
          component={Questions}
          initialParams={{ route, navigation }}
        />
        <Tab.Screen
          name="Biomarkers"
          component={Biomarkers}
          initialParams={{ duringRoute: route, duringNavigation: navigation }}
        />
        <Tab.Screen
          name="Notes"
          component={Notes}
          initialParams={{ route, navigation }}
        />
      </Tab.Navigator>

      <View style={styles.buttonDivider} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("UpcomingStack");
        }}
      >
        <Text style={styles.buttonText}>Complete Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 *
 * @param route The navigation route
 * @param navigation
 * @returns {JSX.Element} The Biomarkers page
 * @constructor
 */
function Biomarkers({ route, navigation }) {
  let { duringRoute, duringNavigation } = route.params;
  let appointment = duringRoute.params["appointment"];

  // console.log(appointment);
  let appointmentData = appointment["biomarker"]["data"];
  const [visible, setVisible] = React.useState(false);
  const [biomarker, setBiomarker] = React.useState({
    weight: appointmentData["weight"],
    diastolicBP: appointmentData["diastolicBP"],
    systolicBP: appointmentData["systolicBP"],
    HbA1c: appointmentData["HbA1c"],
    urineAlbuminToCreatinineRatio:
      appointmentData["urineAlbuminToCreatinineRatio"],
    totalCholesterol: appointmentData["totalCholesterol"],
    LDL: appointmentData["LDL"],
    HDL: appointmentData["HDL"],
    TG: appointmentData["TG"],
  });
  let toid = null;

  /**
   * Handler for updating appointments data
   */
  function updateAppointmentsDataHandler() {
    // PUT the biomarker update.
    let updateAppointment = appointment;
    delete updateAppointment.dtDisplay;
    delete updateAppointment.dateReminder;
    updateAppointmentsData(updateAppointment)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   *
   * @param updateObj The biomarker object to be updated
   */
  function updateBiomarker(updateObj) {
    // Update the biomarker state
    setBiomarker(updateObj);
    appointment["biomarker"]["data"] = updateObj;

    // Clear & Set a delay to prevent flooding of key inputs triggering the endpoint
    if (toid != null) {
      clearTimeout(toid);
    }
    toid = setTimeout(updateAppointmentsDataHandler, 1000);
  }

  const [
    weightInput,
    HbA1cInput,
    urineAlbuminToCreatinineRatioInput,
    diastolicBPInput,
    systolicBPInput,
    totalCholesterolInput,
    LDLInput,
    HDLInput,
    TGInput,
  ] = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
    ];

  /**
   *
   * @param text The text to be validated
   * @returns {boolean} Whether the text contains a valid number
   */
  const isValidNumber = (text) => {
    const regex = /^[1-9]\d*(\.\d+)?$/;
    return regex.test(text);
  };

  /**
   *
   * @param text The biomarker input text
   * @param biomarkerName The name of the biomarker
   * @param min The lower bound of the biomarker
   * @param max The upper bound of the biomarker
   * @returns {boolean} Whether the biomarker input is valid
   */
  const validateBiomarker = (text, biomarkerName, min, max) => {
    if (isValidNumber(text)) {
      const value = Number.parseFloat(text);
      if (value < min || value > max) {
        alert(biomarkerName);
      } else {
        setVisible(true);
        return true;
      }
    } else {
      alert(biomarkerName);
    }
    return false;
  };

  /**
   *
   * @param input The biomarker input
   * @returns {string|*} The biomarker input, enforced to one decimal place
   */
  const enforceOneDecimal = (input) => {
    return input.indexOf(".") > 0
      ? input.split(".").length >= 1
        ? input.split(".")[0] + "." + input.split(".")[1].substring(-1, 1)
        : input
      : input;
  };

  /**
   * Display an alert for invalid value
   * @param biomarkerName The name of the biomarker
   */
  const alert = (biomarkerName) => {
    Alert.alert(
      "Invalid value",
      "Please enter a valid " + biomarkerName + ".",
      [
        {
          text: "Dismiss",
        },
      ],
      "default"
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.topContainer}>
          <View style={styles.numberFrame}>
            <Text style={styles.numberText}>1</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center" }}>
            <Text style={styles.title}>Biomarkers</Text>
            <Text style={styles.description}>
              Enter this info during your consult
            </Text>
          </View>
        </View>
        <View style={styles.biomarkerContainer}>
          <Text style={styles.biomarkerTitle}>Weight (kg)</Text>
          <TextInput
            ref={weightInput}
            style={styles.biomarkerPlaceholder}
            placeholder="Enter weight"
            keyboardType="decimal-pad"
            value={biomarker.weight}
            onChangeText={(text) =>
              updateBiomarker({ ...biomarker, weight: enforceOneDecimal(text) })
            }
            onEndEditing={(e) => {
              if (!validateBiomarker(e.nativeEvent.text, "Weight", 20, 250)) {
                weightInput.current.clear();
              }
              updateBiomarker({ ...biomarker, weight: e.nativeEvent.text });
            }}
          />
        </View>
        <View style={styles.biomarkerDivider} />
        <View style={styles.biomarkerContainer}>
          <Text style={styles.biomarkerTitle}>Blood Pressure (mmHg)</Text>
          <View style={styles.biomarkerRowFlexContainer}>
            <View style={{ width: "50%" }}>
              <Text style={styles.biomarkerSubtitle}>Systolic</Text>
              <TextInput
                ref={systolicBPInput}
                style={styles.biomarkerPlaceholder}
                placeholder="Enter Systolic BP"
                keyboardType="decimal-pad"
                value={biomarker.systolicBP}
                onChangeText={(text) =>
                  updateBiomarker({
                    ...biomarker,
                    systolicBP: enforceOneDecimal(text),
                  })
                }
                onEndEditing={(e) => {
                  if (
                    !validateBiomarker(
                      e.nativeEvent.text,
                      "Systolic BP",
                      50,
                      250
                    )
                  ) {
                    systolicBPInput.current.clear();
                  }
                  updateBiomarker({
                    ...biomarker,
                    systolicBP: e.nativeEvent.text,
                  });
                }}
              />
            </View>
            <View style={{ width: "50%" }}>
              <Text style={styles.biomarkerSubtitle}>Diastolic</Text>
              <TextInput
                ref={diastolicBPInput}
                style={styles.biomarkerPlaceholder}
                placeholder="Enter Diastolic BP"
                keyboardType="decimal-pad"
                value={biomarker.diastolicBP}
                onChangeText={(text) =>
                  updateBiomarker({
                    ...biomarker,
                    diastolicBP: enforceOneDecimal(text),
                  })
                }
                onEndEditing={(e) => {
                  if (
                    !validateBiomarker(
                      e.nativeEvent.text,
                      "Diastolic BP",
                      20,
                      150
                    )
                  ) {
                    diastolicBPInput.current.clear();
                  }
                  updateBiomarker({
                    ...biomarker,
                    diastolicBP: e.nativeEvent.text,
                  });
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.biomarkerDivider} />
        <View style={styles.biomarkerContainer}>
          <Text style={styles.biomarkerTitle}>HbA1c (%)</Text>
          <TextInput
            ref={HbA1cInput}
            style={styles.biomarkerPlaceholder}
            placeholder="Enter HbA1c Level"
            keyboardType="decimal-pad"
            value={biomarker.HbA1c}
            onChangeText={(text) =>
              updateBiomarker({ ...biomarker, HbA1c: enforceOneDecimal(text) })
            }
            onEndEditing={(e) => {
              if (!validateBiomarker(e.nativeEvent.text, "HbA1c", 4, 20)) {
                HbA1cInput.current.clear();
              }
              updateBiomarker({ ...biomarker, HbA1c: e.nativeEvent.text });
            }}
          />
        </View>
        <View style={styles.biomarkerDivider} />
        <View style={styles.biomarkerContainer}>
          <Text style={styles.biomarkerTitle}>
            Urine Albumin to Creatinine Ratio (mg/mmol)
          </Text>
          <TextInput
            ref={urineAlbuminToCreatinineRatioInput}
            style={styles.biomarkerPlaceholder}
            placeholder="Enter Urine Albumin to Creatinine Ratio"
            keyboardType="decimal-pad"
            value={biomarker.urineAlbuminToCreatinineRatio}
            onChangeText={(text) =>
              updateBiomarker({
                ...biomarker,
                urineAlbuminToCreatinineRatio: enforceOneDecimal(text),
              })
            }
            onEndEditing={(e) => {
              if (
                !validateBiomarker(
                  e.nativeEvent.text,
                  "Urine Albumin to Creatinine Ratio",
                  0,
                  300
                )
              ) {
                urineAlbuminToCreatinineRatioInput.current.clear();
              }
              updateBiomarker({
                ...biomarker,
                urineAlbuminToCreatinineRatio: e.nativeEvent.text,
              });
            }}
          />
        </View>
        <View style={styles.biomarkerDivider} />
        <View style={styles.biomarkerContainer}>
          <Text style={styles.biomarkerTitle}>Lipid Profile (mmol/L)</Text>
          <View style={styles.biomarkerContainer}>
            <Text style={styles.biomarkerSubtitle}>Total Cholesterol</Text>
            <TextInput
              ref={totalCholesterolInput}
              style={styles.biomarkerPlaceholder}
              placeholder="Enter Total Cholesterol"
              keyboardType="decimal-pad"
              value={biomarker.totalCholesterol}
              onChangeText={(text) =>
                updateBiomarker({
                  ...biomarker,
                  totalCholesterol: enforceOneDecimal(text),
                })
              }
              onEndEditing={(e) => {
                if (
                  !validateBiomarker(
                    e.nativeEvent.text,
                    "Total Cholesterol",
                    1,
                    20
                  )
                ) {
                  totalCholesterolInput.current.clear();
                }
                updateBiomarker({
                  ...biomarker,
                  totalCholesterol: e.nativeEvent.text,
                });
              }}
            />
          </View>
          <View style={styles.biomarkerRowFlexContainer}>
            <View style={{ width: "33.33%" }}>
              <Text style={styles.biomarkerSubtitle}>LDL</Text>
              <TextInput
                ref={LDLInput}
                style={styles.biomarkerPlaceholder}
                placeholder="Enter LDL"
                keyboardType="decimal-pad"
                value={biomarker.LDL}
                onChangeText={(text) =>
                  updateBiomarker({
                    ...biomarker,
                    LDL: enforceOneDecimal(text),
                  })
                }
                onEndEditing={(e) => {
                  if (!validateBiomarker(e.nativeEvent.text, "LDL", 1, 15)) {
                    LDLInput.current.clear();
                  }
                  updateBiomarker({ ...biomarker, LDL: e.nativeEvent.text });
                }}
              />
            </View>
            <View style={{ width: "33.33%" }}>
              <Text style={styles.biomarkerSubtitle}>HDL</Text>
              <TextInput
                ref={HDLInput}
                style={styles.biomarkerPlaceholder}
                placeholder="Enter HDL"
                keyboardType="decimal-pad"
                value={biomarker.HDL}
                onChangeText={(text) =>
                  updateBiomarker({
                    ...biomarker,
                    HDL: enforceOneDecimal(text),
                  })
                }
                onEndEditing={(e) => {
                  if (!validateBiomarker(e.nativeEvent.text, "HDL", 1, 10)) {
                    HDLInput.current.clear();
                  }
                  updateBiomarker({ ...biomarker, HDL: e.nativeEvent.text });
                }}
              />
            </View>
            <View style={{ width: "33.33%" }}>
              <Text style={styles.biomarkerSubtitle}>TG</Text>
              <TextInput
                ref={TGInput}
                style={styles.biomarkerPlaceholder}
                placeholder="Enter TG"
                keyboardType="decimal-pad"
                value={biomarker.TG}
                onChangeText={(text) =>
                  updateBiomarker({ ...biomarker, TG: enforceOneDecimal(text) })
                }
                onEndEditing={(e) => {
                  if (!validateBiomarker(e.nativeEvent.text, "TG", 1, 60)) {
                    TGInput.current.clear();
                  }
                  updateBiomarker({ ...biomarker, TG: e.nativeEvent.text });
                }}
              />
            </View>
          </View>
          <View style={styles.biomarkerDivider} />
        </View>
        <View style={{ height: 65 }}></View>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={4000}
        style={{
          backgroundColor: "#3DCE66",
          alignSelf: "flex-end",
          width: 250,
        }}
        wrapperStyle={{ zIndex: 1000 }}
      >
        ✓ Biomarker has been updated!
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

/**
 *
 * @param route The navigation route
 * @param navigation
 * @returns {JSX.Element} The Questions Tab
 * @constructor
 */
function Questions({ route, navigation }) {
  const questions = route.params.route.params["appointment"]["questions"];
  const finalQuestionArray = [
    {
      data: [],
    },
  ];
  questions.forEach((element) => {
    element.data.forEach((data_element) => {
      if (data_element.checked) {
        finalQuestionArray[0].data.push(data_element.question);
      }
    });
  });
  console.log(finalQuestionArray);
  const DATA = [
    {
      data: [
        "How may diabetes affect my vision?",
        "How may diabetes affect my driving?",
        "How may diabetes affect my heart and blood vessels?",
      ],
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
      {/* <ScrollView style={styles.contentContainer}> */}
      <SectionList
        sections={finalQuestionArray}
        renderSeparator={this.renderSeparator}
        render
        // keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <View style={styles.sectionItemView}>
            <Text style={styles.sectionListBodyText}>{item}</Text>
          </View>
        )}
        ItemSeparatorComponent={this.renderSeparator}
      // contentContainerStyle
      ></SectionList>
      {/* </ScrollView> */}
    </View>
  );
}

/**
 *
 * @returns {JSX.Element} The Recording view
 * @constructor
 */
function Recording() {
  const progressView = useRef();
  const [progress, setProgress] = useState(0);
  const [currentRecordTime, setCurrentRecordTime] = useState(0);
  const [maxRecordTime, setMaxRecordTime] = useState(230);

  function percentage() {
    if (currentRecordTime / maxRecordTime <= 1) {
      setProgress(((currentRecordTime / maxRecordTime) * screenWidth * 2) / 3);
    }
  }

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <View>
          <View style={styles.recordBarBase} />
          <View
            style={{ ...styles.recordBar, width: progress }}
            ref={progressView}
          />
          <TouchableOpacity
            style={styles.recordButton}
            onPress={() => {
              setCurrentRecordTime(currentRecordTime + 10);
              percentage();
            }}
          >
            <IonIcons name="pause" color="white" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text>Current</Text>
        <Text style={{ marginLeft: (screenWidth * 2) / 3 - 70 }}>Max</Text>
      </View>
    </>
  );
}

/**
 *
 * @returns {JSX.Element} The Notes tab
 * @constructor
 */
function Notes() {
  const [recording, setRecording] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.biomarkerContainer}>
          <Text style={styles.title}>Summary</Text>
          <Text style={styles.description}>
            Enter any information from your appointment today.
          </Text>
          <TextInput
            style={styles.notesPlaceholder}
            multiline
            numberOfLines={4}
            placeholder="Notes could include any changes to the medications you take or your treatment plan, reminders for next appointment or other relevant details."
            placeholderTextColor={{ color: "#A8B2C1" }}
          />
        </View>
        <View style={styles.biomarkerContainer}>
          <Text style={styles.title}>Recording</Text>
          <Text style={styles.description}>
            Alternatively, record a brief verbal summary of the information.{" "}
          </Text>

          <View style={{ display: recording ? "flex" : "none" }}>
            {Recording()}
          </View>
          <View style={{ display: recording ? "none" : "flex" }}>
            <TouchableOpacity
              style={styles.startRecordButton}
              onPress={() => setRecording(true)}
            >
              <Text style={styles.recordButtonText}>Start Recording</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
