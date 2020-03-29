import React from 'react';
import Card from "react-bootstrap/Card";

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

NameAgeCard.propTypes = {

};

export default NameAgeCard;
