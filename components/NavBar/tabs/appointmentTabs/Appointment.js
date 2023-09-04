import React, { useEffect } from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ListItem } from "@rneui/themed";
import { API } from "aws-amplify";

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
    }
});

function AppointmentList(navigation, appointments, clickable) {

    return (
        <FlatList style={styles.listContainer}
            data={appointments}
            renderItem={
                ({ item }) =>
                    <ListItem containerStyle={styles.itemContainer}
                        onPress={() => {
                            // console.log(item);
                            if (clickable) navigation.navigate('Detail', {
                                type: item.type,
                                datetime: item.dtDisplay,
                                dateReminder: item.dateReminder,
                                appointment: item
                            })
                        }}
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
                                {item.dtDisplay}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        {clickable && <ListItem.Chevron />}
                    </ListItem>
            }
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            ListFooterComponent={<View style={{ height: 80 }} />}
        />
    )
}

function getAppointmentsData() {
    const apiName = 'Diabetesmate';
    const path = '/appointments/GET';
    const myInit = {
        headers: {}, // OPTIONAL
    };
    return API.get(apiName, path, myInit);
}

const datetimeFormats = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
export function Upcoming({ navigation }) {
    let upcomingAppointments = [];
    const [appointments, setAppointments] = React.useState([]);
    useEffect(() => {
        getAppointmentsData().then((response) => {
            let appointments = response.Items;
            appointments.sort((d1, d2) => new Date(d1.appointment_datetime) - new Date(d2.appointment_datetime));

            let today = new Date();
            for (let i = 0; i < appointments.length; i++) {
                let currentAppointment = appointments[i];
                const datetime = new Date(currentAppointment['appointment_datetime']);
                if (datetime <= today) {
                    continue;
                }
                const MS_PER_DAY = 1000 * 60 * 60 * 24; // Milliseconds per day
                let dateDiff = Math.floor((datetime - today) / MS_PER_DAY);
                switch (dateDiff) {
                    case 0:
                        currentAppointment.dateReminder = 'Today';
                        break;
                    case 1:
                        currentAppointment.dateReminder = 'Tomorrow';
                        break;
                    default:
                        currentAppointment.dateReminder = 'Upcoming';
                }
                currentAppointment.dtDisplay = datetime.toLocaleString("en-US", datetimeFormats);
                upcomingAppointments.push(currentAppointment);
            }
            setAppointments(upcomingAppointments);
        });
    }, []);
    return AppointmentList(navigation, appointments, true);
}

export function History({ navigation }) {
    const pastAppointments = [];
    const [appointments, setAppointments] = React.useState([]);
    useEffect(() => {
        getAppointmentsData().then((response) => {
            let appointments = response.Items;
            appointments.sort((d1, d2) => new Date(d2.appointment_datetime) - new Date(d1.appointment_datetime));

            let today = new Date();
            for (let i = 0; i < appointments.length; i++) {
                let currentAppointment = appointments[i];
                const datetime = new Date(currentAppointment['appointment_datetime']);
                if (datetime <= today) {
                    currentAppointment.dateReminder = 'Completed';
                    currentAppointment.dtDisplay = datetime.toLocaleString("en-US", datetimeFormats);
                    pastAppointments.push(currentAppointment);
                }
            }
            pastAppointments.sort((a, b) => { return new Date(a.appointment_datetime) - new Date(b.appointment_datetime) });
            setAppointments(pastAppointments);
        });
    }, []);
    return AppointmentList(navigation, appointments, false);
}
