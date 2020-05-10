import React from 'react';
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import './ContactDataCard.css'

const ContactDataCard = ({phone="+57-310-333-3333"}) => {
    return (
        <Card>
          <Card.Header><strong>Datos de contacto</strong></Card.Header>
          <Card.Body>
            <Card.Title className="text-center">Teléfono de contacto: {phone}</Card.Title>
            <div className="center-comp">
              <ListGroup horizontal>
                <ListGroup.Item variant="dark"><img src={require("./img/whatsapp.png")} width="50" alt="Wazap"/></ListGroup.Item>
                <ListGroup.Item variant="success"><img src={require("./img/gmail.png")} width="50" alt="Gmail"/></ListGroup.Item>
                <ListGroup.Item><img src={require("./img/phone.png")} width="50" alt="Phone"/></ListGroup.Item>
              </ListGroup>
            </div>
          </Card.Body>
        </Card>
    );
};

ContactDataCard.propTypes = {
  phone: PropTypes.string
};

export default ContactDataCard;