import React, {useEffect, useState} from 'react'
import DiagnosticCard from "../../components/DiagnosticCard/DiagnosticCard";
import NameAgeCard from "../../components/NameAgeCard/NameAgeCard";
import Timeline from "../../components/TimelineComponent/TimelineComponent";
import UserDetailedSymptomsCard from "../../components/UserDetailedSymptomsCard/UserDetailedSymptomsCard";
import CasesAPI from "../../services/CasesAPI";
import {useParams} from "react-router";
import ReportsAPI from "../../services/ReportsAPI";
import TelemetricAPI from "../../services/TelemetricAPI";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useAuth0} from "../../shared/Auth";
import DoctorUserCommunication from "../DoctorUserCommunication/DoctorUserCommunication";
import ConductCard from "../../components/ConductCard/ConductCard";

const CaseDetail = () => {

    const {loading, isAuthenticated, token, user} = useAuth0()
    const {id} = useParams()
    const [caseState, setCaseState] = useState([])
    const [report, setReport] = useState({})
    const [vitalSigns, setVitalSigns] = useState({});
    const [lastConduct, setLastConduct] = useState({
        conduct: '',
        date: ''
    });
    const [diagnosisAndConduct, setDiagnosisAndConduct] = useState({
        diagnosis: '',
        conduct: '',
        date: ''
    });
    const [diagnosisSaveDisabled, setDiagnosisSaveDisabled] = useState(true);
    const [conductSaveDisabled, setConductSaveDisabled] = useState(true);
    const [diagnosisSavingResultMessage, setDiagnosisSavingResultMessage] = useState(null);
    const [conductSavingResultMessage, setConductSavingResultMessage] = useState(null);

    useEffect(() => {
        const loadCaseState = async (id, token) => {
            const states = await CasesAPI.getStatesForCase(id, token)
            setCaseState(states)
        }
        if (isAuthenticated && token)
            loadCaseState(id, token)
    }, [id, isAuthenticated, token])

    useEffect(() => {
        const loadReportData = async (id, token) => {
            const userReport = await ReportsAPI.getReportForUser(id, token)
            setReport(userReport)
        }
        if (isAuthenticated && token)
            loadReportData(id, token)
    }, [id, isAuthenticated, token])

    useEffect(() => {
        const loadVitalSignsData = async (id, token) => {
            const userVitalSigns = await TelemetricAPI.getVitalSignsForUser(id, token);
            setVitalSigns(userVitalSigns)
        };
        if (isAuthenticated && token)
            loadVitalSignsData(id, token);
    }, [id, isAuthenticated, token])

    useEffect(() => {
        const loadLastConduct = async (patientId, token) => {
            const lastConduct = await CasesAPI.getLastConductForCase(patientId, token);
            setLastConduct(lastConduct);
        };
        if (isAuthenticated && token && Object.keys(report).length !== 0)
            loadLastConduct(report.patientId, token);
    }, [id, isAuthenticated, token, report])

    useEffect(() => {
        const loadDiagnosisAndConduct = async (id, token) => {
            const diagnosisAndConduct = await CasesAPI.getDiagnosisAndConductForCase(id, token);
            setDiagnosisAndConduct(diagnosisAndConduct);
        };
        if (isAuthenticated && token)
            loadDiagnosisAndConduct(id, token);
    }, [id, isAuthenticated, token])

    const caseStateHandler = async (index) => {
        const states = await CasesAPI.updateCaseState(id, index, token);
        setCaseState(states);
    };

    const onDiagnosisChange = (diagnosis) => {
        let newDiagnosisAndConduct = {...diagnosisAndConduct};
        newDiagnosisAndConduct.diagnosis = diagnosis;
        setDiagnosisAndConduct(newDiagnosisAndConduct);
        if (newDiagnosisAndConduct.diagnosis.trim() !== '') {
            setDiagnosisSaveDisabled(false);
        } else {
            setDiagnosisSaveDisabled(true);
        }
    };

    const onDiagnosisSaved = async () => {
        const response = await CasesAPI.updateDiagnosisAndConductForCase(user.sub, report.patientId, id,
            diagnosisAndConduct.diagnosis, diagnosisAndConduct.conduct, token);
        setDiagnosisSavingResultMessage(response.updateMessage);
    };

    const onConductChange = (conduct) => {
        let newDiagnosisAndConduct = {...diagnosisAndConduct};
        newDiagnosisAndConduct.conduct = conduct;
        setDiagnosisAndConduct(newDiagnosisAndConduct);
        if (newDiagnosisAndConduct.conduct.trim() !== '') {
            setConductSaveDisabled(false);
        } else {
            setConductSaveDisabled(true);
        }
    };

    const onConductSaved = async () => {
        const response = await CasesAPI.updateDiagnosisAndConductForCase(user.sub, report.patientId, id,
            diagnosisAndConduct.diagnosis, diagnosisAndConduct.conduct, token);
        setConductSavingResultMessage(response.updateMessage);
    };

    if (loading) return <div>Cargando...</div>

    return (
        <Container>
            <Timeline items={caseState} onClickState={caseStateHandler}/>
            <NameAgeCard
                id={id}
                name={report.name}
                city={report.city}
                age={report.age}
                score={report.score !== undefined ? report.score.covidScore : 0}/>
            <Row>
                <Col>
                    <UserDetailedSymptomsCard report={report} vitalSigns={vitalSigns}/>
                </Col>
                <Col>
                    <ConductCard
                        style={{gridAre: "lastConduct"}}
                        cardHeader="Última conducta"
                        readOnly={true}
                        conduct={lastConduct.conduct}
                        date={lastConduct.date}
                        showSaveButton={false}/>
                    <DoctorUserCommunication
                        doctorId={user.sub}
                        patientId={report.patientId}
                        token={token}/>
                    <DiagnosticCard
                        style={{gridAre: "diagnosis"}}
                        onDiagnosisChange={onDiagnosisChange}
                        diagnosis={diagnosisAndConduct.diagnosis}
                        date={diagnosisAndConduct.date}
                        onDiagnosisSaved={onDiagnosisSaved}
                        saveDisabled={diagnosisSaveDisabled}
                        savingResultMessage={diagnosisSavingResultMessage}/>
                    <ConductCard
                        style={{gridAre: "conduct"}}
                        onConductChange={onConductChange}
                        cardHeader="Conducta"
                        readOnly={false}
                        conduct={diagnosisAndConduct.conduct}
                        date={diagnosisAndConduct.date}
                        showSaveButton={true}
                        onConductSaved={onConductSaved}
                        saveDisabled={conductSaveDisabled}
                        savingResultMessage={conductSavingResultMessage}/>
                </Col>
            </Row>
        </Container>
    )
}

CaseDetail.propTypes = {}

export default CaseDetail
