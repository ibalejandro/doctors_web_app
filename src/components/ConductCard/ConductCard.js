import React from 'react';
import PropTypes from 'prop-types';
import {Card, Form} from 'react-bootstrap';

const ConductCard = ({onConductChange, readOnly, cardHeader, conduct, showSaveButton, onConductSaved, saveDisabled,
                         date, savingResultMessage}) => {
    const conductChangeHandler = (event) => {
        onConductChange(event.target.value);
    };

   date = date !== '' ? '(' + date + ')' : date;

    return (
        <Card className={readOnly ? "mb-4" : "mb-4 mt-4"}>
            <Card.Header><strong>{cardHeader}</strong> {date}</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group controlId="conduct-text-area-container">
                        <Form.Control
                            className="text-body"
                            as="textarea"
                            rows="3"
                            onChange={conductChangeHandler}
                            readOnly={readOnly}
                            value={conduct}/>
                        {showSaveButton && (
                            <div className="float-right">
                                <button
                                    type="button"
                                    className="btn btn-primary mt-4"
                                    onClick={onConductSaved}
                                    disabled={saveDisabled}>Guardar
                                </button>
                                <p className="text-center">{savingResultMessage}</p>
                            </div>
                        )}
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
