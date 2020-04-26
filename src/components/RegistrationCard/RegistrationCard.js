import React from "react";
import {
    StyledCardDiv,
    StyledInputLabel,
    StyledInput,
    StyledEmailInput,
    StyledFileInput, StyledCardTitle, StyledRegisterButton
} from "./StyledRegistrationCard";

const registrationCard = ({name, nameError, inputNameRef, lastName, lastNameError, inputLastNameRef, phoneNumber,
                           phoneNumberError, inputPhoneNumberRef, email, emailError, inputEmailRef, personalIdError,
                           inputPersonalIdRef, professionalIdError, inputProfessionalIdRef, onNameChanged,
                           onLastNameChanged, onPhoneNumberChanged, onEmailChanged, onPersonalIdChanged,
                           onProfessionalIdChanged, onRegisterClicked}) => {

    return (
        <StyledCardDiv>
            <StyledCardTitle>Registro de Médico Voluntario</StyledCardTitle>
            <StyledInputLabel>Nombre</StyledInputLabel>
            <small>{nameError}</small>
            <StyledInput
                type="text"
                ref={inputNameRef}
                onChange={(event) => {onNameChanged(event.target.value)}}
                value={name}/>
            <StyledInputLabel>Apellidos</StyledInputLabel>
            <small>{lastNameError}</small>
            <StyledInput
                type="text"
                ref={inputLastNameRef}
                onChange={(event) => {onLastNameChanged(event.target.value)}}
                value={lastName}/>
            <StyledInputLabel>Número de celular</StyledInputLabel>
            <small>{phoneNumberError}</small>
            <StyledInput
                type="text"
                ref={inputPhoneNumberRef}
                onChange={(event) => {onPhoneNumberChanged(event.target.value)}}
                value={phoneNumber}/>
            <StyledInputLabel>Correo electrónico</StyledInputLabel>
            <small>{emailError}</small>
            <StyledEmailInput
                type="text"
                ref={inputEmailRef}
                onChange={(event) => {onEmailChanged(event.target.value)}}
                value={email}/>
            <StyledInputLabel>Cédula de Ciudadanía/Extranjería</StyledInputLabel>
            <small>{personalIdError}</small>
            <StyledFileInput
                type="file"
                ref={inputPersonalIdRef}
                onChange={(event) => {onPersonalIdChanged(event.target.value)}}/>
            <StyledInputLabel>Tarjeta Profesional</StyledInputLabel>
            <small>{professionalIdError}</small>
            <StyledFileInput
                type="file"
                ref={inputProfessionalIdRef}
                onChange={(event) => {onProfessionalIdChanged(event.target.value)}}/>
            <StyledRegisterButton onClick={onRegisterClicked}>Enviar</StyledRegisterButton>
        </StyledCardDiv>
    );
};

export default registrationCard;