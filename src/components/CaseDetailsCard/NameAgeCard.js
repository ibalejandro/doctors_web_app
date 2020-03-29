import React from 'react';
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import { ListGroupItem, Button, ButtonToolbar } from "react-bootstrap";
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Container, Row, Col } from 'reactstrap';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';

const NameAgeCard = ({name="Juan Sebastian Jaramillo", age="", id_num=""}) => {
    //debugger;
    return (
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  {name} (Edad: {age} años)
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Numero de Identificacion: {id_num}</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
    );
};

NameAgeScoreCard.propTypes = {

};

export default NameAgeCard;