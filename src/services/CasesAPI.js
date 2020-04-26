import axios from "axios";

const DOCTORS_API_URL = process.env.REACT_APP_DOCTORS_API_URL;
const timeLineItems = [
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
        try {
            const response = await axios({
                url: DOCTORS_API_URL + '/report',
                params: {
                    "report_id": caseId,
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: 'get'
            });
            const userCaseState = response.data;
            return {
                state: userCaseState.message.statuses
            };
        } catch (error) {
            console.error(error);
            return {
                state: timeLineItems
            };
        }
    }

    static async getDiagnosisAndConductForCase(caseId, token) {
        try {
            const response = await axios({
                url: DOCTORS_API_URL + '/diagnostic',
                params: {
                    "report_id": caseId,
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: 'get'
            });
            const userCase = response.data;
            return {
                diagnosis: userCase.message[0].diagnose,
                conduct: userCase.message[0].conduct,
                date: this.getDiagnosisDate(userCase.message[0]._diagnostic_date)
            };
        } catch (error) {
            console.error(error);
            return {
                diagnosis: '',
                conduct: '',
                date: ''
            };
        }
    }

    static async getLastConductForCase(patientId, token) {
        try {
            const response = await axios({
                url: DOCTORS_API_URL + '/diagnostic',
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
                conduct: userCase.message[0].conduct,
                date: this.getDiagnosisDate(userCase.message[0]._diagnostic_date)
            };
        } catch (error) {
            console.error(error);
            return {
                conduct: '',
                date: ''
            };
        }
    }

    static async updateCaseState(caseId, currentState, index, token) {
        const newTimeLineItems = this.getNewTimeLineItems(currentState, index);
        try {
            const response = await axios({
                url: DOCTORS_API_URL + '/report',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    "report_id": caseId,
                    "statuses": newTimeLineItems
                },
                method: 'put'
            });
            return {
                state: newTimeLineItems,
                updateMessage: ''
            };
        } catch (error) {
            console.error(error);
            return {
                state: currentState,
                updateMessage: "Error"
            };
        }
    }

    static async updateDiagnosisAndConductForCase(doctorId, patientId, caseId, diagnosis, conduct, token) {
        try {
            const response = await axios({
                url: DOCTORS_API_URL + '/diagnostic',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    "doctor_id": doctorId,
                    "patient_id": patientId,
                    "report_id": caseId,
                    "diagnose": diagnosis,
                    "conduct": conduct
                },
                method: 'put'
            });
            return {
                updateMessage: "Guardado"
            };
        } catch (error) {
            console.error(error);
            return {
                updateMessage: "Error"
            };
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
            };
        }
    }

    static getDiagnosisDate(date) {
        const diagnosisTimestamp = new Date(Date.parse(date));
        let diagnosisMonth = (diagnosisTimestamp.getMonth() + 1).toString();
        diagnosisMonth = diagnosisMonth.length > 1 ? diagnosisMonth : '0' + diagnosisMonth;
        let diagnosisDay = (diagnosisTimestamp.getDate()).toString();
        diagnosisDay = diagnosisDay.length > 1 ? diagnosisDay : '0' + diagnosisDay;
        const diagnosisDate = [diagnosisTimestamp.getFullYear(), diagnosisMonth, diagnosisDay].join('-');
        return diagnosisDate;
    }

    static getNewTimeLineItems(currentState, index) {
        // Deep copy of currentState object.
        let newTimeLineItems = JSON.parse(JSON.stringify(currentState))
        if (newTimeLineItems[index].active) {
            // Change state to inactive.
            for (let i = index; i < newTimeLineItems.length; i++) {
                newTimeLineItems[i].active = false;
            }
        } else {
            // Change state to active.
            for (let i = 0; i <= index; i++) {
                newTimeLineItems[i].active = true;
            }
        }
        return newTimeLineItems;
    }

    static async registerVolunteerDoctor(name, lastName, phoneNumber, email, personalId, professionalId) {
        try {
            const response = await axios({
                url: DOCTORS_API_URL + '/doctor',
                data: {
                    "first_name": name,
                    "last_name": lastName,
                    "cellphone": phoneNumber,
                    "email": email,
                    "official_id_photo": personalId,
                    "professional_card_photo": professionalId,
                },
                method: 'post'
            });
            const doctor = response.data;
            return {
                doctorRegistered: true
            };
        } catch (error) {
            console.error(error);
            return {
                doctorRegistered: false
            };
        }
    }
}

export default CasesAPI;
