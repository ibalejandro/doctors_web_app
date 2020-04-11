import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Accordion, Card, Row, Col, Button } from 'react-bootstrap';
import { MdArrowForward, MdPlace,  } from "react-icons/md";

const Color = styled.div`
    border-radius: 50%;
    margin-right: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    color: white;
    font-weight: bold;
    text-align: center;
    background-color: ${props => props.score <= 15 ? "green" : (props.score <= 30 ? "yellow" : "red")};
`;

const SmallText = styled.p`
    color: gray;
    font-size: 14px;
    margin-bottom: 0;
`;

const UserReportCard = ({ citizenId, age, name, city, score, comorbidity, symptoms, index }) => {
    const onClickButton = (e) => {
        e.stopPropagation();
    };

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={index}>
                <Row>
                    <Col xs={4} md={3} lg={2}>
                        <div className="d-flex">
                            <Color score={score}>{score}</Color>
                            <div>
                                <p className="mb-1"><strong>{name}</strong></p>
                                <SmallText>
                                    <MdPlace />
                                    {city}
                                </SmallText>
                            </div>
                        </div>
                    </Col>
                    <Col>{age} años</Col>
                    <Col md={3} lg={2} className="d-none d-md-block">C.C. {citizenId}</Col>
                    <Col xs="auto">
                        <Button onClick={onClickButton}>
                            <MdArrowForward />
                        </Button>
                    </Col>
                </Row>
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
    citizenId: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    comorbidity: PropTypes.object,
    symptoms: PropTypes.object,
    index: PropTypes.number.isRequired
};

export default UserReportCard;
