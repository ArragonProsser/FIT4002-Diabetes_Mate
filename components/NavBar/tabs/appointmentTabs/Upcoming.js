import React from 'react';

import { Button, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";

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
            justifyContent: 'flex-end',
            margin: 0,
            backgroundColor: 'white',
          },
          modalContent: {
            backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    padding: 20,
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
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
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
    });

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

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
            <Modal isVisible={isModalVisible} presentationStyle="pageSheet" transparent="false" style={styles.modalContainer}>
            {/* <View style={styles.modalContainer}>
                {/* <View style={styles.modalContent}> */}
                    {/* <View style={styles.modalHeader}> */}
                        <Text style={[styles.modalTitle]}>Appointment</Text>
                        <TouchableOpacity onPress={handleModal} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                    {/* </View> */}
                    {/* <View style={styles.modalBody}> */}
                        <Text>Hello!</Text>
                    {/* </View> */}
                {/* </View>
            </View> */}
            </Modal>
        </View>
    );
}


