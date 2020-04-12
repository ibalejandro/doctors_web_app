import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card, Row, Col } from 'react-bootstrap';
import UserBasicData from '../UserBasicData/UserBasicData';

const UserReportCard = ({ citizenId, age, name, city, score, comorbidity, symptoms, index }) => {
    const onClickButton = (e) => {
        e.stopPropagation();
    };

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={index}>
                <UserBasicData
                    citizenId={citizenId}
                    age={age}
                    name={name}
                    city={city}
                    score={score}
                    showButton={true}
                    onClickButton={onClickButton}
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
    citizenId: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    comorbidity: PropTypes.object,
    symptoms: PropTypes.object,
    index: PropTypes.number.isRequired
};

export default UserReportCard;
