import styled from "styled-components";

export const Container = styled.div`
    text-align: center;
    margin: 10px 0 30px 0;
`;

export const LogInButton = styled.button`
    width: 25%;
    background-color: #2DD1E7;
    border-radius: 10px;
    color: #FFFFFF;
    font-weight: bold;
    border: none;
    padding: 7px;
    margin: 0 0 10px 0;
    
    &:focus {
        outline: none;
    }
`;

export const LineSeparator = styled.hr`
    border: 0.7px solid #ccc;
    width: 50%;
`;