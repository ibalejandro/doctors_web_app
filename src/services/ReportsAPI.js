import axios from 'axios';

const REPORTS_API_URL = 'http://34.215.55.134'

class ReportsAPI {
    static async getUserReports() {
        /* try {
            const response = await axios.get(REPORTS_API_URL + '/api/reports');
            return response.data
        } catch (error) {
            console.error(error);
            return []
        } */
        return [
            [{
                name: "John Doe",
                citizenId: "123456789",
                city: "Medellín",
                score: 20,
                comorbidity: {
                    EPOC: true,
                },
                age: "30 - 39",
                sex: "MALE",
                hasBeenTested: false,
                hasBeenInContactWithInfected: false,
                symptomStart: "2020-03-27",
                symptoms: {
                    DRY_COUGH: false,
                    EXHAUSTION: true,
                    FEVER: true,
                    HEAVY_BREATHING: true,
                    MUSCLE_ACHING: false,
                    DIARRHEA: false,
                    HEADACHE: false,
                    SORE_THROAT: false,
                    NO_TASTE: false,
                    NO_SMELL: false,
                    SLIME_COUGH: false,
                    RUNNY_NOSE: false,
                    NAUSEA_OR_VOMITING: false
                },
                submissionDate: "2020-03-28",
                bodyTemperature: "37",
                smokingHabit: "NEVER",
                isolationStatus: "ISOLATION_DUE_TO_GOVERNMENT_ORDERS",
                diagnosedWithOtherConditions: false,
            }],
            [{
                name: "Asdf Jkl",
                citizenId: "98765432",
                city: "Medellín",
                score: 10,
                comorbidity: {
                    EPOC: true,
                },
                age: "30 - 39",
                sex: "MALE",
                hasBeenTested: false,
                hasBeenInContactWithInfected: false,
                symptomStart: "2020-03-27",
                symptoms: {
                    DRY_COUGH: false,
                    EXHAUSTION: true,
                    FEVER: true,
                    HEAVY_BREATHING: true,
                    MUSCLE_ACHING: false,
                    DIARRHEA: false,
                    HEADACHE: false,
                    SORE_THROAT: false,
                    NO_TASTE: false,
                    NO_SMELL: false,
                    SLIME_COUGH: false,
                    RUNNY_NOSE: false,
                    NAUSEA_OR_VOMITING: false
                },
                submissionDate: "2020-03-28",
                bodyTemperature: "37",
                smokingHabit: "NEVER",
                isolationStatus: "ISOLATION_DUE_TO_GOVERNMENT_ORDERS",
                diagnosedWithOtherConditions: false,
            }],
        ]
    }

    static async getReportForUser(userId) {
        try {
            const response = await axios.get(REPORTS_API_URL + '/api/reports/' + userId)
            return response.data
        } catch (error) {
            console.error(error)
            return []
        }
    }
}

export default ReportsAPI
