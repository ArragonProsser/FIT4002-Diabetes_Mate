const { handler } = require('./index'); // Replace with the correct file path
const controller = require('../../diabetesmatecontrollers/opt/appointments.controller');

// Mock the controller layer
jest.mock('../../diabetesmatecontrollers/opt/appointments.controller');

// Mock the authoriser layer
jest.mock('../../diabetesmateauthorisers/opt/main.authorisers', () => {
    return {
        authoriseRequest: jest.fn().mockResolvedValue({ "sub": "yes" })
    };
});

describe('Testing: appointmentsLambda', () => {

    afterEach(() => {
        // Reset all the mocks after a test case completes.
        jest.clearAllMocks();
    });

    it('apppointments.create.validRequest', async () => {
        let event = {
            httpMethod: "POST",
            pathParameters: {
                action: "create"
            },
            headers: {
                Authorization: "testAuthHeader"
            },
            body: JSON.stringify({
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
                        "totalCholesterol": "10s",
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
            })
        };
        let context = {};
        await handler(event, context);

        // Assertions
        expect(controller.createAppointment).toHaveBeenCalledTimes(1); // Ensure that the mocked function was called
    });

    it('apppointments.create.invalidHttpMethod', async () => {
        let event = {
            httpMethod: "DELETE",
            pathParameters: {
                action: "create"
            },
            headers: {
                Authorization: "testAuthHeader"
            },
            body: JSON.stringify({
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
                        "totalCholesterol": "10s",
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
            })
        };
        let context = {};
        await handler(event, context);

        // Assertions
        expect(controller.createAppointment).toHaveBeenCalledTimes(0); // Ensure that the mocked function was called
    });

    it('apppointments.update.validRequest', async () => {
        let event = {
            httpMethod: "PUT",
            pathParameters: {
                action: "update"
            },
            headers: {
                Authorization: "testAuthHeader"
            },
            body: JSON.stringify({
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
                        "totalCholesterol": "10s",
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
            })
        };
        let context = {};
        await handler(event, context);

        // Assertions
        expect(controller.updateAppointment).toHaveBeenCalledTimes(1); // Ensure that the mocked function was called
    });

    it('apppointments.update.invalidHttpMethod', async () => {
        let event = {
            httpMethod: "GET",
            pathParameters: {
                action: "update"
            },
            headers: {
                Authorization: "testAuthHeader"
            },
            body: JSON.stringify({
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
                        "totalCholesterol": "10s",
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
            })
        };
        let context = {};
        await handler(event, context);

        // Assertions
        expect(controller.updateAppointment).toHaveBeenCalledTimes(0); // Ensure that the mocked function was called
    });

    it('appointments.get', async () => {
        let event = {
            pathParameters: {
                action: "get"
            },
            headers: {
                Authorization: "testAuthHeader"
            },
        };
        let context = {};
        await handler(event, context);

        // Assertions
        expect(controller.getAppointmentsForUser).toHaveBeenCalledTimes(1); // Ensure that the mocked function was called
    });
});
