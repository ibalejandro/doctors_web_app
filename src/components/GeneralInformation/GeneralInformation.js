import React from "react";
import {
    BasicInfoDiv,
    BasicInfoParagraph,
    BasicInfoSubDiv,
    BasicInfoTitle,
    SideFigure,
    UsersLink
} from "./StyledGeneralInformation";
import AppLogo from "./assets/logo.png";
import Stethoscope from "./assets/stethoscope.png";
import Solidarity from "./assets/solidarity.png";

const generalInformation = () => {
    return (
        <BasicInfoDiv>
            <img src={AppLogo} alt="5vid"/>
            <BasicInfoTitle>Doctores 5vid</BasicInfoTitle>
            <BasicInfoSubDiv>
                <SideFigure>
                    <img src={Stethoscope} alt="stethoscope"/>
                </SideFigure>
                <BasicInfoParagraph>
                    Para mitigar la propagación del COVID-19 es necesario que las personas eviten salir de sus casas, a
                    menos que su estado de salud amerite atención hospitalaria. Por este motivo, esta plataforma
                    permite a los médicos voluntarios realizar revisiones en línea de los usuarios que reportan su
                    estado de salud en <UsersLink href="http://www.5vid.co" target="_blank">5vid.co</UsersLink> y
                    contactarlos por videollamada para llevar a cabo la clasificación inicial del riesgo. Se aclara que
                    el objetivo no es, de ninguna manera, diagnosticar la presencia del virus, sino orientar a los
                    usuarios con el concepto de personal idóneo.
                </BasicInfoParagraph>
            </BasicInfoSubDiv>
            <BasicInfoSubDiv>
                <SideFigure>
                    <img src={Solidarity} alt="solidarity"/>
                </SideFigure>
                <BasicInfoParagraph>
                    El médico voluntario no tendrá la responsabilidad de gestionar toma de muestras ni ordenar exámenes.
                    Tampoco deberá cumplir un horario de atención. Solamente se espera que, en el tiempo que tenga
                    disponible, pueda poner su profesionalismo al servicio de la comunidad durante esta pandemia.
                    ¡Gracias por tu colaboración!
                </BasicInfoParagraph>
            </BasicInfoSubDiv>
        </BasicInfoDiv>
    );
};

export default generalInformation;
