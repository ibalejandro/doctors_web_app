class TelemetricAPI {
    static async getVitalSignsForUser(id, token) {
        let userVitalSigns = {"heartRate": null, "oxygenSaturation": null, "breathingFrequency": null};
        const response = {"heart_rate": null, "oxygen_saturation": null, "breathing_frequency": null};
        if (response.heart_rate !== null) {
            userVitalSigns.heartRate = response.heart_rate + " ppm";
        } else {
            userVitalSigns.heartRate = "N/A";
        }
        if (response.oxygen_saturation !== null) {
            userVitalSigns.oxygenSaturation = response.oxygen_saturation + " %";
        } else {
            userVitalSigns.oxygenSaturation = "N/A";
        }
        if (response.breathing_frequency !== null) {
            userVitalSigns.breathingFrequency = response.breathing_frequency + " rpm";
        } else {
            userVitalSigns.breathingFrequency = "N/A";
        }
        return userVitalSigns;
    }
}

export default TelemetricAPI;