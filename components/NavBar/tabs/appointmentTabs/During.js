import React from 'react';

import {View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Snackbar} from 'react-native-paper';
import {TextInput} from "react-native-gesture-handler";

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
    const [visible, setVisible] = React.useState(false);
    const [biomarker, setBiomarker] = React.useState({
        weight: '',
        HbA1c: '',
        urineAlbuminToCreatinineRatio: '',
        liastolicBP: '',
        systolicBP: '',
        totalCholesterol: '',
        LDL: '',
        HDL: '',
        TG: '',
    });
    const toggleInputAlert = () => setVisible(true);
    const dismissInputAlert = () => setVisible(false);

    return (
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={styles.contentContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.numberFrame}>
                        <Text style={styles.numberText}>1</Text>
                    </View>
                    <View style={{display: 'flex', justifyContent: 'center'}}>
                        <Text style={styles.title}>Biomarkers</Text>
                        <Text style={styles.description}>Enter this info during your consult</Text>
                    </View>
                </View>
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.biomarkerSubtitle}>Weight (kg)</Text>
                    <TextInput
                        style={styles.biomarkerPlaceholder}
                        placeholder="Enter weight"
                        keyboardType="numeric"
                        value={biomarker.weight}
                        onChangeText={(text) => {
                            setBiomarker({...biomarker, weight: text})
                        }}
                        onEndEditing={toggleInputAlert}
                    />
                </View>
                <View style={styles.biomarkerDivider}/>
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.biomarkerSubtitle}>Blood HbA1c Level</Text>
                    <TextInput
                        style={styles.biomarkerPlaceholder}
                        placeholder="Enter HbA1c Level"
                        keyboardType="numeric"
                        value={biomarker.HbA1c}
                        onChangeText={(text) => {
                            setBiomarker({...biomarker, HbA1c: text});
                        }}
                        onEndEditing={toggleInputAlert}
                    />
                </View>
                <View style={styles.biomarkerDivider}/>
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.biomarkerSubtitle}>Urine Albumin to Creatinine Ratio</Text>
                    <TextInput
                        style={styles.biomarkerPlaceholder}
                        placeholder="Enter Urine Albumin to Creatinine Ratio"
                        keyboardType="numeric"
                        value={biomarker.urineAlbuminToCreatinineRatio}
                        onChangeText={(text) => {
                            setBiomarker({...biomarker, urineAlbuminToCreatinineRatio: text});
                        }}
                        onEndEditing={toggleInputAlert}
                    />
                </View>
                <View style={styles.biomarkerDivider}/>
                <View style={styles.biomarkerContainer}>
                    <Text style={styles.biomarkerTitle}>Blood Pressure (BP)</Text>
                    <View style={styles.biomarkerRowFlexContainer}>
                        <View style={{width: '50%'}}>
                            <Text style={styles.biomarkerSubtitle}>Liastolic BP</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter Liastolic BP"
                                keyboardType="numeric"
                                value={biomarker.liastolicBP}
                                onChangeText={(text) => {
                                    setBiomarker({...biomarker, liastolicBP: text});
                                }}
                                onEndEditing={toggleInputAlert}
                            />
                        </View>
                        <View style={{width: '50%'}}>
                            <Text style={styles.biomarkerSubtitle}>Systolic BP</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter Systolic BP"
                                keyboardType="numeric"
                                value={biomarker.systolicBP}
                                onChangeText={(text) => {
                                    setBiomarker({...biomarker, systolicBP: text});
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
                                setBiomarker({...biomarker, totalCholesterol: text});
                            }}
                            onEndEditing={toggleInputAlert}
                        />
                    </View>
                    <View style={styles.biomarkerDivider}/>
                    <View style={styles.biomarkerRowFlexContainer}>
                        <View style={{width: '33.33%'}}>
                            <Text style={styles.biomarkerSubtitle}>LDL</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter LDL"
                                keyboardType="numeric"
                                value={biomarker.LDL}
                                onChangeText={(text) => {
                                    setBiomarker({...biomarker, LDL: text});
                                }}
                                onEndEditing={toggleInputAlert}
                            />
                        </View>
                        <View style={{width: '33.33%'}}>
                            <Text style={styles.biomarkerSubtitle}>HDL</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter HDL"
                                keyboardType="numeric"
                                value={biomarker.HDL}
                                onChangeText={(text) => {
                                    setBiomarker({...biomarker, HDL: text});
                                }}
                                onEndEditing={toggleInputAlert}
                            />
                        </View>
                        <View style={{width: '33.33%'}}>
                            <Text style={styles.biomarkerSubtitle}>TG</Text>
                            <TextInput
                                style={styles.biomarkerPlaceholder}
                                placeholder="Enter TG"
                                keyboardType="numeric"
                                value={biomarker.TG}
                                onChangeText={(text) => {
                                    setBiomarker({...biomarker, TG: text});
                                }}
                                onEndEditing={toggleInputAlert}
                            />
                        </View>
                    </View>
                    <View style={styles.biomarkerDivider}/>
                </View>
                <View style={{height: 65}}></View>
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
            <View style={styles.buttonDivider}/>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Complete Appointment</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

function Questions() {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={styles.contentContainer}>
                <Text>Questions Tab</Text>
            </ScrollView>
            <View style={styles.buttonDivider}/>
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
            <View style={styles.buttonDivider}/>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Complete Appointment</Text>
            </TouchableOpacity>
        </View>
    )
}
