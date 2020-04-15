import  React, {useEffect, useState} from 'react'
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

    const {loading, isAuthenticated, token} = useAuth0()
    const {id} = useParams()
    const [caseState, setCaseState] = useState([])
    const [report, setReport] = useState({})
    const [vitalSigns, setVitalSigns] = useState({});
    const [lastConduct, setLastConduct] = useState('');

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
        }
        loadVitalSignsData(id, token);
    }, [id]);

    useEffect(() => {
        const loadLastConduct = async (id, token) => {
            const lastConduct = await CasesAPI.getLastConductForCase(id, token);
            setLastConduct(lastConduct.lastConduct);
        }
        loadLastConduct(id, token);
    }, [id]);

    const caseStateHandler = async (index) => {
        const states = await CasesAPI.updateCaseState(id, index, token);
        setCaseState(states);
    };

    if (loading) return <div>Cargando...</div>

    return (
        <Container>
            <Timeline items={caseState} onClickState={caseStateHandler}/>
            <NameAgeCard name={report.name} city={report.city} age={report.age} id_num={report.userId}/>
            <Row>
                <Col>
                    <UserDetailedSymptomsCard report={report} vitalSigns={vitalSigns}/>
                </Col>
                <Col>
                    <ConductCard
                        style={{gridAre:"lastConduct"}}
                        cardHeader="Última conducta"
                        readOnly={true}
                        lastConduct={lastConduct}/>
                    <DoctorUserCommunication userContactNumber={report.phone}/>
                    <DiagnosticCard
                        style={{gridAre:"diagnosis"}}
                        onDiagnosisChange={(diagnosis) => console.log(diagnosis.target.value)}/>
                    <ConductCard
                        style={{gridAre:"conduct"}}
                        onConductChange={(conduct) => console.log(conduct.target.value)}
                        cardHeader="Conducta"
                        readOnly={false}/>
                </Col>
            </Row>
        </Container>
    )
}

CaseDetail.propTypes = {}

export default CaseDetail
