import React, {useEffect, useState} from 'react'
import ContactDataCard from "../../components/ContactDataCard/ContactDataCard";
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
import styled from "styled-components";
import {useAuth0} from "../../shared/Auth";
import DoctorUserCommunication from "../DoctorUserCommunication/DoctorUserCommunication";
import ConductCard from "../../components/ConductCard/ConductCard";

const CaseDetail = () => {
    //TODO: LOAD FROM HISTORY PROPS THE PATH to get the caseId

    const {loading, isAuthenticated, token, user} = useAuth0()
    const {id} = useParams()
    const [caseState, setCaseState] = useState([])
    const [report, setReport] = useState({})
    const [vitalSigns, setVitalSigns] = useState({});
    const [lastConduct, setLastConduct] = useState('');
    const [diagnosisAndConduct, setDiagnosisAndConduct] = useState({});
    const [diagnosisSaveDisabled, setDiagnosisSaveDisabled] = useState(true);
    const [conductSaveDisabled, setConductSaveDisabled] = useState(true);

    useEffect(() => {
        const loadCaseState = async (id, token) => {
            const states = await CasesAPI.getStatesForCase(id, token)
            setCaseState(states)
        }
        loadCaseState(id, token)
    }, [id])

    useEffect(() => {
        const loadReportData = async (id, token) => {
            const userReport = await ReportsAPI.getReportForUser(id, token)
            console.log(userReport);
            setReport(userReport)
        }
        loadReportData(id, token)
    }, [id])

    useEffect(() => {
        const loadVitalSignsData = async (id, token) => {
            const userVitalSigns = await TelemetricAPI.getVitalSignsForUser(id, token);
            console.log(userVitalSigns);
            setVitalSigns(userVitalSigns)
        };
        loadVitalSignsData(id, token);
    }, [id]);

    useEffect(() => {
        const loadLastConduct = async (id, token) => {
            const lastConduct = await CasesAPI.getLastConductForCase(id, token);
            setLastConduct(lastConduct.lastConduct);
        };
        loadLastConduct(id, token);
    }, [id]);

    useEffect(() => {
        const loadDiagnosisAndConduct = async (id, token) => {
            const diagnosisAndConduct = await CasesAPI.getDiagnosisAndConductForCase(id, token);
            setDiagnosisAndConduct(diagnosisAndConduct);
        };
        loadDiagnosisAndConduct(id, token);
    }, [id]);

    const caseStateHandler = async (index) => {
        const states = await CasesAPI.updateCaseState(id, index, token);
        setCaseState(states);
    };

    const onDiagnosisChange = (diagnosis) => {
        let newDiagnosisAndConduct = {...diagnosisAndConduct};
        newDiagnosisAndConduct["diagnosis"] = diagnosis;
        setDiagnosisAndConduct(newDiagnosisAndConduct);
        if (newDiagnosisAndConduct.diagnosis.trim() !== '') {
            setDiagnosisSaveDisabled(false);
        }
        else {
            setDiagnosisSaveDisabled(true);
        }
    };

    const onDiagnosisSaved = async () => {
        await CasesAPI
            .updateDiagnosisAndConductForCase(id, diagnosisAndConduct.diagnosis, diagnosisAndConduct.conduct, token);
    };

    const onConductChange = (conduct) => {
        let newDiagnosisAndConduct = {...diagnosisAndConduct};
        newDiagnosisAndConduct["conduct"] = conduct;
        setDiagnosisAndConduct(newDiagnosisAndConduct);
        if (newDiagnosisAndConduct.conduct.trim() !== '') {
            setConductSaveDisabled(false);
        }
        else {
            setConductSaveDisabled(true);
        }
    };

    const onConductSaved = async () => {
        await CasesAPI
            .updateDiagnosisAndConductForCase(id, diagnosisAndConduct.diagnosis, diagnosisAndConduct.conduct, token);
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
                        conduct={lastConduct}
                        showSaveButton={false}/>
                    <DoctorUserCommunication userContactNumber={report.phone} doctorId={user.sub}/>
                    <DiagnosticCard
                        style={{gridAre: "diagnosis"}}
                        onDiagnosisChange={onDiagnosisChange}
                        diagnosis={diagnosisAndConduct.diagnosis}
                        onDiagnosisSaved={onDiagnosisSaved}
                        saveDisabled={diagnosisSaveDisabled}/>
                    <ConductCard
                        style={{gridAre: "conduct"}}
                        onConductChange={onConductChange}
                        cardHeader="Conducta"
                        readOnly={false}
                        conduct={diagnosisAndConduct.conduct}
                        showSaveButton={true}
                        onConductSaved={onConductSaved}
                        saveDisabled={conductSaveDisabled}/>
                </Col>
            </Row>
        </Container>
    )
}

CaseDetail.propTypes = {}

export default CaseDetail
