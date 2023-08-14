import React, { useRef, useState } from 'react';

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Alert, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TextInput } from "react-native-gesture-handler";
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Snackbar } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 25,
        paddingTop: 40
    },
    topContainer: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    numberFrame: {
        backgroundColor: '#ECF2FB',
        height: 56,
        width: 56,
        borderRadius: 16,
        marginRight: 16
    },
    numberText: {
        textAlign: 'center',
        lineHeight: 56,
        color: '#5398FF',
        fontWeight: 'bold',
        fontSize: 20
    },
    title: {
        fontSize: 16,
        color: '#25437B',
        marginBottom: 8,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 14,
        color: '#4B5E7D',
        fontWeight: '400'
    },
    biomarkerContainer: {
        marginBottom: 20
    },
    biomarkerRowFlexContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    biomarkerTitle: {
        fontSize: 14,
        color: '#25437B',
        marginBottom: 16,
        textDecorationLine: 'underline',
        fontWeight: '500'
    },
    biomarkerSubtitle: {
        fontSize: 14,
        color: '#25437B',
        marginBottom: 16,
        fontWeight: '500'
    },
    biomarkerPlaceholder: {
        fontSize: 14,
        fontWeight: '400',
        flexWrap: 'wrap'
    },
    notesPlaceholder: {
        fontSize: 14,
        height: 70,
        width: screenWidth - 20,
        fontWeight: '400'
    },
    buttonDivider: {
        borderBottomColor: '#E8EBF0',
        borderBottomWidth: 1,
    },
    biomarkerDivider: {
        borderBottomColor: '#E8EBF0',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#5398FF",
        borderRadius: 50,
        marginVertical: 15,
        width: '90%',
        alignSelf: 'center'
    },
    startRecordButton: {
        borderColor: '#5398FF',
        borderWidth: 1,
        backgroundColor: 'white',
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
    },
    recordButtonText: {
        color: '#5398FF',
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 20,
        textAlign: 'center'
    },
    recordBarBase: {
        width: (screenWidth * 2 / 3),
        height: 15,
        backgroundColor: "lightgray",
        borderRadius: 10,
        position: "absolute",
        zIndex: 0,
        marginTop: 15
    },
    recordBar: {
        height: 15,
        marginTop: 15,
        borderRadius: 10,
        backgroundColor: "#5398FF",
        zIndex: 1
    },
    recordButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: "#5398FF",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: (screenWidth * 5 / 7),
        position: "absolute",
        zIndex: 0
    }
});


const Tab = createMaterialTopTabNavigator();
export default function During({route, navigation}) {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.spacer}></View>
            <Tab.Navigator
                options={{
                    headerStyle: { color: "red" },
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
                <Tab.Screen name="Biomarkers" component={Biomarkers} initialParams={{route, navigation}}/>
                <Tab.Screen name="Questions" component={Questions} initialParams={{route, navigation}}/>
                <Tab.Screen name="Notes" component={Notes} initialParams={{route, navigation}}/>
            </Tab.Navigator>

            <View style={styles.buttonDivider} />
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate('History')
            }}>
                <Text style={styles.buttonText}>Complete Appointment</Text>
            </TouchableOpacity>
        </View>
    );
}

function Biomarkers() {
    const [visible, setVisible] = React.useState(false);
    const [biomarker, setBiomarker] = React.useState({
        weight: '',
        HbA1c: '',
        urineAlbuminToCreatinineRatio: '',
        diastolicBP: '',
        systolicBP: '',
        totalCholesterol: '',
        LDL: '',
        HDL: '',
        TG: '',
    });

    const isValidNumber = (text) => {
        const regex = /^[1-9]\d*(\.\d+)?$/;
        return regex.test(text);
    };

    const validateBiomarker = (text, biomarkerName, min, max, ) => {
        if (isValidNumber(text)) {
            const value = Number.parseFloat(text)
            if(Number.isNaN(value)){
                alert("Please enter a " + biomarkerName + ".")
            } else if(value < min || value > max) {
                alert("Please enter a valid " + biomarkerName + ".")
            } else {
                setVisible(true)
                return true
            }
        } else {
            alert("Please enter a valid " + biomarkerName + ".")
        }
        return false
    };

    const alert = (message) => {
        Alert.prompt(
            "Invalid value",
            message,
            [
                {
                    text: "Dismiss",
                }
            ],
            'default'
        );
    };


    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={styles.contentContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.numberFrame}>
                        <Text style={styles.numberText}>1</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'center' }}>
                        <Text style={styles.title}>Biomarkers</Text>
                        <Text style={styles.description}>Enter this info during your consult</Text>
                    </View>
                </View>
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.biomarkerTitle}>Weight (kg)</Text>
                    <TextInput
                        style={styles.biomarkerPlaceholder}
                        placeholder="Enter weight"
                        keyboardType="numeric"
                        maxLength={6}
                        onEndEditing={e => {
                            if (validateBiomarker(e.nativeEvent.text, 'Weight', 20, 250)) {
                                setBiomarker({...biomarker, weight: e.nativeEvent.text});
                            }
                        }}
                    />
                </View>
                <View style={styles.biomarkerDivider} />
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.biomarkerTitle}>Blood HbA1c Level</Text>
                    <TextInput
                        style={styles.biomarkerPlaceholder}
                        placeholder="Enter HbA1c Level"
                        keyboardType="numeric"
                        maxLength={5}
                        onEndEditing={e => {
                            if (validateBiomarker(e.nativeEvent.text, 'HbA1c', 4, 20)) {
                                setBiomarker({...biomarker, HbA1c: e.nativeEvent.text});
                            }
                        }}
                    />
                </View>
                <View style={styles.biomarkerDivider} />
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.biomarkerTitle}>Urine Albumin to Creatinine Ratio</Text>
                    <TextInput
                        style={styles.biomarkerPlaceholder}
                        placeholder="Enter Urine Albumin to Creatinine Ratio"
                        keyboardType="numeric"
                        maxLength={6}
                        onEndEditing={e => {
                            if (validateBiomarker(e.nativeEvent.text, 'Urine Albumin to Creatinine Ratio', 0, 300)) {
                                setBiomarker({...biomarker, urineAlbuminToCreatinineRatio: e.nativeEvent.text});
                            }
                        }}
                    />
                </View>
                <View style={styles.biomarkerDivider} />
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.biomarkerTitle}>Blood Pressure (BP)</Text>
                    <View style={styles.biomarkerRowFlexContainer}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.biomarkerSubtitle}>Diastolic BP</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter Diastolic BP"
                                keyboardType="numeric"
                                maxLength={6}
                                onEndEditing={e => {
                                    if (validateBiomarker(e.nativeEvent.text, 'Diastolic BP', 20, 150)) {
                                        setBiomarker({...biomarker, diastolicBP: e.nativeEvent.text});
                                    }
                                }}
                            />
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.biomarkerSubtitle}>Systolic BP</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter Systolic BP"
                                keyboardType="numeric"
                                maxLength={6}
                                onEndEditing={e => {
                                    if (validateBiomarker(e.nativeEvent.text, 'Systolic BP', 50, 250)) {
                                        setBiomarker({...biomarker, systolicBP: e.nativeEvent.text});
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.biomarkerTitle}>Lipid Profile</Text>
                    <View style={styles.biomarkerContainer}>
                        <Text style={styles.biomarkerSubtitle}>Total Cholesterol</Text>
                        <TextInput
                            style={styles.biomarkerPlaceholder}
                            placeholder="Enter Total Cholesterol"
                            keyboardType="numeric"
                            maxLength={5}
                            onEndEditing={e => {
                                if (validateBiomarker(e.nativeEvent.text, 'Total Cholesterol', 1, 20)) {
                                    setBiomarker({...biomarker, totalCholesterol: e.nativeEvent.text});
                                }
                            }}
                        />
                    </View>
                    <View style={styles.biomarkerRowFlexContainer}>
                        <View style={{ width: '33.33%' }}>
                            <Text style={styles.biomarkerSubtitle}>LDL</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter LDL"
                                keyboardType="numeric"
                                maxLength={5}
                                onEndEditing={e => {
                                    if (validateBiomarker(e.nativeEvent.text, 'LDL', 1, 15)) {
                                        setBiomarker({...biomarker, LDL: e.nativeEvent.text});
                                    }
                                }}
                            />
                        </View>
                        <View style={{ width: '33.33%' }}>
                            <Text style={styles.biomarkerSubtitle}>HDL</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter HDL"
                                keyboardType="numeric"
                                maxLength={5}
                                onEndEditing={e => {
                                    if (validateBiomarker(e.nativeEvent.text, 'HDL', 1, 10)) {
                                        setBiomarker({...biomarker, HDL: e.nativeEvent.text});
                                    }
                                }}
                            />
                        </View>
                        <View style={{ width: '33.33%' }}>
                            <Text style={styles.biomarkerSubtitle}>TG</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter TG"
                                keyboardType="numeric"
                                maxLength={5}
                                onEndEditing={e => {
                                    if (validateBiomarker(e.nativeEvent.text, 'TG', 1, 60)) {
                                        setBiomarker({...biomarker, TG: e.nativeEvent.text});
                                    }
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
                    backgroundColor: '#3DCE66',
                    alignSelf: 'flex-end',
                    width: 250,
                }}
                wrapperStyle={{ zIndex: 1000 }}
            >
                ✓ Biomarker has been updated!
            </Snackbar>
        </KeyboardAvoidingView>
    );
}

function Questions() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={styles.contentContainer}>
                <Text>Questions Tab</Text>
            </ScrollView>
        </View>
    );
}

function Recording() {
    const progressView = useRef();
    const [progress, setProgress] = useState(0);
    const [currentRecordTime, setCurrentRecordTime] = useState(0);
    const [maxRecordTime, setMaxRecordTime] = useState(230);

    function percentage() {
        if (currentRecordTime / maxRecordTime <= 1) {
            setProgress(currentRecordTime / maxRecordTime * screenWidth * 2 / 3);
        }
    }

    return (
        <>
            <View style={{ flexDirection: "row" }}>
                <View>
                    <View style={styles.recordBarBase} />
                    <View style={{ ...styles.recordBar, width: progress }} ref={progressView} />
                    <TouchableOpacity style={styles.recordButton} onPress={() => { setCurrentRecordTime(currentRecordTime + 10); percentage(); }}>
                        <IonIcons name="pause" color="white" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text>Current</Text>
                <Text style={{ marginLeft: (screenWidth * 2 / 3) - 70 }}>Max</Text>
            </View>
        </>
    );
}

function Notes() {
    const [recording, setRecording] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={styles.contentContainer}>
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.title}>Summary</Text>
                    <Text style={styles.description}>Enter any information from your appointment today.</Text>
                    <TextInput
                        style={styles.notesPlaceholder}
                        multiline
                        numberOfLines={4}
                        placeholder="Notes could include any changes to the medications you take or your treatment plan, reminders for next appointment or other relevant details."
                        placeholderTextColor={{ color: "#A8B2C1" }} />
                </View>
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.title}>Recording</Text>
                    <Text style={styles.description}>Alternatively, record a brief verbal summary of the information. </Text>

                    <View style={{ display: recording ? "flex" : "none" }}>
                        {Recording()}
                    </View>
                    <View style={{ display: recording ? "none" : "flex" }}>
                        <TouchableOpacity style={styles.startRecordButton} onPress={() => setRecording(true)}>
                            <Text style={styles.recordButtonText}>Start Recording</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
