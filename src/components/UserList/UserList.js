import React from 'react'
// import UserReportCard from "../UserReportCard/UserReportCard";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

const Color = styled.div`
    width: 25px;
    height: 25px;
    color: white;
    font-weight: bold;
    text-align: center;
    background-color: ${props => props.score <= 15 ? "green" : (props.score <= 30 ? "yellow" : "red")};
`;

function UserList({reports}) {
    const userReport = reports.map((report, index) => {
        const r = report[0];
    	return (
            <Card key={r.citizenId}>
                <Accordion.Toggle as={Card.Header} eventKey={index}>
                    <Row>
                        <Col xs="auto">
                            <Color score={r.score}>{r.score}</Color>
                        </Col>
                        <Col xs="auto">{r.name}</Col>
                        <Col>(Edad: {r.age})</Col>
                        <Col xs="auto">{r.city}</Col>
                        <Col xs="auto">{r.citizenId}</Col>
                    </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                <Card.Body>
                    <Row>
                        <Col>
                            <h5>Síntomas</h5>
                            {Object.keys(r.symptoms).reduce((acc, curr, index) => {
                                if(r.symptoms[curr]) {
                                    acc.push(<p key={`symptom${index}`}>{curr}</p>);
                                }
                                return acc;
                            }, [])}
                        </Col>
                        <Col>
                            <h5>Comorbilidades</h5>
                            {Object.keys(r.comorbidity).reduce((acc, curr, index) => {
                                if(r.comorbidity[curr]) {
                                    acc.push(<p key={`comorb${index}`}>{curr}</p>);
                                }
                                return acc;
                            }, [])}
                        </Col>
                    </Row>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    })

    return (
        <Accordion defaultActiveKey="0">
            {userReport}
        </Accordion>
    );
}

export default UserList;
