import React from "react";
import {useAuth0} from "../../shared/Auth";
import LoginRedirectionWidget from "../../components/LoginRedirectionWidget/LoginRedirectionWidget";

const LoginRedirection = () => {

    const {loginWithRedirect} = useAuth0();

    const redirectToLogin = async () => {
        loginWithRedirect();
    };

    return (
        <LoginRedirectionWidget onLogInClicked={redirectToLogin}/>
    );
};

export default LoginRedirection;