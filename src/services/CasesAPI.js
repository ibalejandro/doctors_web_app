    const timeLineItems = [
        {
            name: 'Reporte Revisado',
            active: true,
        },
        {
            name: 'Paciente Contactado (pre-cita)',
            active: true,
        },
        {
            name: 'Videollamada realizada',
            active: true,
        },
        {
            name: 'Diagnostico realizado',
            active: true,
        }
    ]

class CasesAPI {
    static async getStatesForCase(caseId) {
        return timeLineItems
    }

    static async getDiagnosisForCase(caseId) {

        return {
            caseId: "id",
            diagnosis: "No tiene nada"
        }
    }

    static async updateDiagnosisForCase(caseId, diagnosis) {
        return {
            caseId: "id",
            diagnosis: diagnosis
        }
    }

    static async updateCaseState(caseId, {index, state}) {
        timeLineItems[index].state = state
        return timeLineItems
    }


}

export default CasesAPI
