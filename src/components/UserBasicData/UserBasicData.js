import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Col} from 'react-bootstrap';
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
  background-color: #e2bed8;
  height: 100%;
  &:hover {
    transform: scale(1.2)
  }
`

const CardRow = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
`


const UserBasicData = ({id, age, name, city, score, showButton = true, onClickButton}) => {
    return (
        <>
            <CardRow>
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
                <Col style={{color: "gray"}}>{age} años</Col>
                <Col style={{color: "gray"}} md={3} lg={2}
                     className="d-none d-md-block">id.{id.substr(id.length - 5, 4)}</Col>
                {showButton && (
                    <OpenReportButton xs="auto" onClick={onClickButton}>
                        <MdArrowForward color={"#8c6380"}/>
                    </OpenReportButton>
                )}
            </CardRow>
        </>
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
