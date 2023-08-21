import * as React from 'react';

import { View, Text,StyleSheet,TouchableOpacity,Image,KeyboardAvoidingView } from 'react-native';
// import Logo from '../../assets/logo/logo_multi_txt_transparent_bg.svg';
// import NavBar from '../NavBar/NavBar';
import { TextInput } from 'react-native-gesture-handler';

export default function LoginScreen({navigation}) {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: "#5398FF",
            borderRadius: 50,
            marginHorizontal: 30,
            marginTop:10,
            marginBottom: 30//TODO: Altered
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
            paddingVertical: 20,
            textAlign: 'center'
        },
        buttonInverse: {
            borderWidth: 1,
            borderColor: "#5398FF",
            backgroundColor: "white",
            borderRadius: 50,
            marginHorizontal: 30,
            marginVertical: 20
        },
        buttonInverseText: {
            color: '#5398FF',
            fontWeight: 'bold',
            fontSize: 16,
            paddingVertical: 20,
            textAlign: 'center'
        },
        listContainer: {
            flex: 1,
            paddingVertical: 40,
            paddingHorizontal: 20,
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
            fontSize: 12,
        },
        buttonsContainer:{
            bottom:0,
            width:'100%',
            // flex:1, 
            // borderWidth: 4,
            // borderColor: "green",
            // height:'25%'
        },
        displayContainer:{
            top:0,
            // borderWidth: 2,
            // borderColor: "black",
            width:'100%',
            flex:6
            // height:'75%',
        },
        heading1:{
            color:"#25437B",
            fontSize:29,
            textAlign:'center'
        },
        heading1alt:{
            color:"#25437B",
            fontSize:29,
            fontWeight: 'bold',
            textAlign:'center'
        },
        displayTextContainer:{
            // borderWidth: 4,
            // borderColor: "yellow",
            flex:1,
            bottom:0
            // justifyContent:
        },
        displayImageContainer:{
            // borderWidth: 4,
            flex:4,
            // borderColor: "orange",
            justifyContent:'center',
            alignItems: 'center',
            resizeMode:'contain'
        },
        logoWrapper:{//NOTE: To resize svg you must remove width and height attributes for svg but nto view box
            // borderWidth: 4,
            // borderColor: "purple",
            resizeMode:'contain',
            width: 300,
            height: 200, //TODO: make responsive
        },
        heading2:{
            color:"#25437B",
            fontSize:14,
            textAlign:'center'
        },
        textEntryContainer:{
            alignContent:'center',
            width:'90%',
            flex:9,
            alignContent:'stretch',
            
        },
        textEntrySection:{
            paddingTop:30,
            borderBottomColor:"#E8EBF0",
            borderBottomWidth:1,
        },
        textEntrySectionTitle:{
            fontSize:17,
            marginBottom:5,
            fontWeight:'400',
            color:"#25437B"
        }
        ,
        textEntrySectionInput:{
            color:"#5398FF",
            marginVertical:10,
        }
    });
    return(
        <KeyboardAvoidingView>
        <View style={{display:'flex' ,height:'100%', alignItems: 'center', justifyContent: 'center',backgroundColor:"white"}}>

            <View style={styles.textEntryContainer}>    
                <View style={styles.textEntrySection}>
                    <Text style={styles.textEntrySectionTitle}>Email Address</Text>
                    <TextInput style = {styles.textEntrySectionInput}placeholder='Enter your Email Address'></TextInput>
                </View>
                <View style={styles.textEntrySection}>
                    <Text style={styles.textEntrySectionTitle}>Password</Text>
                    <TextInput style = {styles.textEntrySectionInput} placeholder='Enter your Password'></TextInput>
                </View>
            </View>
            <Text style={styles.textEntrySectionTitle}>Forgot Password?</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Log In</Text>
                    
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAvoidingView>
        
    );
}