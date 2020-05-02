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
  border: 2px dashed ${p => !p.ready ? p.borderColor : "#1ee18b"};
  color: ${p => !p.ready ? p.borderColor : "#1ee18b"};
  border-radius: 5px;
  margin: 15px 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 130px;
  
  p {
    margin: 0;
    max-width: 300px;
    text-align: center;
    padding: 4px;
  }
  
  span {
    margin: 0;
    max-width: 300px;
    text-align: center;
    padding: 4px;
  }
`

const DoctorIdContainer = styled.div`
  flex-grow: 1;
`

const FileDropzone = ({title, onFilesDropped, borderColor = "#2BD1E7"}) => {
    const [fileDropped, setFileDropped] = useState(false)
    const [fileName, setFileName] = useState("")

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            onFilesDropped(acceptedFiles[0])
            setFileDropped(true)
            const formattedFileName = acceptedFiles[0].name.replace(/-/g, ' ').replace(/_/g, ' ')
            setFileName(formattedFileName)
        }
    }, [onFilesDropped])

    const {getRootProps, getInputProps } = useDropzone({onDrop})

    return (
        <DropZoneArea {...getRootProps()} ready={fileDropped} borderColor={borderColor}>
            <input {...getInputProps()}/>
            <p>{title}&nbsp;</p>
            <p> (puede ser la foto)</p>
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
                            borderColor={"#8A7BEC"}
                        />
                    </DoctorIdContainer>
                </InputColumn>
                <div style={{color: "#b4b4b4", fontSize: "0.8em", margin: "5px 0 30px 0"}}>
                    * Los datos requeridos los usaremos únicamente para verificar que usted es médico de profesión y
                    está habilitado para ejercer. Sus datos de contacto solo serán usados para poder comunicarnos y
                    explicarle los pasos a seguir.
                </div>
                <StyledRegisterButton disabled={disableRegister}
                                      onClick={onRegisterClicked}>
                    Enviar
                    <StyledRegisteringLoader>
                        <MoonLoader size={20} color={"white"} loading={registerLoading}/>
                    </StyledRegisteringLoader>
                </StyledRegisterButton>

            </StyledCardDiv>
        </RegistrationCardContainer>
    );
};


export default registrationCard;
