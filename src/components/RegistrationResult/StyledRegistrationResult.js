import styled from "styled-components";

export const StyledUnderstoodButton = styled.button`
    width: 100%;
    background-color: ${props => props.errorStyle ? "#FF8AA9" : "#99FFA7"};
    border-radius: 10px;
    color: ${props => props.errorStyle ? "#990000" : "#264C28"};
    border: ${props => props.errorStyle ? "solid 1px #FF8AA9" : "solid 1px #99FFA7"};
    padding: 4px;
    
    &:focus {
        outline: none;
    }
`;