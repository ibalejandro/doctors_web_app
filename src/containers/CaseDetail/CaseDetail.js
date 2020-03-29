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

    const { loading } = useAuth0()
    const {caseId} = useParams()
    const [caseState, setCaseState] = useState([])
    const [report, setReport] = useState({})

    useEffect(() => {
        const loadCaseState = async (caseId) => {
            const states = await CasesAPI.getStatesForCase(caseId)
            setCaseState(states)
        }
        loadCaseState()
    }, [caseId])

    useEffect(() => {
        const loadReportData = async (caseId) => {
            const userReport = await ReportsAPI.getReportForUser(caseId)
            setReport(userReport)
        }
        loadReportData()
    }, [caseId])

    if(loading) return <div>Loading...</div>

    return (
        <Container>
            <Timeline items={caseState}/>
            <NameAgeCard name={report.name} age={report.age} id_num={report.userId}/>
            <Row>
                <Col>
                    <UserDetailedSymptomsCard />
                </Col>
                <Col>
                    <DiagnosticCard style={{gridAre:"diagnosis"}} onDiagnosisChange={(diagnosis) => console.log(diagnosis.target.value)}/>
                    <ContactDataCard style={{gridAre:"contact-info"}} phone={report.phone}/>
                </Col>
            </Row>
        </Container>
    )
}

CaseDetail.propTypes = {}

export default CaseDetail
