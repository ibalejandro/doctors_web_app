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
  background-color: ${(p) => p.disabled ? "#d2d2d2" : "#e2bed8"};
  height: 100%;
  &:hover {
    transform: ${p => p.disabled ? "": "scaleX(1.2)"};
  }
`

const CardRow = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
`

const ViewerList = styled.div`
  position: relative;
  height: 100%;
`

const Viewer = styled.div`
  position: absolute;
  background-image: url(${p => p.pic});
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: -20px;
  top: ${p => p.show ? "50%" : "-100%"};
  transition: top 0.5s;
  background-size: contain;
  background-color: grey;
`

const DataColumn = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  width: ${p => p.width || "100%"}
`

const ScoreDataColumn = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  width: 60px;
`

const BasicInfo = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`


const UserBasicData = ({
                           id,
                           age,
                           name,
                           city,
                           score,
                           showButton = true,
                           disableButton,
                           onClickButton,
                           viewer
                       }) => {

    return (
        <>
            <CardRow>
                <ScoreDataColumn>
                    <Color score={score}>{score}</Color>
                </ScoreDataColumn>
                <DataColumn>
                    <BasicInfo>
                        <p className="mb-1"><strong>{name}</strong></p>
                        <SmallText>
                            <MdPlace/>
                            {city}
                        </SmallText>
                    </BasicInfo>
                </DataColumn>
                <DataColumn style={{color: "gray"}}>{age} años</DataColumn>
                <DataColumn>
                    <ViewerList>
                        <Viewer show={viewer && viewer.doctorPicture}
                                pic={viewer && viewer.doctorPicture}/>
                    </ViewerList>
                </DataColumn>
                {showButton && (
                    <OpenReportButton xs="auto" onClick={onClickButton} disabled={disableButton}>
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
    disableButton: PropTypes.bool,
    onClickButton: PropTypes.func
};

export default UserBasicData;
