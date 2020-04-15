import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form } from 'react-bootstrap';

const DiagnosticCard = ({onDiagnosisChange}) => {
    return (
      <Card className="mb-4 mt-4">
        <Card.Header><strong>Diagnóstico</strong></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control className="text-body" as="textarea" rows="9" onChange={onDiagnosisChange}/>
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
