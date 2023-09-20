const { getAppointmentsForUser, updateAppointment } = require('./appointments.controller'); // Replace with the correct file path
const queries = require('../../diabetesmatequeries/opt/appointments.queries');

jest.mock('../../diabetesmatequeries/opt/appointments.queries');

describe('Testing: appointments.controller', () => {

    afterEach(() => {
        // Reset all the mocks after a test case completes.
        jest.clearAllMocks()
    });

    it('appointments.controller.updateAppointment.validInput', async () => {
        let request = {
            "appointment_id": "test_appointment_0",
            "appointment_datetime": "2023-10-12T05:45:00Z",
            "biomarker": {
                "data": {
                    "diastolicBP": "75",
                    "HbA1c": "5.3",
                    "HDL": "9",
                    "LDL": "10",
                    "systolicBP": "120",
                    "TG": "2",
                    "totalCholesterol": "15",
                    "urineAlbuminToCreatinineRatio": "25",
                    "weight": "60"
                },
                "datetime_recorded": "test",
                "patient_id": "test_user_0"
            },
            "doctor_id": "test_doctor_id_test",
            "notes": "test_notes",
            "patient_id": "test_patient_id",
            "questions": [
                {
                    "data": [
                        {
                            "checked": true,
                            "id": 0,
                            "question": "How may diabetes affect my vision?"
                        },
                        {
                            "checked": true,
                            "id": 1,
                            "question": "How may diabetes affect my driving?"
                        }
                    ],
                    "id": 0,
                    "title": "General"
                },
                {
                    "data": [
                        {
                            "checked": true,
                            "id": 0,
                            "question": "What kind of foods should i avoid?"
                        }
                    ],
                    "id": 1,
                    "title": "Healthy Eating"
                }
            ],
            "reminders": [
                {
                    "checked": true,
                    "id": 0,
                    "instructions": "Get urine tests sample delivered to main office",
                    "title": "Urine Tests"
                },
                {
                    "checked": true,
                    "id": 1,
                    "instructions": "Get blood tests done at the local blood transfer service",
                    "title": "Blood Tests"
                }
            ],
            "type": "Cardiologist",
            "user_id": "test_user_id"

        }
        await updateAppointment(request)

        // Assertions
        expect(queries.updateAppointmentForUser).toHaveBeenCalledTimes(1); // Ensure that the mocked function was called
    });

    it('appointments.controller.updateAppointment.invalidInput', async () => {
        let request = {
            "appointment_id": "test_appointment_0",
            "appointment_datetime": "2023-10-12T05:45:00Z",
            "biomarker": {
                "data": {
                    "diastolicBP": "9999",
                    "HbA1c": "5.3",
                    "HDL": "9",
                    "LDL": "10",
                    "systolicBP": "120",
                    "TG": "2",
                    "totalCholesterol": "15",
                    "urineAlbuminToCreatinineRatio": "25",
                    "weight": "60"
                },
                "datetime_recorded": "test",
                "patient_id": "test_user_0"
            },
            "doctor_id": "test_doctor_id_test",
            "notes": "test_notes",
            "patient_id": "test_patient_id",
            "questions": [
                {
                    "data": [
                        {
                            "checked": true,
                            "id": 0,
                            "question": "How may diabetes affect my vision?"
                        },
                        {
                            "checked": true,
                            "id": 1,
                            "question": "How may diabetes affect my driving?"
                        }
                    ],
                    "id": 0,
                    "title": "General"
                },
                {
                    "data": [
                        {
                            "checked": true,
                            "id": 0,
                            "question": "What kind of foods should i avoid?"
                        }
                    ],
                    "id": 1,
                    "title": "Healthy Eating"
                }
            ],
            "reminders": [
                {
                    "checked": true,
                    "id": 0,
                    "instructions": "Get urine tests sample delivered to main office",
                    "title": "Urine Tests"
                },
                {
                    "checked": true,
                    "id": 1,
                    "instructions": "Get blood tests done at the local blood transfer service",
                    "title": "Blood Tests"
                }
            ],
            "type": "Cardiologist",
            "user_id": "test_user_id"

        }
        await updateAppointment(request)

        // Assertions
        expect(queries.updateAppointmentForUser).toHaveBeenCalledTimes(0); // The update function shouldn't call on invalid inputs
    });

    it('appointments.controller.getAppointmentsForUser', async () => {

        getAppointmentsForUser();

        // Assertions
        expect(queries.getAppointmentsForUser).toHaveBeenCalledTimes(1); // Ensure that the mocked function was called
    });
});
