import React, { useState, useEffect } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
} from "react-native";
import { ListItem } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import { API, Auth } from "aws-amplify";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
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

const doctorTypeStyles = StyleSheet.create({
  typeItem: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    height: 60,
  },
  typeText: {
    color: "#25437B",
    fontSize: 16,
    fontWeight: 600,
    flexGrow: 1,
  },
});

const dateTimeStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  timePickerContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timePickerLabel: {
    fontSize: 16,
    color: "grey",
    marginBottom: 10,
    marginLeft: 13,
    justifyContent: "flex-start",
  },
  calendarContainer: {
    padding: 5,
    marginBottom: 15,
  },
});

export function EditAppointment({ route, navigation }) {
  const { appointment_type, datetime, method, appointment } = route?.params;

  const [isReminderEnabled, setIsReminderEnabled] = useState(false);

  const [isDoctorModalVisible, setIsDoctorModalVisible] = useState(false);
  const [selectedDoctorType, setSelectedDoctorType] = useState("");

  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(new Date(null));

  const handleDoctorModal = () =>
    setIsDoctorModalVisible(() => !isDoctorModalVisible);
  const handleDateModal = () =>
    setIsDateModalVisible(() => !isDateModalVisible);
  const handleTimePicker = () =>
    setTimePickerVisibility(() => !isTimePickerVisible);

  const handleToggleReminder = () =>
    setIsReminderEnabled((prevState) => !prevState);

  const [formCompleted, updateForm] = useState({
    date: false,
    doctorType: false,
    time: false,
    updated: false,
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleSubmit = async () => {
    // handle form submission
    const user = await Auth.currentAuthenticatedUser();
    const userId = user.attributes.sub;
    console.log(
      "🚀 ~ file: EditAppointment.js:207 ~ handleSubmit ~ userId:",
      userId
    );

    let appt;
    if (!appointment) {
      appt = {
        appointment_id: uuid(),
        appointment_datetime: selectedDateTime,
        biomarker: {
          data: {
            diastolicBP: "",
            HbA1c: "",
            HDL: "",
            LDL: "",
            systolicBP: "",
            TG: "",
            totalCholesterol: "",
            urineAlbuminToCreatinineRatio: "",
            weight: "",
          },
          datetime_recorded: "",
          patient_id: "test_patient_id",
        },
        doctor_id: "",
        notes: "",
        patient_id: userId,
        questions: [
          {
            data: [
              {
                checked: false,
                id: 0,
                question: "How may diabetes affect my vision?",
              },
              {
                checked: false,
                id: 1,
                question: "How may diabetes affect my feet?",
              },
              {
                checked: false,
                id: 2,
                question: "How may diabetes affect my kidneys?",
              },
              {
                checked: false,
                id: 3,
                question: "How may diabetes affect my heart and blood vessels?",
              },
              {
                checked: false,
                id: 4,
                question: "Can diabetes and mental health affect each other?",
              },
              {
                checked: false,
                id: 5,
                question: "How can diabetes affect my sex life?",
              },
              {
                checked: false,
                id: 6,
                question: "How can diabetes affect my driving?",
              },
            ],
            id: 0,
            title: "Diabetes impact on health and daily life",
          },
          {
            data: [
              {
                checked: false,
                id: 0,
                question:
                  "Why should I test my glucose levels? How often and when should I be testing?",
              },
              {
                checked: false,
                id: 1,
                question:
                  "What steps should I take to get an accurate blood glucose reading?",
              },
              {
                checked: false,
                id: 2,
                question:
                  "What other options are available for glucose testing in addition to pricking my finger?",
              },
              {
                checked: false,
                id: 3,
                question:
                  "Where do I find information about clinical Trials in Type 1 (or Type 2) Diabetes?",
              },
            ],
            id: 1,
            title: "Diabetes self-management",
          },
          {
            data: [
              {
                checked: false,
                id: 0,
                question: "What kind of foods should I avoid?",
              },
              {
                checked: false,
                id: 1,
                question: "Are there any foods that are good for my diabetes?",
              },
            ],
            id: 2,
            title: "Healthy Eating",
          },
          {
            data: [
              {
                checked: false,
                id: 0,
                question:
                  "How much physical activity is recommended for those with diabetes and why is it important to diabetes management?",
              },
              {
                checked: false,
                id: 1,
                question: "How does exercise affect my glucose levels?",
              },
              {
                checked: false,
                id: 2,
                question:
                  "Is the type of exercise important in how my glucose levels change?",
              },
              {
                checked: false,
                id: 3,
                question:
                  "Can my weight affect my glucose levels and the recommended treatment for my diabetes?",
              },
            ],
            id: 3,
            title: "Exercise and Physical Activity",
          },
          {
            data: [
              {
                checked: false,
                id: 0,
                question:
                  "What types of medications are prescribed for diabetes? How do they work?",
              },
              {
                checked: false,
                id: 1,
                question:
                  "What are possible side effects of the medications I am on and how can I minimise side effects?",
              },
              {
                checked: false,
                id: 2,
                question:
                  "Who should I call if I think I am having a problem with the medication?",
              },
              {
                checked: false,
                id: 3,
                question:
                  "Should the medications be taken at a certain time of day, with or without food?",
              },
              {
                checked: false,
                id: 4,
                question: "What do I do if I miss a dose?",
              },
              {
                checked: false,
                id: 5,
                question:
                  "What is an insulin pump? Do you recommend it for me?",
              },
            ],
            id: 4,
            title: "Taking Medications for Diabetes",
          },
          {
            data: [
              {
                checked: false,
                id: 0,
                question: "What is a Haemoglobin A1C (HbA1C)?",
              },
              {
                checked: false,
                id: 1,
                question:
                  "What are the treatment targets for me? ie glucose levels, HbA1c, blood pressure, cholesterol levels?",
              },
              {
                checked: false,
                id: 2,
                question: "What is a diabetes annual screening?",
              },
              {
                checked: false,
                id: 3,
                question: "Why do I need a urine test?",
              },
              {
                checked: false,
                id: 4,
                question: "Why do I have to do regular eye examinations?",
              },
              {
                checked: false,
                id: 5,
                question: "What are you looking for when you check my feet?",
              },
            ],
            id: 5,
            title: "Monitoring and Screening for Complications",
          },
          {
            data: [
              {
                checked: false,
                id: 0,
                question:
                  "Do I need to prepare anything for my diabetes management before I go on a trip?",
              },
              {
                checked: false,
                id: 1,
                question: "Are there any foods that are good for my diabetes?",
              },
              {
                checked: false,
                id: 2,
                question:
                  "How does fasting (religious or before an operation) affect my glucose levels?",
              },
              {
                checked: false,
                id: 3,
                question: "What is hypoglycaemia? And how should I treat it?",
              },
              {
                checked: false,
                id: 4,
                question:
                  "How may diabetes affect family planning and pregnancy? How can I prepare for pregnancy?",
              },
              {
                checked: false,
                id: 5,
                question:
                  "What are the major chronic complications of diabetes? How can I prevent or delay these complications?",
              },
              {
                checked: false,
                id: 6,
                question: "What is the effect of alcohol on my glucose levels?",
              },
            ],
            id: 6,
            title: "Problem Solving and Risk Reducing",
          },
        ],
        reminders: [
          {
            checked: false,
            id: 0,
            instructions: "Get urine tests sample delivered to main office",
            title: "Urine Tests",
          },
          {
            checked: false,
            id: 1,
            instructions:
              "Get blood tests done at the local blood transfer service",
            title: "Blood Tests",
          },
        ],
        appointment_type: selectedDoctorType,
        user_id: userId,
      };
    } else {
      console.log(appointment);
      appt = appointment;
      appt["appointment_type"] = selectedDoctorType;
      appt["appointment_datetime"] = selectedDateTime;
    }

    console.log(
      "🚀 ~ file: EditAppointment.js:205 ~ handleSubmit ~ appt:",
      appt
    );

    if (method == "CREATE") {
      createAppointment(appt)
        .then(() => {
          alert("Successfully added your appointment");
          navigation.navigate("UpcomingStack");
        })
        .catch((e) => console.log(e));
    } else if (method == "UPDATE") {
      updateAppointment(appt)
        .then((response) => {
          console.log(response);
          alert("successfully updated");
          navigation.navigate("UpcomingStack");
        })
        .catch((e) => console.log(e));
    }
  };

  const doctorTypes = [
    { id: 1, type: "General Practitioner" },
    { id: 2, type: "Dietitian" },
    { id: 3, type: "Cardiologist" },
    { id: 4, type: "Dentist" },
  ];

  const handleDoctorTypeSelection = (type) => {
    setSelectedDoctorType(type);
    handleDoctorModal();

    updateForm((prevForm) => ({
      ...prevForm,
      doctorType: true,
      updated: true,
    }));
  };

  const handleDateSelection = (date) => {
    let newDate = new Date(date);

    // Get the current date without the time component
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the selected date is in the past
    if (newDate < today) {
      alert("Selected date is in the past!");
      return; // Exit early without updating the state
      alert("Selected date is in the past!");
      return; // Exit early without updating the state
    }

    setSelectedDate(date);

    const dateTime = selectedDateTime;
    dateTime.setFullYear(newDate.getFullYear());
    dateTime.setMonth(newDate.getMonth());
    dateTime.setDate(newDate.getDate());
    setSelectedDateTime(dateTime);

    updateForm((prevForm) => ({ ...prevForm, date: true, updated: true }));
  };

  const handleTimeSelection = (newTime) => {
    if (newTime) {
      const dateTime = selectedDateTime;
      dateTime.setHours(newTime.getHours());
      dateTime.setMinutes(newTime.getMinutes());

      // Get the current date and time
      let now = new Date();

      // Check if the selected dateTime is in the past and the selected date is today
      if (dateTime < now && selectedDate === now.toISOString().split("T")[0]) {
        alert("Selected time is in the past!");
        return; // Exit early without updating the state
      }

      setSelectedDateTime(dateTime);

      const time = newTime.toLocaleTimeString("en-US", timeFormats);
      setSelectedTime(time);

      updateForm((prevForm) => ({ ...prevForm, time: true, updated: true }));
      handleTimePicker();
    }
  };

  useEffect(() => {
    console.log("Checking form completed:", formCompleted);
    if (
      formCompleted["updated"] == true &&
      formCompleted["doctorType"] == true &&
      formCompleted["date"] == true &&
      formCompleted["time"] == true
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [formCompleted]);

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: true });

    if (appointment_type != "") {
      setSelectedDoctorType(appointment_type);
    }

    if (datetime != "") {
      const newDateTime = new Date(datetime);
      setSelectedDate(newDateTime);
      setSelectedDateTime(newDateTime);
      const time = newDateTime.toLocaleTimeString("en-US", timeFormats);
      setSelectedTime(time);

      updateForm({
        date: true,
        doctorType: true,
        time: true,
        updated: false,
      });
    }

    if (
      (formCompleted["date"] && !formCompleted["time"]) ||
      (!formCompleted["date"] && formCompleted["time"])
    ) {
    }

    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={[styles.modalTitle]}>
            {method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()}{" "}
            Appointment
          </Text>
        </View>

        <View style={styles.modalBody}>
          <TouchableOpacity
            onPress={handleDoctorModal}
            style={styles.appointmentCard}
          >
            <Text style={styles.appointmentCardTitle}>Appointment Type</Text>
            <View style={styles.appointmentCardRow}>
              <Text style={styles.appointmentCardLabel}>
                {selectedDoctorType
                  ? `${selectedDoctorType}`
                  : "Select appointment type"}
              </Text>
              <Icon
                name="angle-right"
                size={25}
                color="#333"
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDateModal}
            style={styles.appointmentCard}
          >
            <Text style={styles.appointmentCardTitle}>
              Appointment Date and Time
            </Text>
            <View style={styles.appointmentCardRow}>
              <Text style={styles.appointmentCardLabel}>
                {selectedDate && selectedTime
                  ? `${selectedDateTime.toLocaleString(
                      "en-US",
                      datetimeFormats
                    )}`
                  : "Select appointment date and time"}
              </Text>
              <Icon
                name="angle-right"
                size={25}
                color="#333"
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.appointmentCard}>
            <View style={[styles.appointmentCardRow]}>
              <Text style={styles.appointmentCardTitle}>
                Appointment reminders
              </Text>
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
            style={[
              styles.createButton,
              submitDisabled && styles.disabledButton,
            ]}
            onPress={() => handleSubmit()}
            disabled={submitDisabled}
          >
            <Text style={styles.createButtonText}>
              {method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={isDoctorModalVisible}
        presentationStyle="pageSheet"
        transparent={false}
        style={styles.modalContainer}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Appointment Type</Text>
            <TouchableOpacity
              onPress={handleDoctorModal}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#4b5e7d" />
            </TouchableOpacity>
          </View>

          {/* List of doctor types */}
          <FlatList
            style={styles.listContainer}
            data={doctorTypes}
            renderItem={({ item }) => {
              const isSelected = item.type === selectedDoctorType;
              return (
                <ListItem
                  style={doctorTypeStyles.typeItem}
                  onPress={() => handleDoctorTypeSelection(item.type)}
                >
                  <ListItem.Content>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
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

      <Modal
        isVisible={isDateModalVisible}
        presentationStyle="pageSheet"
        transparent={false}
        style={styles.modalContainer}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Appointment Date-Time</Text>
            <TouchableOpacity
              onPress={handleDateModal}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#4b5e7d" />
            </TouchableOpacity>
          </View>

          <View>
            <Calendar
              style={dateTimeStyles.calendarContainer}
              hideExtraDays={true}
              onDayPress={(day) => handleDateSelection(day.dateString)}
              ideExtraDays={true}
              markedDates={{
                [selectedDate]: { selected: true, marked: true },
              }}
            />

            <Text style={dateTimeStyles.timePickerLabel}>Select time: </Text>

            <View style={{ marginHorizontal: 15 }}>
              <TouchableOpacity onPress={handleTimePicker}>
                <View style={styles.appointmentCardRow}>
                  <Text style={styles.appointmentCardLabel}>
                    {selectedTime ? `${selectedTime}` : ""}
                  </Text>
                  <Icon
                    name="angle-right"
                    size={25}
                    color="#333"
                    style={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeSelection}
                onCancel={handleTimePicker}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

async function createAppointment(appt) {
  testAuth()
    .then(console.log)
    .catch((e) => console.log(e));

  const apiName = "Diabetesmate";
  const path = "/appointments/CREATE";
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  const myInit = {
    headers: {
      Authorization: token,
    },
    body: appt,
    signerServiceInfo: {
      service: null,
      region: null,
    },
  };
  return await API.post(apiName, path, myInit);
}

async function updateAppointment(appt) {
  testAuth()
    .then(console.log)
    .catch((e) => console.log(e));

  const apiName = "Diabetesmate";
  const path = "/appointments/UPDATE";
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  const myInit = {
    headers: {
      Authorization: token,
    },
    body: appt,
    signerServiceInfo: {
      service: null,
      region: null,
    },
  };
  return await API.put(apiName, path, myInit);
}

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

const timeFormats = {
  hour: "numeric",
  minute: "numeric",
};

const datetimeFormats = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
