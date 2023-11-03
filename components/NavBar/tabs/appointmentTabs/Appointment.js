import React, { useState, useEffect } from "react";

import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ListItem } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import { API, Auth } from "aws-amplify";
import { useIsFocused } from "@react-navigation/native";

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  itemContainer: {
    borderRadius: 10,
    padding: 20,
  },
  appointmentType: {
    marginTop: 20,
    color: "#25437B",
    fontSize: 16,
    fontWeight: "bold",
  },
  appointmentTime: {
    marginVertical: 10,
    color: "#7A889F",
    fontSize: 12,
  },
  appointmentOptions: {
    position: "absolute",
    top: -10,
    right: -30,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#5398FF",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    margin: 0,
    backgroundColor: "white",
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
    color: "#25437b",
  },
  modalBody: {
    backgroundColor: "white",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
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
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2a477e",
  },
  appointmentCardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "space-between",
  },
  appointmentCardLabel: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  appointmentCardValue: {
    flex: 2,
    fontSize: 14,
    color: "#333",
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: "#5398ff",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#a6c8fb",
  },
});

function AppointmentList(navigation, appointments, clickable, bottomSheetRef) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ ...styles.listContainer, height: "100%", zIndex: 0 }}
        data={appointments}
        renderItem={({ item }) => (
          <ListItem
            containerStyle={styles.itemContainer}
            onPress={() => {
              if (clickable)
                navigation.navigate("Detail", {
                  appointment_type: item.appointment_type,
                  datetime: item.dtDisplay,
                  dateReminder: item.dateReminder,
                  appointment: item,
                });
            }}
          >
            <ListItem.Content>
              <View style={styles.appointmentOptions}>
                <TouchableOpacity
                  onPress={() => {
                    bottomSheetRef.current.appointment = item;
                    console.log(bottomSheetRef);
                    bottomSheetRef.current?.expand();
                  }}
                >
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={25}
                    color="#7A889F"
                  ></Ionicons>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: item.dateReminder === "Today" ? "#5398FF" : "#939FB2",
                }}
              >
                {item.dateReminder}
              </Text>
              <ListItem.Title style={styles.appointmentType}>
                {item.appointment_type}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.appointmentTime}>
                {item.dtDisplay}
              </ListItem.Subtitle>
            </ListItem.Content>
            {clickable && <ListItem.Chevron />}
          </ListItem>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListFooterComponent={<View style={{ height: 80 }} />}
      />

      <TouchableOpacity onPress={() => navigation.navigate("EditAppointment", { appointment_type: "", datetime: "", method: "CREATE" })} style={styles.addButtonContainer}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

/**
 *
 * @returns Appointments data
 */
async function getAppointmentsData() {
  const apiName = "Diabetesmate";
  const path = "/appointments/GET";
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  const myInit = {
    headers: {
      Authorization: token,
    },
    signerServiceInfo: {
      service: null,
      region: null,
    },
  };
  return await API.get(apiName, path, myInit);
}

/**
 *
 * @returns The current logged-in user
 */
async function testAuth() {
  const apiName = "Diabetesmate";
  const path = `/appointments/test-auth?${new Date().getTime()}`;
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  const myInit = {
    headers: {
      Authorization: token,
    },
    signerServiceInfo: {
      service: null,
      region: null,
    },
  };
  return await API.post(apiName, path, myInit);
}

const datetimeFormats = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export function Upcoming({ navigation, bottomSheetRef }) {
  let upcomingAppointments = [];
  const [appointments, setAppointments] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && testAuth()
      .then(console.log)
      .catch((e) => {
        console.log("Upcoming - testAuth - ", e);
      });
    isFocused && getAppointmentsData()
      .then((response) => {
        console.log("Appointments.js START___");
        console.log(response);
        console.log("Appointments.js END___");
        let appointments = response.Items;
        appointments.sort(
          (d1, d2) =>
            new Date(d1.appointment_datetime) -
            new Date(d2.appointment_datetime)
        );
        let today = new Date();
        for (let i = 0; i < appointments.length; i++) {
          let currentAppointment = appointments[i];
          const datetime = new Date(currentAppointment["appointment_datetime"]);
          if (datetime <= today) {
            continue;
          }
          const MS_PER_DAY = 1000 * 60 * 60 * 24; // Milliseconds per day
          let dateDiff = Math.floor((datetime - today) / MS_PER_DAY);
          switch (dateDiff) {
            case 0:
              currentAppointment.dateReminder = "Today";
              break;
            case 1:
              currentAppointment.dateReminder = "Tomorrow";
              break;
            default:
              currentAppointment.dateReminder = "Upcoming";
          }
          currentAppointment.dtDisplay = datetime.toLocaleString(
            "en-US",
            datetimeFormats
          );
          upcomingAppointments.push(currentAppointment);
        }
        setAppointments(upcomingAppointments);
      })
      .catch((e) => console.log("Upcoming - getAppointmentsData - ", e));
  }, [isFocused]);
  return AppointmentList(navigation, appointments, true, bottomSheetRef);
}

export function History({ navigation, bottomSheetRef }) {
  const pastAppointments = [];
  const [appointments, setAppointments] = React.useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && getAppointmentsData()
      .then((response) => {
        let appointments = response.Items;
        appointments.sort(
          (d1, d2) =>
            new Date(d2.appointment_datetime) -
            new Date(d1.appointment_datetime)
        );

        let today = new Date();
        for (let i = 0; i < appointments.length; i++) {
          let currentAppointment = appointments[i];
          const datetime = new Date(currentAppointment["appointment_datetime"]);
          if (datetime <= today) {
            currentAppointment.dateReminder = "Completed";
            currentAppointment.dtDisplay = datetime.toLocaleString(
              "en-US",
              datetimeFormats
            );
            pastAppointments.push(currentAppointment);
          }
        }
        pastAppointments.sort((a, b) => {
          return (
            new Date(a.appointment_datetime) - new Date(b.appointment_datetime)
          );
        })
        setAppointments(pastAppointments);
      })
      .catch((e) => console.log(e));
  }, [isFocused]);
  return AppointmentList(navigation, appointments, false, bottomSheetRef);
}
