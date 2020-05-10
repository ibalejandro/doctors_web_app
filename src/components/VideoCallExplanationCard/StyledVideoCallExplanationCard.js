import styled from "styled-components";

export const StyledCardDiv = styled.div`
    width: 100%;
    margin: 16px auto 22px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px 30px 16px 30px;
    text-align: center;
`;

export const StyledCardTitle = styled.h4`
    margin: 0 20px 0 0;
`;

export const StyledCardSubDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 0 20px 0;
    
    svg {
      width: 25px;
      height: auto;
      fill: blueviolet;
    }
`;

export const StyledVideoDiv = styled.div`
    display: ${props => props.showVideo ? "block" : "none"};
`;