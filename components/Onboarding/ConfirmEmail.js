import * as React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
// import Logo from '../../assets/logo/logo_multi_txt_transparent_bg.svg';
// import NavBar from '../NavBar/NavBar';
import { TextInput } from "react-native-gesture-handler";
import { Auth } from "aws-amplify";

async function confirmVerificationCode({ username, code }, setError) {
  try {
    await Auth.confirmSignUp(username, code);
    return true;
  } catch (error) {
    setError(error.message);
    return false;
  }
}

async function resendVerificationCode({ username }, setError) {
  try {
    await Auth.resendSignUp(username);
    setError("Sent verification email!");
    return true;
  } catch (error) {
    setError(error.message);
    return false;
  }
}

export default function SignUpScreen({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      (async () => {
        try {
          await Auth.currentAuthenticatedUser({ bypassCache: true });
          navigation.navigate("Home");
        } catch (e) {}
      })();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const styles = StyleSheet.create({
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
      // alignContent: 'center',
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
  const [details, setDetails] = React.useState({ username: "", code: "" });
  const [error, setError] = React.useState(null);
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
        <View style={styles.textEntryContainer}>
          {Boolean(error) && (
            <View style={styles.textEntrySection}>
              <Text
                style={[
                  styles.textEntrySectionTitle,
                  {
                    color:
                      error === "Sent verification email!" ? "green" : "red",
                  },
                ]}
              >
                Status: {error.replace("Username", "Email")}
              </Text>
            </View>
          )}
          <View style={styles.textEntrySection}>
            <Text style={styles.textEntrySectionTitle}>Email Address</Text>
            <TextInput
              style={styles.textEntrySectionInput}
              placeholder="Enter your Email Address"
              value={details.username}
              onChangeText={(text) =>
                setDetails({
                  ...details,
                  username: text,
                })
              }
            ></TextInput>
          </View>
          <View style={styles.textEntrySection}>
            <Text style={styles.textEntrySectionTitle}>Verification Code</Text>
            <TextInput
              style={styles.textEntrySectionInput}
              placeholder="Enter your Verification Code"
              value={details.code}
              onChangeText={(text) =>
                setDetails({
                  ...details,
                  code: text,
                })
              }
            ></TextInput>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (await confirmVerificationCode(details, setError))
                navigation.navigate("Choice");
            }}
          >
            <Text style={styles.buttonText}>Verify Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonInverse,
              {
                marginTop: 0,
              },
            ]}
            onPress={() => resendVerificationCode(details, setError)}
          >
            <Text style={styles.buttonInverseText}>
              Resend Verification Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
