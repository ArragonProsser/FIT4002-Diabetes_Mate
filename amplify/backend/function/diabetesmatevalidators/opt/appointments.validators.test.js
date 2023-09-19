const { validateBiomarker } = require('./appointments.validators'); // Replace with the correct file path

describe('Testing: appointments.validators', () => {

    it('appointments.validators.validateBiomarker.validInput.emptyFields', () => {
        let biomarker = {
            "diastolicBP": "",
            "HbA1c": "",
            "HDL": "",
            "LDL": "",
            "systolicBP": "",
            "TG": "",
            "totalCholesterol": "",
            "urineAlbuminToCreatinineRatio": "",
            "weight": ""
        }
        let results = validateBiomarker(biomarker)

        // Assertions
        expect(results).toEqual([]); // Should be empty array to denote no validation input issues.
    });

    it('appointments.validators.validateBiomarker.validInput.filledFields', () => {
        let biomarker = {
            "diastolicBP": "75",
            "HbA1c": "5.3",
            "HDL": "9",
            "LDL": "10",
            "systolicBP": "120",
            "TG": "2",
            "totalCholesterol": "15",
            "urineAlbuminToCreatinineRatio": "25",
            "weight": "60"
        }
        let results = validateBiomarker(biomarker)

        // Assertions
        expect(results).toEqual([]); // Should be empty array to denote no validation input issues.
    });

    it('appointments.validators.validateBiomarker.invalidInput.diastolicBP', async () => {
        let biomarker = {
            "diastolicBP": "99999999", // High diastolicBP for testing sake
            "HbA1c": "5.3",
            "HDL": "9",
            "LDL": "10",
            "systolicBP": "120",
            "TG": "2",
            "totalCholesterol": "15",
            "urineAlbuminToCreatinineRatio": "25",
            "weight": "60"
        };
        let results = validateBiomarker(biomarker)

        // Assertions
        expect(results).toEqual([{ "error": "Invalid diastolicBP", "reason": "Invalid diastolicBP 2, must be between 20 and 150" }]); // Corresponding Error in the array
    });

    // TODO: May help to have test cases for other minMax tuples in validators, but this should be good enough for coverage sake.
});
