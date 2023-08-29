import * as React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground
} from "react-native";
// import Logo from "../../assets/logo/logo_multi_txt_transparent_bg.svg";
import Logo from "../../assets/logo/logo_white_txt_transparent_bg.svg";
import { Auth } from "aws-amplify";

export default function ChoiceScreen({navigation}) {
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
            marginVertical: 5, // TODO: Altered
        },
        buttonText: {
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            paddingVertical: 20,
            textAlign: "center"
        },
        buttonInverse: {
            backgroundColor: "#FFFFFF6C",
            borderRadius: 50,
            marginHorizontal: 30,
            marginVertical: 20
        },
        buttonInverseText: {
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            paddingVertical: 20,
            textAlign: "center"
        },
        listContainer: {
            flex: 1,
            paddingVertical: 40,
            paddingHorizontal: 20
        },
        itemContainer: {
            borderRadius: 10,
            padding: 20
        },
        appointmentType: {
            marginTop: 20,
            color: "#25437B",
            fontSize: 16,
            fontWeight: "bold"
        },
        appointmentTime: {
            marginVertical: 10,
            color: "#7A889F",
            fontSize: 12
        },
        buttonsContainer: {
            bottom: 0,
            width: "100%",
            flex: 2,
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
            color: "white",
            fontSize: 29,
            textAlign: "center"
        },
        heading1alt: {
            color: "white",
            fontSize: 29,
            fontWeight: "bold",
            textAlign: "center"
        },
        displayTextContainer: {
            // borderWidth: 4,
            // borderColor: "yellow",
            flex: 1,
            // bottom: 0,
            // justifyContent:
        },
        displayImageContainer: { // borderWidth: 4,
            flex: 4,
            // borderColor: "orange",
            justifyContent: "center",
            alignItems: "center",
            resizeMode: "contain"
        },
        logoWrapper: {
            // NOTE: To resize svg you must remove width and height attributes for svg but nto view box
            // borderWidth: 4,
            // borderColor: "purple",
            resizeMode: "contain",
            width: 300,
            height: 200, // TODO: make responsive
        },
        backgroundImage: {
            width: "100%",
            height: "100%",
            flex: 1
        },
        darkenImage: {
            flex: 1,
            backgroundColor: "rgba(0,0,0, 0.30)"
        }
    });
    return (
        <KeyboardAvoidingView>
            <View style={
                {
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white"
                }
            }>
                <ImageBackground source={
                        require("../../assets/img/ChoiceImg.png")
                    }
                    style={
                        styles.backgroundImage
                    }
                    resizeMode="cover">
                    <View style={
                        styles.darkenImage
                    }>
                        <View style={
                            styles.displayContainer
                        }>
                            <View style={
                                styles.displayImageContainer
                            }>
                                <View style={
                                    styles.logoWrapper
                                }>
                                    <Logo></Logo>
                                </View>
                            </View>
                            <View style={
                                styles.displayTextContainer
                            }>
                                <Text style={
                                    styles.heading1
                                }>Stay on top of your</Text>
                                <Text style={
                                    styles.heading1alt
                                }>appointments</Text>
                            </View>
                        </View>
                        <View style={
                            [styles.buttonsContainer,]
                        }>
                            <TouchableOpacity style={
                                    styles.button
                                }
                                onPress={
                                    () => navigation.navigate("Login")
                            }>
                                <Text style={
                                    styles.buttonText
                                }>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={
                                    styles.buttonInverse
                                }
                                onPress={
                                    () => navigation.navigate("SignUp")
                            }>
                                <Text style={
                                    styles.buttonInverseText
                                }>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </KeyboardAvoidingView>
    );
}
