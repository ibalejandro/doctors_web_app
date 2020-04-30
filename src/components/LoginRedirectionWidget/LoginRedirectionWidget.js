import React from "react";
import {Container, LineSeparator, LogInButton} from "./StyledLoginRedirectionWidget";

const loginRedirectionWidget = ({onLogInClicked}) => {
    return (
        <Container>
            <LogInButton onClick={onLogInClicked}>Iniciar sesión</LogInButton>
            <LineSeparator/>
        </Container>
    );
};

export default loginRedirectionWidget;