import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Row, Col, Button} from 'react-bootstrap';
import {MdArrowForward, MdPlace,} from "react-icons/md";

const Color = styled.div`
    border-radius: 50%;
    margin-right: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    color: white;
    font-weight: bold;
    text-align: center;
    color: ${props => props.score <= 4 ? "#63ab6e" : (props.score <= 10 ? "#aca566" : "#ac566d")};
    background-color: ${props => props.score <= 4 ? "#99FFA7" : (props.score <= 10 ? "#FFF896" : "#FF8AA9")};
`;

const SmallText = styled.p`
    color: gray;
    font-size: 14px;
    margin-bottom: 0;
`;

const OpenReportButton = styled.button`
  border:none;
  background-color: transparent;
  height: 100%;
  &:hover {
    transform: scale(1.2)
  }
`


const UserBasicData = ({id, age, name, city, score, showButton = true, onClickButton}) => {
    return (
        <Row>
            <Col xs={4} md={3}>
                <div className="d-flex">
                    <Color score={score}>{score}</Color>
                    <div>
                        <p className="mb-1"><strong>{name}</strong></p>
                        <SmallText>
                            <MdPlace/>
                            {city}
                        </SmallText>
                    </div>
                </div>
            </Col>
            <Col>{age} años</Col>
            <Col md={3} lg={2} className="d-none d-md-block">id {id}</Col>
            {showButton && (
                <Col xs="auto">
                    <OpenReportButton onClick={onClickButton}>
                        <MdArrowForward color={"#8c6380"}/>
                    </OpenReportButton>
                </Col>
            )}
        </Row>
    );
};

UserBasicData.propTypes = {
    id: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    showButton: PropTypes.bool,
    onClickButton: PropTypes.func
};

export default UserBasicData;
