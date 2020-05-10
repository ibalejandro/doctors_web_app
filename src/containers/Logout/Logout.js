import React, {useEffect} from 'react';
import styled from "styled-components";
import {withRouter} from "react-router";
import {useAuth0} from "../../shared/Auth";

const LogoutContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Logout = () => {

    const {isAuthenticated, logout} = useAuth0()

    useEffect(() => {
        let redirectTimeout = null
        if (isAuthenticated) {
            logout({})
            redirectTimeout = setTimeout(() => {
                window.location = '/'
            }, 5000)
            return () => {
                clearTimeout(redirectTimeout)
            }
        }
    }, [isAuthenticated])

    return (
        <LogoutContainer>
            <div>
                <h1>Cerrando sesión 👩‍⚕🩺️👨‍⚕️ </h1>
                <p>redirigiendo...</p>
            </div>
        </LogoutContainer>
    );
};

export default withRouter(Logout);
