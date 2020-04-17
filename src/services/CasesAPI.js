import axios from "axios";

const DOCTORS_API_URL = process.env.REACT_APP_DOCTORS_API_URL;
let timeLineItems = [
    {
        name: 'Reporte revisado',
        active: false,
    },
    {
        name: 'Paciente contactado al celular',
        active: false,
    },
    {
        name: 'Videollamada realizada',
        active: false,
    },
    {
        name: 'Diagnóstico realizado',
        active: false,
    },
    {
        name: 'Conducta definida',
        active: false,
    }
];

class CasesAPI {
    static async getStatesForCase(caseId, token) {
        return timeLineItems;
    }

    static async getDiagnosisAndConductForCase(caseId, token) {
        return {
            caseId: "id",
            diagnosis: "No presenta diagnóstico crítico.",
            conduct: "Se le indica al paciente seguir las recomendaciones de autocuidado."
        }
    }

    static async getLastConductForCase(patientId, token) {
        try {
            const response = await axios({
                url: DOCTORS_API_URL + '/diagnostic/',
                params: {
                    "patient_id": patientId,
                    "last_conduct": true
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: 'get'
            });
            const userCase = response.data;
            return {
                conduct: userCase.message.conduct,
                date: this.getLastConductDate(userCase.message._diagnostic_date)
            };
        } catch (error) {
            console.error(error);
            return {
                conduct: '',
                date: ''
            }
        }
    }

    static async updateCaseState(caseId, index, token) {
        let newTimeLineItems = [...timeLineItems];
        if (newTimeLineItems[index].active) {
            // Change state to inactive.
            for (let i = index; i < newTimeLineItems.length; i++) {
                newTimeLineItems[i].active = false;
            }
        }
        else {
            // Change state to active.
            for (let i = 0; i <= index; i++) {
                newTimeLineItems[i].active = true;
            }
        }
        return newTimeLineItems;
    }

    static async updateDiagnosisAndConductForCase(caseId, diagnosis, conduct, token) {
        return {
            caseId: "id",
            diagnosis: diagnosis,
            conduct: conduct
        }
    }

    static async createVideoCallCode(doctorId, patientId, token) {
        try {
            const response = await axios({
                url: DOCTORS_API_URL + '/appointment',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    "doctor_id": doctorId,
                    "patient_id": patientId
                },
                method: 'post'
            });
            const appointment = response.data;
            return {
                videoCallCode: appointment.message.videocall_code
            };
        } catch (error) {
            console.error(error);
            return {
                videoCallCode: null
                // videoCallCode: Math.random().toString().substring(2, 5) + Math.random().toString().substring(12, 15)
            }
        }
    }

    static getLastConductDate(date) {
        const lastConductTimestamp = new Date(Date.parse(date));
        let lastConductMonth = (lastConductTimestamp.getMonth() + 1).toString();
        lastConductMonth = lastConductMonth.length > 1 ? lastConductMonth : '0' + lastConductMonth;
        let lastConductDay = (lastConductTimestamp.getDate()).toString();
        lastConductDay = lastConductDay.length > 1 ? lastConductDay : '0' + lastConductDay;
        const lastConductDate = [lastConductTimestamp.getFullYear(), lastConductMonth, lastConductDay].join('-');
        return lastConductDate;
    }
}

export default CasesAPI;
