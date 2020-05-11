import styled from "styled-components";

export const FeedbackContainer = styled.div`
    text-align: center;
    margin: 0 0 30px 0;
    width: 100%;
`;

export const FeedbackButton = styled.button`
    &:focus {
        outline: none;
    }
    svg{
      margin-right: 10px;
    }
    font-size: 1em;
    border: none;
    background-color: #323232;
    padding: 10px 30px;
    color: white;
    font-weight: 600;
    border-radius: 5px;
    max-width: 300px;
    margin-top: 30px;
    width: 250px;
`;
