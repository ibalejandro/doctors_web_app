import axios from "axios";

const TELEMETRY_API_URL = process.env.REACT_APP_TELEMETRY_API_URL;

class TelemetryAPI {
    static async getHeartRateAndOxygenSaturation(videoUrl, token) {
        let heartRateAndOxygenSaturation = {"heartRate": "N/A", "oxygenSaturation": "N/A"};
        if (videoUrl !== '') {
            try {
                const response = await axios({
                    url: TELEMETRY_API_URL + '/telemetry-reports',
                    params: {
                        "telemetry_source_id": videoUrl,
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    method: 'get'
                });
                const telemetryResult = response.data;
                if (telemetryResult.telemetry_report.bpm) {
                    heartRateAndOxygenSaturation.heartRate =
                        telemetryResult.telemetry_report.bpm.toFixed(2) + " ppm";
                }
                if (telemetryResult.telemetry_report.spo2) {
                    heartRateAndOxygenSaturation.oxygenSaturation =
                        telemetryResult.telemetry_report.spo2.toFixed(2) + " %";
                }
            } catch (error) {
                console.error(error);
            }
        }
        return heartRateAndOxygenSaturation;
    }

    static async getBreathingFrequency(audioUrl, token) {
        let breathingFrequency = {"breathingFrequency": "N/A"};
        if (audioUrl) {
            try {
                const response = await axios({
                    url: TELEMETRY_API_URL + '/telemetry-reports',
                    params: {
                        "telemetry_source_id": audioUrl,
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    method: 'get'
                });
                const telemetryResult = response.data;
                if (telemetryResult.telemetry_report.breathing_frequency) {
                    breathingFrequency.breathingFrequency =
                        telemetryResult.telemetry_report.breathing_frequency.toFixed(2) + " rpm";
                }
            } catch (error) {
                console.error(error);
            }
        }
        return breathingFrequency;
    }
}

export default TelemetryAPI;