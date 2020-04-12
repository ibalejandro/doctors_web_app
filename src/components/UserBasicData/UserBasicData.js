import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Button } from 'react-bootstrap';
import { MdArrowForward, MdPlace,  } from "react-icons/md";

const Color = styled.div`
    border-radius: 50%;
    margin-right: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    color: white;
    font-weight: bold;
    text-align: center;
    background-color: ${props => props.score <= 15 ? "green" : (props.score <= 30 ? "yellow" : "red")};
`;

const SmallText = styled.p`
    color: gray;
    font-size: 14px;
    margin-bottom: 0;
`;

const UserBasicData = ({ citizenId, age, name, city, score, showButton = true, onClickButton }) => {
    return (
        <Row>
            <Col xs={4} md={3}>
                <div className="d-flex">
                    <Color score={score}>{score}</Color>
                    <div>
                        <p className="mb-1"><strong>{name}</strong></p>
                        <SmallText>
                            <MdPlace />
                            {city}
                        </SmallText>
                    </div>
                </div>
            </Col>
            <Col>{age} años</Col>
            <Col md={3} lg={2} className="d-none d-md-block">C.C. {citizenId}</Col>
            {showButton && (
                <Col xs="auto">
                    <Button onClick={onClickButton}>
                        <MdArrowForward />
                    </Button>
                </Col>
            )}
        </Row>
    );
};

UserBasicData.propTypes = {
    citizenId: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    showButton: PropTypes.bool,
    onClickButton: PropTypes.func
};

export default UserBasicData;
