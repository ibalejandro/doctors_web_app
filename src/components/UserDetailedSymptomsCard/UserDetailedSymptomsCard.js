import React from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import {ListGroupItem} from "react-bootstrap";
import ReportsAPI from "../../services/ReportsAPI";

const UserDetailedSymptomsCard = ({report, vitalSigns}) => {

    if (Object.keys(report).length === 0) {
        return null;
    }

    report = ReportsAPI.getResultsToDisplay(report);
    let symptomsList = null;
    let comorbiditiesList = null;
    if (report !== undefined) {
        symptomsList = report.symptoms.map((symp, idx) => (
            <ListGroupItem key={idx}>{symp}</ListGroupItem>
        ));
        comorbiditiesList = report.diagnosedWith.map((comorb, idx) => (
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
                    <ListGroupItem><strong>Sexo:</strong> {report.sex}</ListGroupItem>
                    <ListGroupItem><strong>Está en embarazo:</strong> {report.isPregnant}</ListGroupItem>
                    <ListGroupItem><strong>Contacto estrecho con alguien infectado o
                        sospechoso:</strong> {report.hasBeenInContactWithInfected}</ListGroupItem>
                    <ListGroupItem><strong>Sometido a prueba de COVID-19:</strong> {report.hasBeenTested}
                    </ListGroupItem>
                    <ListGroupItem><strong>Resultado de la prueba de COVID-19:</strong> {report.testResult}
                    </ListGroupItem>
                </ListGroup>
            </Card.Body>
            <Card.Body>
                <Card.Title>
                    <strong>Síntomas</strong>
                </Card.Title>
                <ListGroup bg="primary" className="flush">
                    {symptomsList}
                    <ListGroupItem><strong>Fecha de inicio de síntomas:</strong> {report.symptomStart}</ListGroupItem>
                    <ListGroupItem><strong>Temperatura corporal:</strong> {report.bodyTemperature}</ListGroupItem>
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
                    <ListGroupItem><strong>Fuma:</strong> {report.smokingHabit}</ListGroupItem>
                    <ListGroupItem><strong>Motivo de aislamiento:</strong> {report.isolationStatus}</ListGroupItem>
                    <ListGroupItem><strong>Fecha de diligenciamiento:</strong> {report.submissionTimestamp}
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

UserDetailedSymptomsCard.propTypes = {};

export default UserDetailedSymptomsCard;
