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
            diagnosis: "No tiene nada",
            conduct: "No hacer nada"
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
}

export default CasesAPI;
