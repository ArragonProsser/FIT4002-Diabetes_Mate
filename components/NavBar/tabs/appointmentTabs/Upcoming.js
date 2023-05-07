import React from 'react';

import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ListItem} from "@rneui/themed";

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
        }
    });

    return (
        <FlatList style={styles.listContainer}
                  data={[
                      {type: 'General Practitioner', time: 'Mon 23 Feb, 9:30am', dateReminder: 'Today'},
                      {type: 'Endocrinologist', time: 'Tue 24 Feb, 10:00am', dateReminder: 'Tomorrow'},
                      {type: 'Dietitian', time: 'Wed 25 Feb, 9:30am', dateReminder: 'Upcoming'},
                      {type: 'Exercise Physiologist', time: 'Wed 25 Feb, 2:30pm', dateReminder: 'Upcoming'},
                      {type: 'Psychologist', time: 'Fri 27 Feb, 11:15am', dateReminder: 'Upcoming'},
                      {type: 'Dietitian', time: 'Fri 27 Feb, 12:00am', dateReminder: 'Upcoming'}
                  ]}
                  renderItem={
                      ({item}) =>
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
                  ItemSeparatorComponent={() => <View style={{height: 15}}/>}
                  ListFooterComponent={<View style={{height: 80}}></View>}
        />
    )
}