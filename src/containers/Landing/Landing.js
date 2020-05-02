import React, {useEffect} from "react";
import {useAuth0} from "../../shared/Auth";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import LandingMainContent from "../../components/LandingMainContent/LandingMainContent";

const LandingContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  height: 100vh;
  @media (max-width: 900px) {
    height: 100%;
    flex-direction: column;
  }
`

const Landing = () => {

    const {loading, isAuthenticated, token} = useAuth0();
    let history = useHistory();

    useEffect(() => {
        if (isAuthenticated && token) {
            history.push("/reports");
        }
    }, [isAuthenticated, token]);

    if (loading || (isAuthenticated && token)) return <div>Cargando...</div>;

    return (
        <LandingContainer>
            <LandingSidebar/>
            <LandingMainContent></LandingMainContent>
        </LandingContainer>
    );
};

export default Landing;
