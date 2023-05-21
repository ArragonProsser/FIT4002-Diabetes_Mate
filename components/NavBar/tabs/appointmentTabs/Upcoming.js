import React from 'react';

import { Button, View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from 'react-native';
import { ListItem } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Upcoming(navigation) {

    const styles = StyleSheet.create({

        listContainer: {
            flex: 1,
            paddingVertical: 40,
            paddingHorizontal: 20,
        },
        itemContainer: {
            borderRadius: 10,
            padding: 20
        },
        dateReminder: {},
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
        addButtonContainer: {
            position: 'absolute',
            bottom: 30,
            right: 30,
            backgroundColor: '#5398FF',
            borderRadius: 30,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 20,
            fontWeight: "bold",
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'flex-start',
            margin: 0,
            backgroundColor: 'white',
        },
        modalHeader: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: 20,
            backgroundColor: "white",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
        modalTitle: {
            flex: 1,
            fontSize: 20,
            fontWeight: "400",
            marginBottom: 20,
            textAlign: "center",
            color: '#25437b'
        },
        modalBody: {
            backgroundColor: "white",
            marginBottom: 20,
        },
        closeButton: {
            position: 'absolute',
            left: 20,
            top: 20,

        },
        appointmentCard: {
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            marginBottom: 20,
        },
        appointmentCardTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
            color: "#2a477e"
        },
        appointmentCardRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
            justifyContent: 'space-between'
        },
        appointmentCardLabel: {
            flex: 1,
            fontSize: 14,
            color: '#666',
        },
        appointmentCardValue: {
            flex: 2,
            fontSize: 14,
            color: '#333',
        },
        bottomSection: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: '#ddd',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
        },
        createButton: {
            backgroundColor: '#5398ff',
            borderRadius: 20,
            paddingVertical: 12,
            paddingHorizontal: 40,
            alignSelf: 'center',
            marginBottom: 20,
        },
        createButtonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        disabledButton: {
            backgroundColor: '#a6c8fb'
        },
    });

    const doctorTypeStyles = StyleSheet.create({
        typeItem: {
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
            height: 60
        },
        typeText: {
            color: "#25437B",
            fontSize: 16,
            fontWeight: 600,
            flexGrow: 1
        }
    });

    const dateTimeStyles = StyleSheet.create({
        modalContainer: {
            flex: 1,
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#4b5e7d',
        },
        closeButton: {
            padding: 10,
        },
        modalContent: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        timePickerContainer: {
            marginTop: 20,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        timePickerLabel: {
            fontSize: 16,
            color: 'grey',
            marginBottom: 10,
            marginLeft: 13,
            justifyContent: 'flex-start',
        },
        calendarContainer: {
            padding: 5,
            marginBottom: 15
        }
    });


    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isReminderEnabled, setIsReminderEnabled] = React.useState(false);

    const [isDoctorModalVisible, setIsDoctorModalVisible] = React.useState(false);
    const [selectedDoctorType, setSelectedDoctorType] = React.useState('');

    const [isDateModalVisible, setIsDateModalVisible] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState('');

    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const handleDoctorModal = () => setIsDoctorModalVisible(() => !isDoctorModalVisible);
    const handleDateModal = () => setIsDateModalVisible(() => !isDateModalVisible);

    const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
    const [selectedTime, setSelectedTime] = React.useState(new Date());

    const handleToggleReminder = () => setIsReminderEnabled(prevState => !prevState);

    const formCompleted = false;

    const handleSubmit = () => {
        // handle form submission
    };

    const renderDoctorType = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.doctorType}
                onPress={() => {
                    setSelectedDoctorType(item.type);
                    handleDoctorModal();
                }}>
                <Text>{item.type}</Text>
            </TouchableOpacity>
        );
    };

    const DoctorTypeModal = () => {
        const doctorTypes = [
            { id: 1, type: 'GP' },
            { id: 2, type: 'Dietitian' },
            { id: 3, type: 'Cardiologist' },
            { id: 4, type: 'Dentist' },
        ];
    };

    const handleDoctorTypeSelection = (type) => {
        setSelectedDoctorType(type);
    };

    const handleDateSelection = (type) => {
        setSelectedDate(type);
        console.log(selectedDate);
    };

    const handleTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const handleTimeSelection = (newTime) => {
        if (newTime) {
            const selectedDateTime = new Date(selectedDate);
            const time = new Date(newTime);

            selectedDateTime.setHours(time.getHours());
            selectedDateTime.setMinutes(time.getMinutes());
            setSelectedTime(selectedDateTime);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList style={styles.listContainer}
                data={[
                    { type: 'General Practitioner', time: 'Mon 23 Feb, 9:30am', dateReminder: 'Today' },
                    { type: 'Endocrinologist', time: 'Tue 24 Feb, 10:00am', dateReminder: 'Tomorrow' },
                    { type: 'Dietitian', time: 'Wed 25 Feb, 9:30am', dateReminder: 'Upcoming' },
                    { type: 'Exercise Physiologist', time: 'Wed 25 Feb, 2:30pm', dateReminder: 'Upcoming' },
                    { type: 'Psychologist', time: 'Fri 27 Feb, 11:15am', dateReminder: 'Upcoming' },
                    { type: 'Dietitian', time: 'Fri 27 Feb, 12:00am', dateReminder: 'Upcoming' }
                ]}
                renderItem={
                    ({ item }) =>
                        <ListItem containerStyle={styles.itemContainer}
                        // onPress={() => navigation.navigate('AppointmentDetail', item.type, item.time)}
                        >
                            <ListItem.Content>
                                <Text style={{
                                    fontSize: 14,
                                    color: item.dateReminder === "Today" ? "#5398FF" : "#939FB2"
                                }}>
                                    {item.dateReminder}
                                </Text>
                                <ListItem.Title style={styles.appointmentType}>
                                    {item.type}
                                </ListItem.Title>
                                <ListItem.Subtitle style={styles.appointmentTime}>
                                    {item.time}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron></ListItem.Chevron>
                        </ListItem>
                }
                ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                ListFooterComponent={<View style={{ height: 80 }}></View>}
            />

            <TouchableOpacity onPress={handleModal} style={styles.addButtonContainer}>
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>

            <Modal isVisible={isModalVisible} presentationStyle="pageSheet" transparent={false} style={styles.modalContainer}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader} >
                        <Text style={[styles.modalTitle]}>Create Appointment</Text>
                        <TouchableOpacity onPress={handleModal} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#4b5e7d" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalBody}>
                        <TouchableOpacity onPress={handleDoctorModal} style={styles.appointmentCard} >
                            <Text style={styles.appointmentCardTitle}>Appointment Type</Text>
                            <View style={styles.appointmentCardRow}>
                                <Text style={styles.appointmentCardLabel}>
                                    {selectedDoctorType ? `${selectedDoctorType}` : "Select appointment type"}
                                </Text>
                                <Icon name="angle-right" size={25} color="#333" style={styles.arrowIcon} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleDateModal} style={styles.appointmentCard}>
                            <Text style={styles.appointmentCardTitle}>Appointment Date/Time</Text>
                            <View style={styles.appointmentCardRow}>
                                <Text style={styles.appointmentCardLabel}>
                                    {selectedDate ? `${selectedDate}` : "Select appointment date/time"}
                                </Text>
                                <Icon name="angle-right" size={25} color="#333" style={styles.arrowIcon} />
                            </View>
                        </TouchableOpacity>

                        <View style={styles.appointmentCard}>
                            <View style={[styles.appointmentCardRow]}>
                                <Text style={styles.appointmentCardTitle}>Appointment reminders</Text>
                                <Switch
                                    value={isReminderEnabled}
                                    onValueChange={handleToggleReminder}
                                    trackColor={{ true: "#457fd6", false: "#767577" }}
                                    thumbColor={isReminderEnabled ? "#f4f3f4" : "#f4f3f4"}
                                    style={styles.toggleSwitch}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.bottomSection}>
                        <TouchableOpacity
                            style={[styles.createButton, !formCompleted && styles.disabledButton]}
                            onPress={() => handleSubmit()}
                            disabled={!formCompleted}>
                            <Text style={styles.createButtonText}>Create</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <Modal isVisible={isDoctorModalVisible} presentationStyle="pageSheet" transparent={false} style={styles.modalContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Appointment Type</Text>
                            <TouchableOpacity onPress={handleDoctorModal} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="#4b5e7d" />
                            </TouchableOpacity>
                        </View>

                        {/* List of doctor types */}
                        <FlatList style={styles.listContainer}
                            data={[
                                { id: 1, type: 'GP' },
                                { id: 2, type: 'Dietitian' },
                                { id: 3, type: 'Cardiologist' },
                                { id: 4, type: 'Dentist' },
                            ]}
                            renderItem={({ item }) => {
                                const isSelected = item.type === selectedDoctorType;
                                return (
                                    <ListItem
                                        style={doctorTypeStyles.typeItem}
                                        onPress={() => handleDoctorTypeSelection(item.type)}
                                    >

                                        <ListItem.Content
                                        >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <ListItem.Title style={doctorTypeStyles.typeText}>
                                                    {item.type}
                                                </ListItem.Title>
                                                {isSelected && (
                                                    <Ionicons
                                                        name="checkmark"
                                                        size={25}
                                                        style={{ marginLeft: 10, color: "blue" }}
                                                    />
                                                )}
                                            </View>
                                        </ListItem.Content>
                                    </ListItem>
                                );
                            }}
                            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                            ListFooterComponent={<View style={{ height: 80 }}></View>}
                        />
                    </View>
                </Modal>
                <Modal isVisible={isDateModalVisible} presentationStyle='pageSheet' transparent={false} style={styles.modalContainer}>
                    <View style={dateTimeStyles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Appointment Type</Text>
                            <TouchableOpacity onPress={handleDateModal} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="#4b5e7d" />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Calendar style={dateTimeStyles.calendarContainer}
                                hideExtraDays={true}
                                onDayPress={(day) => handleDateSelection(day.dateString)}
                                ideExtraDays={true}
                                markedDates={{
                                    [selectedDate]: { selected: true, marked: true },
                                }}
                            />

                            <Text style={dateTimeStyles.timePickerLabel}>Select time: </Text>

                            <View style={dateTimeStyles.timePickerContainer}>
                                <DateTimePicker
                                    value={selectedTime}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={handleTimeSelection}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </Modal >
        </View >
    );
}
