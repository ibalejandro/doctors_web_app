import styled from "styled-components";

export const FeedbackContainer = styled.div`
    text-align: center;
    margin: 0 0 30px 0;
`;

export const FeedbackButton = styled.button`
    justify-content: center;
    width: 70%;
    background-color: #2BD1E7;
    border-radius: 10px;
    color: #FFFFFF;
    font-weight: bold;
    border: solid 2px;
    padding: 7px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;