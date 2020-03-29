import React from 'react';
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import { ListGroupItem, Button, ButtonToolbar, FormControl } from "react-bootstrap";
import { Container, Row, Col } from 'reactstrap';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


const DiagnosticCard = () => {
    //debugger;
    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Diagnostico del Paciente:</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
      </Form>
    );
};

DiagnosticCard.propTypes = {

};

export default DiagnosticCard;