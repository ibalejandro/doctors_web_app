import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Accordion, Card, Row, Col } from 'react-bootstrap';
import UserBasicData from '../UserBasicData/UserBasicData';
import styled from "styled-components";
import ReportsAPI from '../../services/ReportsAPI';

const CardHeader = styled.div`
  background-color: #f9f9f9;
`

const UserReportCard = ({
    id,
    age,
    name,
    city,
    score,
    diagnosedWith,
    symptoms,
    index,
    hasBeenInContactWithInfected,
    disabled,
    viewer
}) => {
    const covidScore = score && score.covidScore ? score.covidScore : 0

    let history = useHistory();
    const onClickButton = (id) => {
        const newPath = "/reports/" + id;
        history.push(newPath);
    };

    const [epidemiologicalLink, setEpidemiologicalLink] = useState('');
    const [symptomsList, setSymptomsList] = useState([]);
    const [diagnosedList, setDiagnosedList] = useState([]);

    useEffect(() => {
        setEpidemiologicalLink(ReportsAPI.getHasBeenInContactWithInfected(hasBeenInContactWithInfected));
        setSymptomsList(ReportsAPI.getSymptoms(symptoms));
        setDiagnosedList(ReportsAPI.getComorbidities(diagnosedWith));
    }, [hasBeenInContactWithInfected, symptoms, diagnosedWith]);

    return (
        <Card style={{border: "none", borderRadius: "10px"}} className="mb-2">
            <Accordion.Toggle disable as={CardHeader} eventKey={index}>
                <UserBasicData
                    age={age}
                    name={name}
                    city={city}
                    score={covidScore}
                    disableButton={disabled}
                    onClickButton={() => {onClickButton(id)}}
                    viewer={viewer}
                />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index}>
                <Card.Body>
                    <Row>
                        <Col>
                            <h5>Nexo epidemiológico</h5>
                            <p>{epidemiologicalLink}</p>
                        </Col>
                        <Col>
                            <h5>Síntomas</h5>
                            {symptomsList.map((curr, index) => <p key={`sym-${index}`}>{curr}</p>)}
                        </Col>
                        <Col>
                            <h5>Comorbilidades</h5>
                            {diagnosedList.map((curr, index) => <p key={`com-${index}`}>{curr}</p>)}
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
    score: PropTypes.object.isRequired,
    diagnosedWith: PropTypes.object,
    symptoms: PropTypes.object,
    index: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    viewer: PropTypes.object
};

export default UserReportCard;
