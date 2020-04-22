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
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: 'get'
            });

            return response.data.reports.map((report) => {
                return {
                    ...report,
                    comorbidity: report.diagnosedWith,
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
                comorbidity: report.diagnosedWith,
                city: report.postalCode
            }
        } catch (error) {
            console.error(error)
            return []
        }
    }

    static getResultsToDisplay(report) {
        let resultsToDisplay = {...report};

        resultsToDisplay.sex = this.getSex(report);

        resultsToDisplay.isPregnant = report.isPregnant ? "SÍ" : "NO";

        resultsToDisplay.hasBeenInContactWithInfected = report.hasBeenInContactWithInfected ? "SÍ" : "NO";

        resultsToDisplay.hasBeenTested = report.hasBeenTested ? "SÍ" : "NO";

        resultsToDisplay.testResult = this.getTestResult(report);

        resultsToDisplay.symptoms = this.getSymptoms(report);

        resultsToDisplay.symptomStart = report.symptomStart ? report.symptomStart : "N/A";

        resultsToDisplay.bodyTemperature = report.bodyTemperature !== '' ? report.bodyTemperature + " ºC" : "N/A";

        resultsToDisplay.diagnosedWith = this.getComorbidities(report);

        resultsToDisplay.smokingHabit = report.smokingHabit === "CURRENTLY" ? "SÍ" : "NO";

        resultsToDisplay.isolationStatus = this.getIsolationReason(report);

        resultsToDisplay.submissionTimestamp = this.getSubmissionDate(report);

        return resultsToDisplay;
    }

    static getSex(report) {
        let sex = null;
        if (report.sex === "MALE") {
            sex = "MASCULINO";
        }
        else if (report.sex === "FEMALE") {
            sex = "FEMENINO";
        }
        else {
            sex = "OTRO";
        }
        return sex;
    }

    static getTestResult(report) {
        let testResult = null;
        if (report.testResult === null) {
            testResult = "N/A";
        }
        else if (report.testResult === "POSITIVE") {
            testResult = "POSITIVO";
        }
        else if (report.testResult === "NEGATIVE") {
            testResult = "NEGATIVO";
        }
        else {
           testResult = "PENDIENTE";
        }
        return testResult;
    }

    static getSymptoms(report) {
        const symptoms = {...report.symptoms};
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

    static getComorbidities(report) {
        let comorbiditiesList = []
        for (let comorb in report.diagnosedWith) {
            if (report.diagnosedWith[comorb]) {
                comorbiditiesList.push(COMORBIDITIES_MAP[comorb]);
            }
        }
        if (comorbiditiesList.length === 0) {
            comorbiditiesList.push("N/A");
        }
        return comorbiditiesList;
    }

    static getIsolationReason(report) {
        let isolationReason = null;
        if (report.isolationStatus === "NOT_IN_ISOLATION") {
            isolationReason = "NO ESTÁ EN AISLAMIENTO";
        }
        else if (report.isolationStatus === "ISOLATION_DUE_TO_TRAVEL") {
            isolationReason = "VIAJE INTERNACIONAL RECIENTE";
        }
        else if (report.isolationStatus === "ISOLATION_DUE_TO_CONTACT") {
            isolationReason = "CONTACTO CON SOSPECHOSO PARA COVID-19";
        }
        else if (report.isolationStatus === "ISOLATION_DUE_TO_COVID_19") {
            isolationReason = "CONTAGIO DE COVID-19";
        }
        else {
            isolationReason = "POR ORDEN DEL GOBIERNO";
        }
        return isolationReason;
    }

    static getSubmissionDate(report) {
        const submissionTimestamp = new Date(parseInt(report.submissionTimestamp));
        let submissionMonth = (submissionTimestamp.getMonth() + 1).toString();
        submissionMonth = submissionMonth.length > 1 ? submissionMonth : '0' + submissionMonth;
        let submissionDay = (submissionTimestamp.getDate()).toString();
        submissionDay = submissionDay.length > 1 ? submissionDay : '0' + submissionDay;
        const submissionDate = [submissionTimestamp.getFullYear(), submissionMonth, submissionDay].join('-');
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
        console.log(pending);
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
                updateMessage: '' // TODO change this to "Error" once the endpoint exists.
            };
        }
    }
}

export default ReportsAPI
