import styled from "styled-components";

export const StyledCardDiv = styled.div`
    width: 100%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
`;

export const StyledCardSubDiv = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CommunicationButton = styled.button`
    text-align: start;
    width: 300px;
    margin-bottom: 10px;
    padding: 8px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    
    &:focus {
        outline: none;
    }
    
    svg {
      width: 25px;
      height: auto;
      justify-content: flex-start;
    }
    
    span {
      margin-left: 10px;
    }
    
    &.communication-button-phone {
      color: ${props => props.callStyle ? "#264c28" : "#FFF"};
      background-color: ${props => props.callStyle ? "#99FFA7" : "#FF8AA9"};
    }
    
    &.communication-button-phone svg {
      width: 20px;
      fill: ${props => props.callStyle ? "#264c28" : "#FFF"};
    }
    
    &.communication-button-call {
      color: #702f8c;
      background-color: ${props => props.callStyle ? "#f4d1ff" : "#FF8AA9"};
    }
    
    &.communication-button-call svg {
      fill: blueviolet;
    }
`;


export const StyledVideoCallLink = styled.a`
    visibility: ${props => props.videoCallCode === null ? "hidden" : "visible"};
`;

export const StyledVideoCallCodeSpan = styled.span`
    font-weight: bold;
`;
