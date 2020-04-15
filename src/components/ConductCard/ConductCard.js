import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form } from 'react-bootstrap';

const ConductCard = ({onConductChange, readOnly, cardHeader, lastConduct}) => {
    return (
        <Card className={readOnly ? "mb-4" : "mb-4 mt-4"}>
            <Card.Header><strong>{cardHeader}</strong></Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            className="text-body"
                            as="textarea"
                            rows="3"
                            onChange={onConductChange}
                            readOnly={readOnly}
                            value={lastConduct}/>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

ConductCard.propTypes = {
    onConductChange: PropTypes.func
};

export default ConductCard;
