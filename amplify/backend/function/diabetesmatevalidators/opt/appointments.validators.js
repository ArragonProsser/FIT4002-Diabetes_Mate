const isValidNumber = (text) => {
    const regex = /^[1-9]\d*(\.\d+)?$/;
    return regex.test(text);
};

module.exports = {
    validateBiomarker(appointment) {

        // Change Min/Max Validated for if needed
        minMaxTuples = {
            "weight": [20, 250],
            "HbA1c": [4, 20],
            "urineAlbuminToCreatinineRatio": [0, 300],
            "diastolicBP": [20, 150],
            "systolicBP": [50, 250],
            "totalCholesterol": [1, 20],
            "LDL": [1, 15],
            "HDL": [1, 10],
            "TG": [1, 60]
        }

        let validationErrorArray = []

        for (const key in appointment) {
            // This check should allow empty string fields to exist.
            if (appointment[key].length > 0) {
                // If length of field's value is more than 0, check is valid number
                if (isValidNumber(appointment[key])) {
                    const value = Number.parseFloat(appointment[key]);
                    // Check whether field exceeds the lower/upper boundaries
                    if (value < minMaxTuples[key][0] || value > minMaxTuples[key][1]) {
                        validationErrorArray.push({
                            "error": `Invalid ${key}`,
                            "reason": `Invalid ${key} ${appointment[key]}, must be between ${minMaxTuples[key][0]} and ${minMaxTuples[key][1]}`
                        })
                    }
                }
            }
        }
        return validationErrorArray;
    }
};
