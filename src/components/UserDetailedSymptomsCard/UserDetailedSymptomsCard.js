import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import {ListGroupItem} from "react-bootstrap";
import ReportsAPI from "../../services/ReportsAPI";

const UserDetailedSymptomsCard = ({report, vitalSigns}) => {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const data = ReportsAPI.getResultsToDisplay(report);
        setReportData(data);
    }, [report]);

    if (Object.keys(report).length === 0) {
        return null;
    }

    let symptomsList = null;
    let comorbiditiesList = null;
    if (reportData) {
        symptomsList = reportData.symptoms.map((symp, idx) => (
            <ListGroupItem key={idx}>{symp}</ListGroupItem>
        ));
        comorbiditiesList = reportData.diagnosedWith.map((comorb, idx) => (
            <ListGroupItem key={idx}>{comorb}</ListGroupItem>
        ));
    }

    return (
        <Card className="flush mb-4">
            <Card.Header><strong>Reporte</strong></Card.Header>
            <Card.Body>
                <Card.Title>
                    <strong>Información general</strong>
                </Card.Title>
                <ListGroup bg="primary" className="flush">
                    <ListGroupItem><strong>Sexo:</strong> {reportData.sex}</ListGroupItem>
                    <ListGroupItem><strong>Está en embarazo:</strong> {reportData.isPregnant}</ListGroupItem>
                    <ListGroupItem><strong>Contacto estrecho con alguien infectado o
                        sospechoso:</strong> {reportData.hasBeenInContactWithInfected}</ListGroupItem>
                    <ListGroupItem><strong>Sometido a prueba de COVID-19:</strong> {reportData.hasBeenTested}
                    </ListGroupItem>
                    <ListGroupItem><strong>Resultado de la prueba de COVID-19:</strong> {reportData.testResult}
                    </ListGroupItem>
                </ListGroup>
            </Card.Body>
            <Card.Body>
                <Card.Title>
                    <strong>Síntomas</strong>
                </Card.Title>
                <ListGroup bg="primary" className="flush">
                    {symptomsList}
                    <ListGroupItem><strong>Fecha de inicio de síntomas:</strong> {reportData.symptomStart}</ListGroupItem>
                    <ListGroupItem><strong>Temperatura corporal:</strong> {reportData.bodyTemperature}</ListGroupItem>
                </ListGroup>
            </Card.Body>
            <Card.Body>
                <Card.Title>
                    <strong>Comorbilidades</strong>
                </Card.Title>
                <ListGroup bg="primary" className="flush">
                    {comorbiditiesList}
                </ListGroup>
            </Card.Body>
            <Card.Body>
                <Card.Title>
                    <strong>Información adicional</strong>
                </Card.Title>
                <ListGroup bg="primary" className="flush">
                    <ListGroupItem><strong>Fuma:</strong> {reportData.smokingHabit}</ListGroupItem>
                    <ListGroupItem><strong>Motivo de aislamiento:</strong> {reportData.isolationStatus}</ListGroupItem>
                    <ListGroupItem><strong>Fecha de diligenciamiento:</strong> {reportData.submissionTimestamp}
                    </ListGroupItem>
                </ListGroup>
            </Card.Body>
            <Card.Body>
                <Card.Title>
                    <strong>Signos vitales</strong>
                </Card.Title>
                <ListGroup bg="primary" className="flush">
                    <ListGroupItem><strong>Frecuencia cardíaca:</strong> {vitalSigns.heartRate}</ListGroupItem>
                    <ListGroupItem><strong>Frecuencia respiratoria:</strong> {vitalSigns.breathingFrequency}
                    </ListGroupItem>
                    <ListGroupItem><strong>Saturación de oxígeno:</strong> {vitalSigns.oxygenSaturation}</ListGroupItem>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

UserDetailedSymptomsCard.propTypes = {
    report: PropTypes.shape({
        symptoms: PropTypes.object,
        diagnosedWith: PropTypes.object,
        sex: PropTypes.string,
        isPregnant: PropTypes.bool,
        hasBeenInContactWithInfected: PropTypes.bool,
        hasBeenTested: PropTypes.bool,
        testResult: PropTypes.string,
        symptomStart: PropTypes.string,
        bodyTemperature: PropTypes.string,
        smokingHabit: PropTypes.string,
        isolationStatus: PropTypes.string,
        submissionTimestamp: PropTypes.string,
    }),
    vitalSigns: PropTypes.shape({
        heartRate: PropTypes.string,
        breathingFrequency: PropTypes.string,
        oxygenSaturation: PropTypes.string
    })
};

export default UserDetailedSymptomsCard;
