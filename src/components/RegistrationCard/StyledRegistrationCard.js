import styled from "styled-components";

export const RegistrationCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const StyledCardDiv = styled.div`
    max-width: 600px;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 30px;
`;

export const StyledInputLabel = styled.label`
    font-weight: bold;
    margin: 0 10px 0 0;
    color: #2DD1E7;
    width: 100%;
`;

export const StyledInput = styled.input`
    width: 100%;
    margin: 0 0 20px 0;
    border: none;
    border-radius: 5px;
    text-transform: capitalize;
    padding: 5px;
    background-color: #f9f9f9;
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

export const StyledRegisteringLoader = styled.div`
    position: absolute;
    left: 49%;
    & > div {
      width: auto;
      height: auto;
    }
`;
