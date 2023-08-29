import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import Logo from "../../assets/logo/logo_white_txt_transparent_bg.svg";
// import LinearGradient  from "react-native-linear-gradient";
import {LinearGradient} from 'expo-linear-gradient';
import {Auth} from "aws-amplify";

const DotComponentCustom = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? "#5398FF" : "#A8B2C1";
  return (
    <View
      style={{
        width: 16,
        height: 5,
        marginHorizontal: 4,
        backgroundColor,
        borderRadius: 3,
      }}
    />
  );
};
export default function DetailsScreen({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        (async ()=> {
        try{
            await Auth.currentAuthenticatedUser()
            navigation.navigate('Home');
        }catch(e){
        }
    })()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const styles = StyleSheet.create({
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
    buttonsContainer: { backgroundColor: "white" },
    linearGradientLogo: {
      position: "absolute",
      top: 0,
      width: "100%",
      height: "15%",
      zIndex: 10, // Makes it Hover as well as the position
      justifyContent: "center",
      alignItems: "center",
      resizeMode: "contain",
    },
    logoWrapper: {
      width: 220,
      height: 150,
    },
  });
  return (
    <>
      {/* <View  style={styles.linearGradientLogo}>
        <View style={styles.logoWrapper}>
          <Logo></Logo>
        </View>
      </View> */}
      <LinearGradient
        colors={["#000000AF", "#ffffff00"]}
        style={styles.linearGradientLogo}
      >
        <View style={styles.logoWrapper}>
          <Logo></Logo>
        </View>
      </LinearGradient>
      <Onboarding
        showDone={false}
        showNext={false}
        showSkip={false}
        bottomBarColor={"white"}
        bottomBarHeight={70}
        containerStyles={{
          justifyContent: "flex-start",
        }}
        imageContainerStyles={{
          margin: 0,
          width: "100%",
          paddingBottom: 0,
          paddingHorizontal: 0,
        }}
        titleStyles={{
          paddingTop: 30,
          paddingBottom: 15,
          color: "#25437B",
          fontSize: 33,
          fontWeight: "bold",
          textAlign: "center",
        }}
        subTitleStyles={{
          color: "#25437B",
          fontSize: 18,
          paddingHorizontal: 20,
          fontWeight: "300",
          lineHeight: 30,
        }}
        DotComponent={DotComponentCustom}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Image
                source={require("../../assets/img/Details_Track.png")}
                style={{ margin: 0, paddingBottom: 0, width: "100%" }}
              />
            ),
            title: "Track",
            subtitle:
              "Track your biomarkers along with your upcoming and past appointments",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                source={require("../../assets/img/Details_Record.png")}
                style={{ margin: 0, paddingBottom: 0, width: "100%" }}
              />
            ),
            title: "Record",
            subtitle:
              "Record summaries of appointment to-dos and set them as reminders",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                source={require("../../assets/img/Details_Learn.png")}
                style={{ margin: 0, paddingBottom: 0, width: "100%" }}
              />
            ),
            title: "Learn",
            subtitle: "Learn more about diabetes from our eductional resources",
          },
        ]}
      ></Onboarding>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Choice")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
