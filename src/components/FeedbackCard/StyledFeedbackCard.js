import styled from "styled-components";
import React from "react";

export const StyledSendButton = styled.button`
    width: 100%;
    background-color: #99FFA7;
    border-radius: 10px;
    color: #264C28;
    border: solid 1px #99FFA7;
    padding: 4px;
    
    &:focus {
        outline: none;
    }
`;

export const StyledFeedbackTextArea = styled.textarea`
    width: 100%;
    height: 200px;
    margin: 10px 0 10px 0;
    padding: 10px;
`;

export const StyledCardSubDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    
    svg {
      width: 20px;
      height: auto;
    }
`;

export const StyledCancelIconContainer = styled.div`
    position: absolute;
    top: 0px;
    right: 5px;
`;

export const StyledCardTitle = styled.h4`
    font-weight: bold;
    color: black;
`;

export const StyledErrorParagraph = styled.p`
    text-align: center;
    margin: 0px;
`;
