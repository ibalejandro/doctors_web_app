import styled from "styled-components";

export const Modal = styled.div`
    position: fixed;
    z-index: 500;
    background-color: white;
    width: 70%;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #e2e2e2;
    padding: 20px;
    left: 15%;
    top: 30%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    transform: ${props => props.show ? "translateY(0)" : "translateY(-100vh)"};
    opacity: ${props => props.show ? '1' : '0'};
    
    @media (min-width: 600px) {
        width: 500px;
        left: calc(50% - 250px);
    }
`;
