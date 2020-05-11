import React from 'react';
import styled from "styled-components";
import background from './background.svg'
import {useAuth0} from "../../shared/Auth";
import logo from './logo.svg';
import Feedback from "../../containers/Feedback/Feedback";

const LandingSidebarContainer = styled.div`
  background-color: #8A7BEC;
  background-size: 500px;
  background-image: url("${background}");
  background-repeat: no-repeat;
  background-position: bottom;
  flex-grow: 1;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 50px;
  max-width: 500px;
  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
  }
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
`

const TitleWrapper = styled.div`
  text-align: end;
`

const Title = styled.h1`
margin-bottom: 0;
  font-size: 3.3em;
  font-weight: 800;
`

const Subtitle = styled.span`
  display: block;
 font-size: 1.3em;
 font-weight: 600;
`

const LoginButton = styled.button`
  font-size: 1.3em;
  border: none;
  background-color: #2BD1E7;
  padding: 10px 30px;
  &:focus {outline: none};
  color: white;
  font-weight: 600;
  border-radius: 5px;
  max-width: 300px;
  margin-top: 30px;
  width: 250px;
  @media (min-width: 900px) {
    margin-top: 20%;
  }
`

const HowItWorks = styled.a`
  text-align: center;
  width: 250px;
  color: white;
  font-size: 1.3em;
  border: none;
  background-color: #ad9fff;
  padding: 10px 30px;
  &:focus {outline: none};
  font-weight: 600;
  border-radius: 5px;
  max-width: 300px;
  margin-top: 10px;
  text-decoration: none;
  &:hover {
  text-decoration: none;
    color: white;
  }
`

const Spacer = styled.div`
flex-grow: 1;
`

const MadeIn = styled.span`
  margin-top: 10px;
  color: white;
  align-self: center;
  padding-left: 10px;
  margin-bottom: 10px;
`

const LandingSidebar = () => {
    const {loginWithRedirect} = useAuth0();

    return (
        <LandingSidebarContainer>
            <TitleContainer>
                <TitleWrapper>
                    <Title>
                        Doctores
                    </Title>
                    <Subtitle>
                        <img src={logo} alt="5vid"/>
                        5vid
                    </Subtitle>
                </TitleWrapper>
            </TitleContainer>
            <LoginButton onClick={loginWithRedirect}>Iniciar sesión</LoginButton>
            <HowItWorks href="https://www.youtube.com/watch?v=QZUcViUc5PU" target="_blank" rel="noopener">¿Cómo funciona?</HowItWorks>
            <Spacer/>
            <Feedback/>
            <MadeIn>Con <span role="img" aria-label="heart"> ❤️</span> para Colombia</MadeIn>
        </LandingSidebarContainer>
    );
};

export default LandingSidebar;
