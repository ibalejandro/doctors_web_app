import React from 'react';
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components';

const NameAgeCard = ({name="Juan Sebastian Jaramillo", age="", id_num="", className}) => {
    return (
        <Accordion defaultActiveKey="0" className={className}>
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

const StyledCard = styled(NameAgeCard)`
  margin-bottom: 20px;
`;

export default StyledCard;
