import styled from "styled-components";

export const StyledCardDiv = styled.div`
    width: 50%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 25px;
`;

export const StyledInputLabel = styled.label`
    font-weight: bold;
    margin: 0 10px 0 0;
    color: #2DD1E7;
`;

export const StyledInput = styled.input`
    width: 100%;
    margin: 0 0 20px 0;
    border: none;
    border: solid 2px #ccc;
    border-radius: 5px;
    text-transform: capitalize;
    padding: 5px;
`;

export const StyledEmailInput = styled(StyledInput)`
    text-transform: lowercase;
`;

export const StyledFileInput = styled(StyledInput)`
    padding: 0px;
`;

export const StyledCardTitle = styled.h2`
    margin: 0 0 15px 0;
`;

export const StyledRegisterButton = styled.button`
    width: 100%;
    background-color: blueviolet;
    border-radius: 10px;
    color: #FFFFFF;
    font-weight: bold;
    border: solid 2px;
    padding: 7px;
    
    &:focus {
        outline: none;
    }
`;