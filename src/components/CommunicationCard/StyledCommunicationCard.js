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
    background-color: ${props => props.callStyle ? "#99FFA7" : "#FF8AA9"};
    color: ${props => props.callStyle ? "#46784d" : "white"};
    padding: 8px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    
    &:hover {
        background-color: ${props => props.callStyle ? "#99FFA7" : "#FF8AA9"};
    }
    
    &:focus {
        outline: none;
    }
    
    svg {
      width: 25px;
      height: auto;
      fill: ${props => props.callStyle ? "#46784d" : "white"};
      justify-content: flex-start;
    }
    
    span {
      margin-left: 10px;
    }
    
`;

export const StyledVideoCallLink = styled.a`
    visibility: ${props => props.videoCallCode === null ? "hidden" : "visible"};
`;

export const StyledVideoCallCodeSpan = styled.span`
    font-weight: bold;
`;
