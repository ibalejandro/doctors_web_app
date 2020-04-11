import styled from "styled-components";

export const StyledCardDiv = styled.div`
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
    @media (min-width: 500px) {
        width: 500px;
    } 
`;

export const StyledCardSubDiv = styled.div`
    padding: 16px;
`;

export const StyledCallButton = styled.button`
    background-color: ${props => props.callStyle ? "#33ffa5" : "#ec3636"};
    border: 1px solid #000000;
    padding: 8px;
    margin: 1px 15px 0 15px;
    cursor: pointer;
    border-radius: 10px;
    &:hover {
        background-color: ${props => props.callStyle ? "#33ffd7" : "#ffcccb"};
    }
    &:focus {
        outline: none;
    }
`;

export const StyledVideoCallButton = styled.button`
    background-color: #338aff;
    border: 1px solid #000000;
    padding: 8px;
    margin: 1px 15px 0 15px;
    cursor: pointer;
    border-radius: 10px;
    &:hover {
        background-color: #36c0e6;
    }
    &:focus {
        outline: none;
    }
`;

export const StyledCallIcon = styled.img`
    width: 50px;
`;

export const StyledVideoCallLink = styled.a`
    visibility: ${props => props.videoCallCode === null ? "hidden" : "visible"};
`;

export const StyledVideoCallCodeSpan = styled.span`
    font-weight: bold;
`;