import React, {useEffect, useState} from 'react'
import ContactDataCard from "../../components/ContactDataCard/ContactDataCard";
import DiagnosticCard from "../../components/DiagnosticCard/DiagnosticCard";
import NameAgeCard from "../../components/NameAgeCard/NameAgeCard";
import Timeline from "../../components/TimelineComponent/TimelineComponent";
import UserDetailedSymptomsCard from "../../components/UserDetailedSymptomsCard/UserDetailedSymptomsCard";
import CasesAPI from "../../services/CasesAPI";
import {useParams} from "react-router";
import ReportsAPI from "../../services/ReportsAPI";
import styled from "styled-components";

const CaseDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 50px;
`

const GridContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 50% auto;
  grid-template-areas:
    "user-info user-info"
    "report-side diagnosis"
    "report-side contact-info"
`

const UserInfoContainer = styled.div`
  grid-area: user-info;
`

const ReportSideContainer = styled.div`
  grid-area: report-side;
`


const CaseDetail = () => {
    //TODO: LOAD FROM HISTORY PROPS THE PATH to get the caseId

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

    return (
        <CaseDetailContainer>
            <Timeline items={caseState}/>
            <GridContainer>
                <UserInfoContainer><NameAgeCard name={report.name} age={report.age} id_num={report.userId}/></UserInfoContainer>
                <ReportSideContainer><UserDetailedSymptomsCard/></ReportSideContainer>
                <DiagnosticCard style={{gridAre:"diagnosis"}} onDiagnosisChange={(diagnosis) => console.log(diagnosis.target.value)}/>
                <ContactDataCard style={{gridAre:"contact-info"}} phone={report.phone}/>
            </GridContainer>
        </CaseDetailContainer>
    )
}

CaseDetail.propTypes = {}

export default CaseDetail
