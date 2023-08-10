import React, { useRef, useState } from 'react';

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native';
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
        color: '#A8B2C1',
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
        marginHorizontal: 30,
        marginVertical: 15
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
export default function During() {
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
                <Tab.Screen name="Biomarkers" component={Biomarkers} />
                <Tab.Screen name="Questions" component={Questions} />
                <Tab.Screen name="Notes" component={Notes} />
            </Tab.Navigator>

            <View style={styles.buttonDivider} />
            <TouchableOpacity style={styles.button}>
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
    const toggleInputAlert = () => setVisible(true);
    const dismissInputAlert = () => setVisible(false);

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
                        value={biomarker.weight}
                        onChangeText={(text) => {
                            setBiomarker({ ...biomarker, weight: text });
                        }}
                        onEndEditing={toggleInputAlert}
                    />
                </View>
                <View style={styles.biomarkerDivider} />
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.biomarkerTitle}>Blood HbA1c Level</Text>
                    <TextInput
                        style={styles.biomarkerPlaceholder}
                        placeholder="Enter HbA1c Level"
                        keyboardType="numeric"
                        value={biomarker.HbA1c}
                        onChangeText={(text) => {
                            setBiomarker({ ...biomarker, HbA1c: text });
                        }}
                        onEndEditing={toggleInputAlert}
                    />
                </View>
                <View style={styles.biomarkerDivider} />
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.biomarkerTitle}>Urine Albumin to Creatinine Ratio</Text>
                    <TextInput
                        style={styles.biomarkerPlaceholder}
                        placeholder="Enter Urine Albumin to Creatinine Ratio"
                        keyboardType="numeric"
                        value={biomarker.urineAlbuminToCreatinineRatio}
                        onChangeText={(text) => {
                            setBiomarker({ ...biomarker, urineAlbuminToCreatinineRatio: text });
                        }}
                        onEndEditing={toggleInputAlert}
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
                                placeholder="Enter Liastolic BP"
                                keyboardType="numeric"
                                value={biomarker.diastolicBP}
                                onChangeText={(text) => {
                                    setBiomarker({ ...biomarker, diastolicBP: text });
                                }}
                                onEndEditing={toggleInputAlert}
                            />
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.biomarkerSubtitle}>Systolic BP</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter Systolic BP"
                                keyboardType="numeric"
                                value={biomarker.systolicBP}
                                onChangeText={(text) => {
                                    setBiomarker({ ...biomarker, systolicBP: text });
                                }}
                                onEndEditing={toggleInputAlert}
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
                            value={biomarker.totalCholesterol}
                            onChangeText={(text) => {
                                setBiomarker({ ...biomarker, totalCholesterol: text });
                            }}
                            onEndEditing={toggleInputAlert}
                        />
                    </View>
                    <View style={styles.biomarkerRowFlexContainer}>
                        <View style={{ width: '33.33%' }}>
                            <Text style={styles.biomarkerSubtitle}>LDL</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter LDL"
                                keyboardType="numeric"
                                value={biomarker.LDL}
                                onChangeText={(text) => {
                                    setBiomarker({ ...biomarker, LDL: text });
                                }}
                                onEndEditing={toggleInputAlert}
                            />
                        </View>
                        <View style={{ width: '33.33%' }}>
                            <Text style={styles.biomarkerSubtitle}>HDL</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter HDL"
                                keyboardType="numeric"
                                value={biomarker.HDL}
                                onChangeText={(text) => {
                                    setBiomarker({ ...biomarker, HDL: text });
                                }}
                                onEndEditing={toggleInputAlert}
                            />
                        </View>
                        <View style={{ width: '33.33%' }}>
                            <Text style={styles.biomarkerSubtitle}>TG</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter TG"
                                keyboardType="numeric"
                                value={biomarker.TG}
                                onChangeText={(text) => {
                                    setBiomarker({ ...biomarker, TG: text });
                                }}
                                onEndEditing={toggleInputAlert}
                            />
                        </View>
                    </View>
                    <View style={styles.biomarkerDivider} />
                </View>
                <View style={{ height: 65 }}></View>
            </ScrollView>
            <View>
                <Snackbar
                    visible={visible}
                    onDismiss={dismissInputAlert}
                    duration={4000}
                    style={{
                        backgroundColor: '#3DCE66',
                        height: 20,
                        alignSelf: 'flex-end',
                        width: 250
                    }}
                >
                    ✓  Biomarker has been updated!
                </Snackbar>
            </View>
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
