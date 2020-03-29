import React from 'react';
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import { ListGroupItem, Button, ButtonToolbar } from "react-bootstrap";

const UserDetailedSymptomsCard = ({score = "", age="",
                                   postalCode="", hasBeenTested="", testResult="",
                                   sex="", symptoms=["sim", 'sim2'], symptomStart= "",
                                   hasBeenInContactWithInfected="",
                                   bodyTemperature="", smokingHabit="",
                                   isolationStatus="", diagnosedWithOtherConditions="",
                                   submissionTimestamp=464964,
                                   phone=453553534, freq_card="", freq_resp="",
                                   oxygen_saturation=""}) => {
    //debugger;
    const list_symp = symptoms.map((symp, idx) => (
                    <ListGroupItem>Sintoma {idx}: {symp}</ListGroupItem>
                  ));

    return (
        <Card className="flush" style={{width: '40rem'}}>
            <Card.Header as="h5">Reporte</Card.Header>
            <Card.Body>
                <Card.Title><strong>Puntaje: </strong>{score}</Card.Title>
                   <Card.Text>
                    Las siguientes son las respuestas del paciente.
                  </Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Edad: {age}</ListGroupItem>
                    <ListGroupItem>Codigo Postal: {postalCode}</ListGroupItem>
                    <ListGroupItem>Ha sido testeado?: {hasBeenTested}</ListGroupItem>
                    <ListGroupItem>Resutado del Examen: {testResult}</ListGroupItem>
                    <ListGroupItem>Genero: {sex}</ListGroupItem>
                    <ListGroupItem><strong>Sintomas:</strong></ListGroupItem>
                    {list_symp}
                    <ListGroupItem>Fecha de inicio de Sintomas: {symptomStart}</ListGroupItem>
                    <ListGroupItem>Ha estado en contacto con alguien infectado?: {hasBeenInContactWithInfected}</ListGroupItem>
                    <ListGroupItem>Temperatura Corporal: {bodyTemperature}</ListGroupItem>
                    <ListGroupItem>Fuma?: {smokingHabit}</ListGroupItem>
                    <ListGroupItem>Estado de Isolación: {isolationStatus}</ListGroupItem>
                    <ListGroupItem>Tiene comorbilidades?: {diagnosedWithOtherConditions}</ListGroupItem>
                    <ListGroupItem>Fecha de Envio: {submissionTimestamp}</ListGroupItem>
                    <ListGroupItem>Telefono: {phone}</ListGroupItem>
                  </ListGroup>
            </Card.Body>
            <Card.Body>
                <Card.Text>
                  Los siguientes son los signos vitales del paciente: 
                </Card.Text>
                <ListGroup bg="primary" className="flush">
                    <ListGroupItem>Frecuencia Cardiaca: {freq_card}</ListGroupItem>
                    <ListGroupItem>Frecuencia Respiratoria: {freq_resp}</ListGroupItem>  
                    <ListGroupItem>Saturación de Oxigeno: {oxygen_saturation}</ListGroupItem>                
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

UserDetailedSymptomsCard.propTypes = {

};

export default UserDetailedSymptomsCard;