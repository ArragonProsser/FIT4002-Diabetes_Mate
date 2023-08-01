import React from 'react';

import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 25,
        paddingTop: 40
    },
    divider: {
        borderBottomColor: '#E8EBF0',
        borderBottomWidth: 1
    },
    button: {
        backgroundColor: "#5398FF",
        borderRadius: 50,
        marginHorizontal: 30,
        marginVertical: 15
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 20,
        textAlign: 'center'
    }
});

const Tab = createMaterialTopTabNavigator();
export default function During() {
    return (
        <>
            <View style={styles.spacer}></View>
            <Tab.Navigator
                options={{
                    headerStyle: {color: "red"},
                }}
                screenOptions={{
                    tabBarIndicatorStyle: {
                        width: '25%',
                        marginHorizontal: 20,
                    },
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                        textTransform: 'none',
                    }
                }}
            >
                <Tab.Screen name="Biomarkers" component={Biomarkers}/>
                <Tab.Screen name="Questions" component={Questions}/>
                <Tab.Screen name="Notes" component={Notes}/>
            </Tab.Navigator>
        </>
    );
}

function Biomarkers() {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={styles.contentContainer}>
                <Text>Biomarkers Tab</Text>
            </ScrollView>
            <View style={styles.divider}/>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Complete Appointment</Text>
            </TouchableOpacity>
        </View>
    )
}

function Questions() {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={styles.contentContainer}>
                <Text>Questions Tab</Text>
            </ScrollView>
            <View style={styles.divider}/>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Complete Appointment</Text>
            </TouchableOpacity>
        </View>
    )
}

function Notes() {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={styles.contentContainer}>
                <Text>Notes Tab</Text>
            </ScrollView>
            <View style={styles.divider}/>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Complete Appointment</Text>
            </TouchableOpacity>
        </View>
    )
}