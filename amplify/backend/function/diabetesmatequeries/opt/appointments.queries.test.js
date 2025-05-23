
const { docClient, createAppointmentForUser, getAppointmentsForUser, updateAppointmentForUser } = require('../../diabetesmatequeries/opt/appointments.queries');
const AWS = require('aws-sdk');

// Mocking the dynamodb calls.
jest.mock('aws-sdk', () => {
    return {
        DynamoDB: {
            DocumentClient: jest.fn().mockImplementation(() => {
                return {
                    put: jest.fn(() => {
                        return {
                            // docClient.put() function that resolves w/ {}
                            promise: jest.fn().mockResolvedValue({})
                        };
                    }),
                    scan: jest.fn(() => {
                        return {
                            // docClient.scan() function that resolves w/ {}
                            promise: jest.fn().mockResolvedValue({})
                        };
                    }),
                    query: jest.fn((authUserId) => {
                        if (authUserId === "validAuthUserId") {
                            return {
                                promise: jest.fn().mockResolvedValue({})
                            }
                        } else {
                            return {
                                promise: jest.fn().mockRejectedValue(new Error("You do not have permission to get the appointments!"))
                            }
                        }
                    }),
                    update: jest.fn(() => {
                        return {
                            // docClient.update() function that resolves w/ {}
                            promise: jest.fn().mockResolvedValue({})
                        };
                    })
                };
            })
        }
    };
});

describe('Testing: appointments.queries', () => {

    afterEach(() => {
        // Reset all the mocks after a test case completes.
        jest.clearAllMocks();
    });

    it('appointments.queries.createAppointmentForUser.validQuery', async () => {

        let request = {
            "appointment_id": "test_appointment_0",
            "appointment_datetime": "2023-10-12T05:45:00Z",
            "biomarker": {
                "data": {
                    "diastolicBP": "75",
                    "HbA1c": "5.3",
                    "HDL": "40",
                    "LDL": "20",
                    "systolicBP": "120",
                    "TG": "2",
                    "totalCholesterol": "202",
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
            "appointment_type": "Cardiologist",
            "user_id": "test_user_id",

        };
        await createAppointmentForUser(request, "test_patient_id");

        // Assertions
        expect(docClient.put).toHaveBeenCalledTimes(1); // Ensure that the mocked function was called
    });

    it('appointments.queries.getAppointmentsForUser.validQuery', async () => {
        let appointments = await getAppointmentsForUser("validAuthUserId");
        // Assertions
        expect(docClient.query).toHaveBeenCalledTimes(1); // Ensure that the mocked function was called
    });

    it('appointments.queries.createAppointmentForUser.invalidAuthUserId', async () => {

        let request = {
            "appointment_id": "test_appointment_0",
            "appointment_datetime": "2023-10-12T05:45:00Z",
            "biomarker": {
                "data": {
                    "diastolicBP": "75",
                    "HbA1c": "5.3",
                    "HDL": "40",
                    "LDL": "20",
                    "systolicBP": "120",
                    "TG": "2",
                    "totalCholesterol": "202",
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
            "appointment_type": "Cardiologist",
            "user_id": "test_user_id",

        };
        await createAppointmentForUser(request, "invalidAuthUserId");

        // Assertions
        expect(docClient.put).toHaveBeenCalledTimes(0); // Ensure that the mocked function was called
    });

    it('appointments.queries.updateAppointmentForUser.validQuery', async () => {

        let request = {
            "appointment_id": "test_appointment_0",
            "appointment_datetime": "2023-10-12T05:45:00Z",
            "biomarker": {
                "data": {
                    "diastolicBP": "75",
                    "HbA1c": "5.3",
                    "HDL": "40",
                    "LDL": "20",
                    "systolicBP": "120",
                    "TG": "2",
                    "totalCholesterol": "202",
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
            "appointment_type": "Cardiologist",
            "user_id": "test_user_id",

        };
        await updateAppointmentForUser(request, "test_patient_id");

        // Assertions
        expect(docClient.update).toHaveBeenCalledTimes(1); // Ensure that the mocked function was called
    });

    it('appointments.queries.updateAppointmentForUser.invalidAuthUserId', async () => {

        let request = {
            "appointment_id": "test_appointment_0",
            "appointment_datetime": "2023-10-12T05:45:00Z",
            "biomarker": {
                "data": {
                    "diastolicBP": "75",
                    "HbA1c": "5.3",
                    "HDL": "40",
                    "LDL": "20",
                    "systolicBP": "120",
                    "TG": "2",
                    "totalCholesterol": "202",
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
            "appointment_type": "Cardiologist",
            "user_id": "test_user_id",

        };
        await updateAppointmentForUser(request, "invalidAuthUserId");

        // Assertions
        expect(docClient.update).toHaveBeenCalledTimes(0); // Ensure that the mocked function was called
    });

    it('appointments.queries.getAppointmentsForUser.invalidQuery', async () => {
        let appointments = await getAppointmentsForUser("invalidAuthUserId");

        // Assertions
        let expectedError = new Error("You do not have permission to get the appointments!")
        expect(appointments).toEqual({ error: expectedError }); // Ensure that an error is returned
    });
});
