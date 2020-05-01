import React from 'react';
import styled from "styled-components";
import DoctorRegistration from "../../containers/DoctorRegistration/DoctorRegistration";

const ContentTitle = styled.div`
  margin-top: 100px;
`

const BasicInfoParagraph = styled.p`
    color: #717171;
    text-align: justify;
    display: inline-block;
    font-size: 1.3em;
    margin: 30px 30px;
`

const ThankParagraph = styled.p`
  color: black;
  text-align: center;
  font-size: 1.5em;
`

const UsersLink = styled.a`
  color: #2DD1E7;
  &:hover{
    color: #2DD1E7;
  }
  &:link{
    color: #2DD1E7;
  }
`

const LandingMainContentContainer = styled.div`
    flex: 1 1 auto;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const RegistrationForm = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`

const RegistrationTitle = styled.h3``

const Spacer = styled.div`
  flex-grow: 1;
`

const Content = styled.div`
  max-width: 800px;
`

const LandingMainContent = () => {
    return (
        <LandingMainContentContainer>
            <Content>
                <ContentTitle/>
                <BasicInfoParagraph>
                    Para mitigar la propagación del COVID-19 es necesario que las personas eviten salir de sus casas, a
                    menos que su estado de salud amerite atención hospitalaria. <b>Por este motivo, esta plataforma
                    permite
                    a
                    los médicos voluntarios realizar revisiones en línea de los usuarios que reportan su estado de salud
                    en <UsersLink href="http://5vid.co" target="_blank">5vid.co</UsersLink> </b> y contactarlos por
                    videollamada
                    para llevar a cabo la clasificación inicial del riesgo. <b>El objetivo no es, de ninguna manera,
                    diagnosticar la presencia del virus, sino orientar a los usuarios con el concepto de personal
                    idóneo.</b>
                </BasicInfoParagraph>

                <BasicInfoParagraph>
                    <b>El médico voluntario no tendrá la responsabilidad de gestionar toma de muestras ni ordenar
                        exámenes.
                        Tampoco deberá cumplir un horario de atención.</b> Solamente se espera que, en el tiempo que
                    tenga
                    disponible, pueda poner su profesionalismo al servicio de la comunidad durante esta pandemia.
                </BasicInfoParagraph>

                <ThankParagraph>
                    <b>¡Gracias por su labor! 👏</b>
                </ThankParagraph>

                <RegistrationForm>
                    <DoctorRegistration/>
                </RegistrationForm>
            </Content>
        </LandingMainContentContainer>
    );
};

export default LandingMainContent;
