import React, {useCallback, useState} from "react";
import {
    StyledCardDiv,
    StyledInputLabel,
    StyledInput,
    StyledEmailInput,
    StyledCardTitle,
    StyledRegisterButton,
    StyledRegisteringLoader,
    RegistrationCardContainer,
    InputColumn
} from "./StyledRegistrationCard";
import MoonLoader from "react-spinners/MoonLoader";
import {useDropzone} from "react-dropzone";
import styled from "styled-components";

const DropZoneArea = styled.div`
  cursor: pointer;
  border: 2px dashed ${p => !p.ready ? "#2BD1E7":"#1ee18b"};
  color: ${p => !p.ready ? "#2BD1E7":"#1ee18b"};
  border-radius: 5px;
  margin: 15px 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  p {
    margin: 0;
    max-width: 200px;
    text-align: center;
  }
`

const DoctorIdContainer = styled.div`
  flex-grow: 1;
`

const FileDropzone = ({title, onFilesDropped}) => {
    const [fileDropped, setFileDropped] = useState(false)
    const [fileName, setFileName] = useState("")

    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles && acceptedFiles.length > 0) {
            onFilesDropped(acceptedFiles[0])
            setFileDropped(true)
            setFileName(acceptedFiles[0].name)
        }
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <DropZoneArea {...getRootProps()} ready={fileDropped}>
            <input {...getInputProps()}/>
            <p>{title}.</p>
            <p>(puede ser la foto)</p>
            <span>{fileName}</span>
        </DropZoneArea>
    )
}

const registrationCard = ({
                              name, nameError, inputNameRef, lastName, lastNameError, inputLastNameRef, phoneNumber,
                              phoneNumberError, inputPhoneNumberRef, email, emailError, inputEmailRef, personalIdError,
                              inputPersonalIdRef, professionalIdError, inputProfessionalIdRef, disableRegister,
                              registerLoading, onNameChanged, onLastNameChanged, onPhoneNumberChanged, onEmailChanged,
                              onPersonalIdChanged, onProfessionalIdChanged, onRegisterClicked
                          }) => {

    return (
        <RegistrationCardContainer>
            <StyledCardDiv>
                <StyledCardTitle>Regístrate como médico voluntario</StyledCardTitle>
                <StyledInputLabel>Nombre</StyledInputLabel>
                <small>{nameError}</small>
                <StyledInput
                    type="text"
                    ref={inputNameRef}
                    onChange={(event) => {
                        onNameChanged(event.target.value)
                    }}
                    value={name}/>
                <StyledInputLabel>Apellidos</StyledInputLabel>
                <small>{lastNameError}</small>
                <StyledInput
                    type="text"
                    ref={inputLastNameRef}
                    onChange={(event) => {
                        onLastNameChanged(event.target.value)
                    }}
                    value={lastName}/>

                <InputColumn>
                    <div className="column flex-grow-1">
                        <StyledInputLabel>Número de celular</StyledInputLabel>
                        <small>{phoneNumberError}</small>
                        <StyledInput
                            type="text"
                            ref={inputPhoneNumberRef}
                            onChange={(event) => {
                                onPhoneNumberChanged(event.target.value)
                            }}
                            value={phoneNumber}/>
                    </div>
                    <div className="column flex-grow-1 ml-3">
                        <StyledInputLabel>Correo electrónico</StyledInputLabel>
                        <small>{emailError}</small>
                        <StyledEmailInput
                            type="text"
                            ref={inputEmailRef}
                            onChange={(event) => {
                                onEmailChanged(event.target.value)
                            }}
                            value={email}/>
                    </div>
                </InputColumn>
                <InputColumn>
                    <DoctorIdContainer ref={inputPersonalIdRef}>
                        <small>{personalIdError}</small>
                        <FileDropzone
                            reference={inputPersonalIdRef}
                            title={"Carga tu cédula"}
                            onFilesDropped={onPersonalIdChanged}
                        />
                    </DoctorIdContainer>
                    <DoctorIdContainer ref={inputProfessionalIdRef}>
                        <small>{professionalIdError}</small>
                        <FileDropzone
                            reference={inputProfessionalIdRef}
                            title={"Carga tu tarjeta profesional"}
                            onFilesDropped={onProfessionalIdChanged}
                        />
                    </DoctorIdContainer>
                </InputColumn>
                <StyledRegisterButton disabled={disableRegister}
                                      onClick={onRegisterClicked}>Enviar</StyledRegisterButton>
                <StyledRegisteringLoader>
                    <MoonLoader size={30} color={"#9B70FF"} loading={registerLoading}/>
                </StyledRegisteringLoader>
            </StyledCardDiv>
        </RegistrationCardContainer>
    );
};


export default registrationCard;
