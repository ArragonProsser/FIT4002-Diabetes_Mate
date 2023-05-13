import React from 'react';

import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ListItem} from "@rneui/themed";

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

function AppointmentList (navigation, appointmentsData, clickable) {
    return (
        <FlatList style={styles.listContainer}
                  data={appointmentsData}
                  renderItem={
                      ({item}) =>
                          <ListItem containerStyle={styles.itemContainer}
                                    onPress={() => {
                                        if (clickable) navigation.navigate('Detail', {type: item.type, time: item.time, dateReminder: item.dateReminder})
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
                                      {item.time}
                                  </ListItem.Subtitle>
                              </ListItem.Content>
                              {clickable && <ListItem.Chevron></ListItem.Chevron>}
                          </ListItem>
                  }
                  ItemSeparatorComponent={() => <View style={{height: 15}}/>}
                  ListFooterComponent={<View style={{height: 80}}></View>}
        />
    )
}

export function Upcoming({navigation}) {
    let upcomingAppointments = [
        {type: 'General Practitioner', time: 'Mon 23 Feb, 9:30am', dateReminder: 'Today'},
        {type: 'Endocrinologist', time: 'Tue 24 Feb, 10:00am', dateReminder: 'Tomorrow'},
        {type: 'Dietitian', time: 'Wed 25 Feb, 9:30am', dateReminder: 'Upcoming'},
        {type: 'Exercise Physiologist', time: 'Wed 25 Feb, 2:30pm', dateReminder: 'Upcoming'},
        {type: 'Psychologist', time: 'Fri 27 Mar, 11:15am', dateReminder: 'Upcoming'},
        {type: 'Dietitian', time: 'Fri 27 Apr, 12:00am', dateReminder: 'Upcoming'}
    ]
    return AppointmentList(navigation, upcomingAppointments, true);
}

export function History({navigation}) {
    let previousAppointments = [
        {type: 'Psychologist', time: 'Mon 23 Jan, 9:30am', dateReminder: 'Completed'},
        {type: 'Endocrinologist', time: 'Tue 24 Jan, 10:00am', dateReminder: 'Completed'},
        {type: 'General Practitioner', time: 'Wed 25 Jan, 9:30am', dateReminder: 'Completed'},
        {type: 'Exercise Physiologist', time: 'Wed 25 Jan, 12:30pm', dateReminder: 'Completed'},
        {type: 'General Practitioner', time: 'Fri 27 Jan, 10:15am', dateReminder: 'Completed'},
    ]
    return AppointmentList(navigation, previousAppointments, false);
}