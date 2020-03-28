import React from 'react';
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";

const UserReportCard = ({sex, age}) => {
    return (
        <Card border="danger" style={{width: '18rem'}}>
            <Card.Header>{sex}</Card.Header>
            <Card.Body>
                <Card.Title><strong>Puntaje: 14</strong></Card.Title>

                <ul>
                    <li><strong>Edad:</strong>{age}</li>
                    <li><strong>Comorbilidades:</strong> EPOC</li>
                </ul>

            </Card.Body>
        </Card>
    );
};

UserReportCard.propTypes = {

};

export default UserReportCard;
