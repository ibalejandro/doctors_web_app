import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form } from 'react-bootstrap';

const DiagnosticCard = ({onDiagnosisChange}) => {
    return (
      <Card className="mb-4">
        <Card.Header><strong>Diagnóstico</strong></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows="3" onChange={onDiagnosisChange}/>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
};

DiagnosticCard.propTypes = {
  onDiagnosisChange: PropTypes.func
};

export default DiagnosticCard;
