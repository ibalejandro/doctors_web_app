import React from 'react';
import Form from 'react-bootstrap/Form';


const DiagnosticCard = ({onDiagnosisChange}) => {
    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Diagnostico del Paciente:</Form.Label>
          <Form.Control as="textarea" rows="3" onChange={onDiagnosisChange}/>
        </Form.Group>
      </Form>
    );
};

DiagnosticCard.propTypes = {

};

export default DiagnosticCard;
