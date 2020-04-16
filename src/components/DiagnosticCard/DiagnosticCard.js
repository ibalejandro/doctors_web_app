import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form } from 'react-bootstrap';

const DiagnosticCard = ({onDiagnosisChange, diagnosis, onDiagnosisSaved, saveDisabled}) => {
    const diagnosisChangeHandler = (event) => {
        onDiagnosisChange(event.target.value);
    };

    return (
      <Card className="mb-4 mt-4">
        <Card.Header><strong>Diagnóstico</strong></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                  className="text-body"
                  as="textarea"
                  rows="9"
                  onChange={diagnosisChangeHandler}
                  value={diagnosis}/>
              <div className="float-right">
                  <button
                      type="button"
                      className="btn btn-primary mt-4"
                      onClick={onDiagnosisSaved}
                      disabled={saveDisabled}>Guardar
                  </button>
              </div>
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
