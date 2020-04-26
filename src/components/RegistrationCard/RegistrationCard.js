import React from "react";
import {
    StyledCardDiv,
    StyledInputLabel,
    StyledInput,
    StyledEmailInput,
    StyledFileInput, StyledCardTitle, StyledRegisterButton
} from "./StyledRegistrationCard";

const registrationCard = ({name, inputNameRef, lastName, inputLastNameRef, phoneNumber, inputPhoneNumberRef, email,
                           inputEmailRef, inputPersonalIdRef, inputProfessionalIdRef, onNameChanged, onLastNameChanged,
                           onPhoneNumberChanged, onEmailChanged, onPersonalIdChanged, onProfessionalIdChanged,
                           onRegisterClicked}) => {

    return (
        <StyledCardDiv>
            <StyledCardTitle>Registro de Médico Voluntario</StyledCardTitle>
            <StyledInputLabel>Nombre</StyledInputLabel>
            <StyledInput
                type="text"
                ref={inputNameRef}
                onChange={(event) => {onNameChanged(event.target.value)}}
                value={name}/>
            <StyledInputLabel>Apellidos</StyledInputLabel>
            <StyledInput
                type="text"
                ref={inputLastNameRef}
                onChange={(event) => {onLastNameChanged(event.target.value)}}
                value={lastName}/>
            <StyledInputLabel>Número de celular</StyledInputLabel>
            <StyledInput
                type="text"
                ref={inputPhoneNumberRef}
                onChange={(event) => {onPhoneNumberChanged(event.target.value)}}
                value={phoneNumber}/>
            <StyledInputLabel>Correo electrónico</StyledInputLabel>
            <StyledEmailInput
                type="text"
                ref={inputEmailRef}
                onChange={(event) => {onEmailChanged(event.target.value)}}
                value={email}/>
            <StyledInputLabel>Cédula de Ciudadanía/Extranjería</StyledInputLabel>
            <StyledFileInput
                type="file"
                ref={inputPersonalIdRef}
                onChange={(event) => {onPersonalIdChanged(event.target.value)}}/>
            <StyledInputLabel>Tarjeta Profesional</StyledInputLabel>
            <StyledFileInput
                type="file"
                ref={inputProfessionalIdRef}
                onChange={(event) => {onProfessionalIdChanged(event.target.value)}}/>
            <StyledRegisterButton onClick={onRegisterClicked}>Enviar</StyledRegisterButton>
        </StyledCardDiv>
    );
};

export default registrationCard;