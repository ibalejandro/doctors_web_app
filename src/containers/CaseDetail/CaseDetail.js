import React, {useEffect, useRef, useState} from 'react'
import DiagnosticCard from "../../components/DiagnosticCard/DiagnosticCard";
import Timeline from "../../components/TimelineComponent/TimelineComponent";
import UserDetailedSymptomsCard from "../../components/UserDetailedSymptomsCard/UserDetailedSymptomsCard";
import CasesAPI from "../../services/CasesAPI";
import {useParams} from "react-router";
import ReportsAPI from "../../services/ReportsAPI";
import TelemetryAPI from "../../services/TelemetryAPI";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useAuth0} from "../../shared/Auth";
import DoctorUserCommunication from "../DoctorUserCommunication/DoctorUserCommunication";
import ConductCard from "../../components/ConductCard/ConductCard";
import {addViewerToReport} from "../../services/Firebase/FirebaseViewers";
import CaseDetailUserInfo from "../../components/CaseDetailUserInfo/CaseDetailUserInfo";

const CaseDetail = () => {

    const {loading, isAuthenticated, token, user} = useAuth0()
    const {id} = useParams()
    const [caseState, setCaseState] = useState({
        state: []
    });
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
    const [caseStateUpdatingResultMessage, setCaseStateUpdatingResultMessage] = useState(null);
    const [caseStateChangeLoading, setCaseStateChangeLoading] = useState(false);
    const firebaseViewerRef = useRef(null)

    useEffect(() => {
        const addViewer = async () => {
            const ref = await addViewerToReport({
                id,
                doctorId: user.sub,
                doctorPicture: user.picture,
                doctorName: user.nickname
            })
            firebaseViewerRef.current = ref
        }

        addViewer()

        return () => {
            firebaseViewerRef.current.remove()
        }

    }, [id, user.nickname, user.picture, user.sub])

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
            // console.log(userReport);
        }
        if (isAuthenticated && token)
            loadReportData(id, token)
    }, [id, isAuthenticated, token])

    useEffect(() => {
        const loadVitalSignsData = async (id, token) => {
            let newVitalSigns = {...vitalSigns};
            const heartRateAndOxygenSaturation
                = await TelemetryAPI.getHeartRateAndOxygenSaturation(report.videoUrl, token);
            const breathingFrequency = await TelemetryAPI.getBreathingFrequency(report.audioUrl, token);
            newVitalSigns.heartRate = heartRateAndOxygenSaturation.heartRate;
            newVitalSigns.oxygenSaturation = heartRateAndOxygenSaturation.oxygenSaturation;
            newVitalSigns.breathingFrequency = breathingFrequency.breathingFrequency;
            setVitalSigns(newVitalSigns);
        };
        if (isAuthenticated && token && Object.keys(report).length !== 0)
            loadVitalSignsData(id, token);
    }, [id, isAuthenticated, token, report, vitalSigns]);

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
        if (!caseStateChangeLoading) {
            setCaseStateChangeLoading(true);
            const states = await CasesAPI.updateCaseState(id, caseState.state, index, token);
            if (states.updateMessage === '') {
                const reportPendingStateUpdate = await ReportsAPI.updateReportPendingState(id, states.state, token);
                if (reportPendingStateUpdate.updateMessage === '') {
                    setCaseState({
                        state: states.state
                    });
                    setCaseStateUpdatingResultMessage(reportPendingStateUpdate.updateMessage);
                } else {
                    setCaseStateUpdatingResultMessage(reportPendingStateUpdate.updateMessage);
                }
            } else {
                setCaseStateUpdatingResultMessage(states.updateMessage);
            }
            setCaseStateChangeLoading(false);
        }
    };

    const onDiagnosisChange = (diagnosis) => {
        let newDiagnosisAndConduct = {...diagnosisAndConduct, diagnosis};
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
        let newDiagnosisAndConduct = {...diagnosisAndConduct, conduct};
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
            <Timeline
                items={caseState.state}
                onClickState={caseStateHandler}
                updatingResultMessage={caseStateUpdatingResultMessage}
                caseStateChangeLoading={caseStateChangeLoading}/>
            <CaseDetailUserInfo
                id={id}
                name={report.name}
                city={report.city}
                age={report.age}
                score={report.score ? report.score.covidScore : 0}
            />
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
