import styled from "styled-components";

export const RegistrationCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 40px;
`

export const StyledCardDiv = styled.div`
  max-width: 689px;  
`;

export const StyledInputLabel = styled.label`
    font-weight: bold;
    margin: 0 10px 0 0;
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
    &:focus {
        outline-color: ${props => props.errorMessage ? "#D93025" : null};
    }
`;

export const InputColumn = styled.div`
  display: flex;
  flex-direction: row;
  div.column {
    flex-basis: 50%;
  }
`

export const StyledEmailInput = styled(StyledInput)`
    text-transform: lowercase;
`;

export const StyledFileInput = styled(StyledInput)`
    padding: 0px;
`;

export const StyledCardTitle = styled.h3`
    margin: 0 0 15px 0;
`;

export const StyledRegisterButton = styled.button`
  display: flex;
  justify-content: center;
    width: 100%;
    background-color: #8A7BEC;
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

export const StyledRegisteringLoader = styled.div`
  margin-left: 10px;
    & > div {
      width: auto;
      height: auto;
    }
`;

export const StyledRequiredSignSpan = styled.span`
    color: #D93025;
`;

export const StyledRequiredSignLabel = styled.div`
    color: #D93025;
    margin: 0 0 50px 0;
`;
