import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Accordion, Card, Row, Col } from 'react-bootstrap';
import UserBasicData from '../UserBasicData/UserBasicData';
import styled from "styled-components";

const CardHeader = styled.div`
  background-color: #f9f9f9;
`

const UserReportCard = ({id, age, name, city, score, comorbidity, symptoms, index }) => {

    const covidScore = score && score.covidScore ? score.covidScore : 0

    let history = useHistory();
    const onClickButton = (id) => {
        const newPath = "/reports/" + id.id;
        history.push(newPath);
        //e.stopPropagation();
    };

    return (
        <Card style={{border: "none", borderRadius: "10px"}} className="mb-2">
            <Accordion.Toggle as={CardHeader} eventKey={index}>
                <UserBasicData
                    id={id}
                    age={age}
                    name={name}
                    city={city}
                    score={covidScore}
                    showButton={true}
                    onClickButton={() => {onClickButton({id})}}
                />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index}>
                <Card.Body>
                    <Row>
                        <Col>
                            <h5>Comorbilidades</h5>
                            {Object.keys(comorbidity).reduce((acc, curr, index) => {
                                if(comorbidity[curr]) {
                                    acc.push(<p key={`com-${index}`}>{curr}</p>);
                                }
                                return acc;
                            }, [])}
                        </Col>
                        <Col>
                            <h5>Epidemiología</h5>
                        </Col>
                        <Col>
                            <h5>Síntomas</h5>
                            {Object.keys(symptoms).reduce((acc, curr, index) => {
                                if(symptoms[curr]) {
                                    acc.push(<p key={`sym-${index}`}>{curr}</p>);
                                }
                                return acc;
                            }, [])}
                        </Col>
                    </Row>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};

UserReportCard.propTypes = {
    id: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    comorbidity: PropTypes.object,
    symptoms: PropTypes.object,
    index: PropTypes.number.isRequired
};

export default UserReportCard;
