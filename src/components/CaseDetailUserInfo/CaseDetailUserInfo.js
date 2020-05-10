import React from 'react';
import styled from "styled-components";
import {MdPlace} from "react-icons/md";

const CaseDetailUserInfoContainer = styled.div`
  display: flex;
  background-color: #f7f7f7;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
`

const Score = styled.div`
    justify-self: flex-end;
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

const Name = styled.div`
  font-size: 1.3em;
  flex-grow: 1;
`

const ColumnInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: gray;
`


const CaseDetailUserInfo = ({name, city, age, score}) => {
    return (
        <CaseDetailUserInfoContainer>
            <Name>
                <span>{name}</span>
            </Name>
            <ColumnInfo>
                <div>
                    <b>Edad:</b> <span>{age}</span>
                </div>
                <div className="d-flex align-items-center">
                    <MdPlace/>{city}
                </div>
            </ColumnInfo>
            <Score score={score}>
                {score}
            </Score>
        </CaseDetailUserInfoContainer>
    );
};

export default CaseDetailUserInfo;
