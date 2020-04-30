import axios from 'axios';

const REPORTS_API_URL = process.env.REACT_APP_REPORTS_API_URL;

const SYMPTOMS_MAP = {
    DRY_COUGH: "TOS SECA",
    SLIME_COUGH: "TOS CON FLEMA",
    FEVER: "FIEBRE",
    HEAVY_BREATHING: "DIFICULTAD PARA RESPIRAR",
    EXHAUSTION: "FATIGA Y CANSANCIO",
    MUSCLE_ACHING: "DOLOR MUSCULAR",
    CHEST_PAIN: "DOLOR DE PECHO",
    DIARRHEA: "DIARREA",
    HEADACHE: "DOLOR DE CABEZA",
    SORE_THROAT: "DOLOR DE GARGANTA",
    NO_SMELL: "PÉRDIDA DEL SENTIDO DEL OLFATO",
    NO_TASTE: "PÉRDIDA DEL SENTIDO DEL GUSTO",
    RUNNY_NOSE: "CONGESTIÓN O GOTEO NASAL",
    NAUSEA_OR_VOMITING: "NÁUSEAS O VÓMITOS"
};

const COMORBIDITIES_MAP = {
    DIABETES: "DIABETES",
    HYPERTENSIONARTERIAL: "HIPERTENSIÓN ARTERIAL",
    CORONARYHEARTDISEASE: "ENFERMEDAD CORONARIA",
    ASTHMA: "ASMA",
    CHRONICLUNGDISEASE: "ENFERMEDAD PULMONAR CRÓNICA",
    KIDNEYDISEASE: "ENFERMEDAD RENAL",
    AUTOIMMUNEDISEASE: "ENFERMEDAD AUTOINMUNE (ARTRITIS, LUPUS)",
    IMMUNOSUPRESSION: "ENFERMEDAD INMUNOSUPRESORA",
    CANCER: "CÁNCER",
    VIH: "VIH",
    OBESITY_OR_MALNUTRITION: "OBESIDAD O DESNUTRICIÓN"
};

class ReportsAPI {
    static async getUserReports(token) {
        try {
            const response = await axios({
                url: REPORTS_API_URL + '/reports/',
                params: {
                    "pending": 1
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: 'get'
            });

            return response.data.reports.map((report) => {
                return {
                    ...report,
                    city: report.postalCode
                }
            })
        } catch (error) {
            console.error(error);
            return []
        }
    }

    static async getReportForUser(reportId, token) {
        try {
            const response = await axios({
                url: REPORTS_API_URL + '/reports/' + reportId,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: 'get'
            });
            const report = response.data;
            return {
                ...report,
                city: report.postalCode
            }
        } catch (error) {
            console.error(error)
            return []
        }
    }

    static getResultsToDisplay(report) {
        let resultsToDisplay = {...report};

        resultsToDisplay.sex = this.getSex(report.sex);

        resultsToDisplay.isPregnant = report.isPregnant ? "SÍ" : "NO";

        resultsToDisplay.hasBeenInContactWithInfected
            = this.getHasBeenInContactWithInfected(report.hasBeenInContactWithInfected);

        resultsToDisplay.hasBeenTested = report.hasBeenTested ? "SÍ" : "NO";

        resultsToDisplay.testResult = this.getTestResult(report.testResult);

        resultsToDisplay.symptoms = this.getSymptoms(report.symptoms);

        resultsToDisplay.symptomStart = report.symptomStart ? report.symptomStart : "N/A";

        resultsToDisplay.bodyTemperature = report.bodyTemperature !== '' ? report.bodyTemperature + " ºC" : "N/A";

        resultsToDisplay.diagnosedWith = this.getComorbidities(report.diagnosedWith);

        resultsToDisplay.smokingHabit = report.smokingHabit === "CURRENTLY" ? "SÍ" : "NO";

        resultsToDisplay.isolationStatus = this.getIsolationReason(report.isolationStatus);

        resultsToDisplay.submissionTimestamp = this.getSubmissionDate(report.submissionTimestamp);

        return resultsToDisplay;
    }

    static getSex(sex) {
        switch(sex) {
            case "MALE":
                return "MASCULINO"
            case "FEMALE":
                return "FEMENINO";
            default:
                return "OTRO";
        }
    }

    static getHasBeenInContactWithInfected(hasBeenInContactWithInfected) {
        return hasBeenInContactWithInfected ? "SÍ" : "NO";
    }

    static getTestResult(testResult) {
        switch(testResult) {
            case "POSITIVE":
                return "POSITIVO";
            case "NEGATIVE":
                return "NEGATIVO";
            case "PENDING":
                return "PENDIENTE";
            default:
                return "N/A";
        }
    }

    static getSymptoms(symptoms) {
        let symptomsList = []
        for (let symp in symptoms) {
            if (symptoms[symp]) {
                symptomsList.push(SYMPTOMS_MAP[symp]);
            }
        }
        if (symptomsList.length === 0) {
            symptomsList.push("N/A");
        }
        return symptomsList;
    }

    static getComorbidities(diagnosedWith) {
        let comorbiditiesList = []
        for (let comorb in diagnosedWith) {
            if (diagnosedWith[comorb]) {
                comorbiditiesList.push(COMORBIDITIES_MAP[comorb]);
            }
        }
        if (comorbiditiesList.length === 0) {
            comorbiditiesList.push("N/A");
        }
        return comorbiditiesList;
    }

    static getIsolationReason(isolationStatus) {
        switch(isolationStatus) {
            case "NOT_IN_ISOLATION":
                return "NO ESTÁ EN AISLAMIENTO";
            case "ISOLATION_DUE_TO_TRAVEL":
                return "VIAJE INTERNACIONAL RECIENTE";
            case "ISOLATION_DUE_TO_CONTACT":
                return "CONTACTO CON SOSPECHOSO PARA COVID-19";
            case "ISOLATION_DUE_TO_COVID_19":
                return "CONTAGIO DE COVID-19";
            default:
                return "POR ORDEN DEL GOBIERNO";

        }
    }

    static getSubmissionDate(submissionTimestamp) {
        const date = new Date(parseInt(submissionTimestamp));
        let submissionMonth = (date.getMonth() + 1).toString();
        submissionMonth = date.length > 1 ? submissionMonth : '0' + submissionMonth;
        let submissionDay = date.getDate().toString();
        submissionDay = date.length > 1 ? submissionDay : '0' + submissionDay;
        const submissionDate = [date.getFullYear(), submissionMonth, submissionDay].join('-');
        return submissionDate;
    }

    static async getUserContactNumber(patientId, token) {
        try {
            const response = await axios({
                url: REPORTS_API_URL + '/piis',
                params: {
                    "patient_id": patientId,
                    "phone": 1
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: 'get'
            });
            const userPii = response.data;
            return {
                userContactNumber: userPii.raw_insecure_value
            };
        } catch (error) {
            console.error(error);
            return {
                userContactNumber: null
            };
        }
    }

    static async updateReportPendingState(reportId, currentState, token) {
        const pending = !currentState[currentState.length - 1].active;
        try {
            const response = await axios({
                url: REPORTS_API_URL + '/reports/',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    "report_id": reportId,
                    "pending": pending
                },
                method: 'patch'
            });
            return {
                updateMessage: ''
            };
        } catch (error) {
            console.error(error);
            return {
                updateMessage: "Error"
            };
        }
    }
}

export default ReportsAPI
