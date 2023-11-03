import React from "react";
import { Auth } from "aws-amplify";

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function UpdateUser({ navigation }) {
  const [details, setDetails] = React.useState({
    username: "",
    newPassword: "",
    oldPassword: "",
    retypeNewPassword: "",
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    listItem: {
      paddingTop: 10,
      paddingBottom: 10,
      textAlignVertical: "center",
      textAlign: "center",
    },
    button: {
      backgroundColor: "#5398FF",
      borderRadius: 50,
      marginHorizontal: 30,
      marginVertical: 30, // TODO: Altered
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      paddingVertical: 20,
      textAlign: "center",
    },
    buttonInverse: {
      borderWidth: 1,
      borderColor: "#5398FF",
      backgroundColor: "white",
      borderRadius: 50,
      marginHorizontal: 30,
      marginVertical: 20,
    },
    buttonInverseText: {
      color: "#5398FF",
      fontWeight: "bold",
      fontSize: 16,
      paddingVertical: 20,
      textAlign: "center",
    },
    listContainer: {
      flex: 1,
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    itemContainer: {
      borderRadius: 10,
      padding: 20,
    },
    appointmentType: {
      marginTop: 20,
      color: "#25437B",
      fontSize: 16,
      fontWeight: "bold",
    },
    appointmentTime: {
      marginVertical: 10,
      color: "#7A889F",
      fontSize: 12,
    },
    buttonsContainer: {
      bottom: 0,
      width: "100%",
      // flex:1,
      // borderWidth: 4,
      // borderColor: "green",
      // height:'25%'
    },
    displayContainer: {
      top: 0,
      // borderWidth: 2,
      // borderColor: "black",
      width: "100%",
      flex: 6,
      // height:'75%',
    },
    heading1: {
      color: "#25437B",
      fontSize: 29,
      textAlign: "center",
    },
    heading1alt: {
      color: "#25437B",
      fontSize: 29,
      fontWeight: "bold",
      textAlign: "center",
    },
    displayTextContainer: {
      // borderWidth: 4,
      // borderColor: "yellow",
      flex: 1,
      bottom: 0,
      // justifyContent:
    },
    displayImageContainer: {
      // borderWidth: 4,
      flex: 4,
      // borderColor: "orange",
      justifyContent: "center",
      alignItems: "center",
      resizeMode: "contain",
    },
    logoWrapper: {
      // NOTE: To resize svg you must remove width and height attributes for svg but nto view box
      // borderWidth: 4,
      // borderColor: "purple",
      resizeMode: "contain",
      width: 300,
      height: 200, // TODO: make responsive
    },
    heading2: {
      color: "#25437B",
      fontSize: 14,
      textAlign: "center",
    },
    textEntryContainer: {
      alignContent: "center",
      width: "90%",
      flex: 9,
      alignContent: "stretch",
    },
    textEntrySection: {
      paddingTop: 30,
      borderBottomColor: "#E8EBF0",
      borderBottomWidth: 1,
    },
    textEntrySectionTitle: {
      fontSize: 17,
      marginBottom: 5,
      fontWeight: "400",
      color: "#25437B",
    },
    textEntrySectionInput: {
      color: "#5398FF",
      marginVertical: 10,
    },
  });

  async function changePassword(oldPassword, newPassword) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const data = await Auth.changePassword(user, oldPassword, newPassword);
      console.log(data);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  const validateRetype = (text, biomarkerName, min, max) => {
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

  return (
    <KeyboardAvoidingView>
      <View
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        {/* <View style={styles.textEntrySection}>
        <Text style={styles.textEntrySectionTitle}>Email Address</Text>
        <TextInput
          style={styles.textEntrySectionInput}
          placeholder="Enter your Email Address"
          value={details.email}
          onChangeText={(text) =>
            setDetails({
              ...details,
              email: text,
              username: text,
            })
          }
        ></TextInput>
      </View> */}
        <View style={styles.textEntryContainer}>
          <View style={styles.textEntrySection}>
            <Text style={styles.textEntrySectionTitle}>Old Password</Text>
            <TextInput
              style={styles.textEntrySectionInput}
              placeholder="Enter your Old Password"
              value={details.password}
              onChangeText={(text) =>
                setDetails({
                  ...details,
                  oldPassword: text,
                })
              }
            ></TextInput>
          </View>
          <View style={styles.textEntrySection}>
            <Text style={styles.textEntrySectionTitle}>New Password</Text>
            <TextInput
              style={styles.textEntrySectionInput}
              placeholder="Enter a New Password"
              value={details.password}
              onChangeText={(text) =>
                setDetails({
                  ...details,
                  newPassword: text,
                })
              }
            ></TextInput>
          </View>
          <View style={styles.textEntrySection}>
            <Text style={styles.textEntrySectionTitle}>
              Retype New Password
            </Text>
            <TextInput
              style={styles.textEntrySectionInput}
              placeholder="Retype your New Password"
              value={details.password}
              onChangeText={(text) =>
                setDetails({
                  ...details,
                  retypeNewPassword: text,
                })
              }
            ></TextInput>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                // Checks whether new and retyped passwords match
                if (details.retypeNewPassword == details.newPassword) {
                  //Uses AWS Amplify Auth to check whether the password can be changed
                  if (
                    await changePassword(
                      details.oldPassword,
                      details.newPassword
                    )
                  ) {
                    navigation.navigate("Home");
                  }
                } else {
                  console.log("New Passwords do not match");
                  //TODO: Add alert here
                }
              }}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
