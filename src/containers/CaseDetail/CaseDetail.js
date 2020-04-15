import  React, {useEffect, useState} from 'react'
import ContactDataCard from "../../components/ContactDataCard/ContactDataCard";
import DiagnosticCard from "../../components/DiagnosticCard/DiagnosticCard";
import NameAgeCard from "../../components/NameAgeCard/NameAgeCard";
import Timeline from "../../components/TimelineComponent/TimelineComponent";
import UserDetailedSymptomsCard from "../../components/UserDetailedSymptomsCard/UserDetailedSymptomsCard";
import CasesAPI from "../../services/CasesAPI";
import {useParams} from "react-router";
import ReportsAPI from "../../services/ReportsAPI";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from "styled-components";
import {useAuth0} from "../../shared/Auth";

const CaseDetail = () => {
    //TODO: LOAD FROM HISTORY PROPS THE PATH to get the caseId

    const {loading, isAuthenticated, token} = useAuth0()
    const {id} = useParams()
    const [caseState, setCaseState] = useState([])
    const [report, setReport] = useState({})

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
            setReport(userReport)
        }
        loadReportData(id, token)
    }, [id])

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
                    <UserDetailedSymptomsCard />
                </Col>
                <Col>
                    <ContactDataCard style={{gridAre:"contact-info"}} phone={report.phone}/>
                    <DiagnosticCard style={{gridAre:"diagnosis"}} onDiagnosisChange={(diagnosis) => console.log(diagnosis.target.value)}/>
                </Col>
            </Row>
        </Container>
    )
}

CaseDetail.propTypes = {}

export default CaseDetail
