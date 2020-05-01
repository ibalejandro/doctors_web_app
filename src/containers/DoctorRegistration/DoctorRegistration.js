import React, {useState, useRef} from "react";
import RegistrationCard from "../../components/RegistrationCard/RegistrationCard";
import Modal from "../../components/Modal/Modal";
import CasesAPI from "../../services/CasesAPI";
import UploadToS3API from "../../services/UploadToS3API";
import RegistrationResult from "../../components/RegistrationResult/RegistrationResult";

const DoctorRegistration = () => {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [personalId, setPersonalId] = useState('');
    const [professionalId, setProfessionalId] = useState('');
    const [nameError, setNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [personalIdError, setPersonalIdError] = useState(null);
    const [professionalIdError, setProfessionalIdError] = useState(null);
    const inputNameRef = useRef(null);
    const inputLastNameRef = useRef(null);
    const inputPhoneNumberRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputPersonalIdRef = useRef(null);
    const inputProfessionalIdRef = useRef(null);
    const [registerDisabled, setRegisterDisabled] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [registrationResult, setRegistrationResult] = useState({
       title: '',
       body: '',
       errorStyle: false
    });

    const nameChangeHandler = (content) => {
        if (content.trim() === '') {
            setName('');
        }
        else {
            if (allLettersOrSpaces(content)) {
                let newName = capitalizeText(content);
                newName = collapseMultipleSpaces(newName);
                setName(newName);
            }
        }
    };

    const lastNameChangeHandler = (content) => {
        if (content.trim() === '') {
            setLastName('');
        }
        else {
            if (allLettersOrSpaces(content)) {
                let newLastName = capitalizeText(content);
                newLastName = collapseMultipleSpaces(newLastName);
                setLastName(newLastName);
            }
        }
    };

    const phoneNumberChangeHandler = (content) => {
        if (content.trim() === '') {
            setPhoneNumber('');
        }
        else {
            if (allNumbers(content)) {
                if (!content.startsWith('0') && content.length <= 10) {
                    setPhoneNumber(content);
                }
            }
        }
    };

    const emailChangeHandler = (content) => {
        let newEmail = removeAllSpaces(content);
        newEmail = newEmail.toLowerCase();
        setEmail(newEmail);
    };

    const personalIdChangeHandler = (fileContent) => {
        if (fileContent) {
            setPersonalId(fileContent);
        }
    };

    const professionalIdChangeHandler = (fileContent) => {
        if (fileContent) {
            setProfessionalId(fileContent);
        }
    };

    const allLettersOrSpaces = (text) => {
        if (text.match(/^[A-Za-zÀ-ÿ´`¨\s]*$/)) {
            return true;
        }
        else {
            return false;
        }
    };

    const capitalizeText = (text) => {
        const capitalizedText = text.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        return capitalizedText;
    };

    const collapseMultipleSpaces = (text) => {
        return text.replace(/\s\s+/g, ' ');
    };

    const removeAllSpaces = (text) => {
        return text.replace(/\s\s*/g, '');
    };

    const allNumbers = (text) => {
        if (text.match(/^[0-9]*$/)) {
            return true;
        }
        else {
            return false;
        }
    };

    const validateName = () => {
        if (name) {
            setNameError(null);
            return true;
        }
        else {
            setNameError("Por favor, ingrese tu nombre.");
            inputNameRef.current.focus();
            return false;
        }
    };

    const validateLastName = () => {
        if (lastName) {
            setLastNameError(null);
            return true;
        }
        else {
            setLastNameError("Por favor, ingrese tus apellidos.");
            inputLastNameRef.current.focus();
            return false;
        }
    };

    const validatePhoneNumber = () => {
        if (phoneNumber.length === 10) {
            setPhoneNumberError(null);
            return true;
        }
        else {
            setPhoneNumberError("Por favor, verifica que tu número de celular tenga 10 dígitos.");
            inputPhoneNumberRef.current.focus();
            return false;
        }
    };

    const validateEmail = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError(null);
            return true;
        }
        else {
            setEmailError("Por favor, verifique que tu correo electrónico sea válido.");
            inputEmailRef.current.focus();
            return false;
        }
    };

    const validatePersonalId = () => {
        if (personalId) {
            setPersonalIdError(null);
            return true;
        }
        else {
            setPersonalIdError("Por favor, adjunta tu cédula de ciudadanía.");
            inputPersonalIdRef.current.focus();
            return false;
        }
    };

    const validateProfessionalId = () => {
        if (professionalId) {
            setProfessionalIdError(null);
            return true;
        }
        else {
            setProfessionalIdError("Por favor, adjunta tu tarjeta profesional.");
            inputProfessionalIdRef.current.focus();
            return false;
        }
    };

    const fieldsValidation = [validateName, validateLastName, validatePhoneNumber, validateEmail, validatePersonalId,
                              validateProfessionalId];

    const registerHandler = async () => {
        setRegisterDisabled(true);
        setRegisterLoading(true);
        let allFieldsValid = true;
        for (let i = 0; i < fieldsValidation.length && allFieldsValid; i++) {
            if (!fieldsValidation[i]()) {
                allFieldsValid = false;
            }
        }
        if (allFieldsValid) {
            const personalIdMedia = await UploadToS3API.uploadMedia(personalId);
            if (personalIdMedia.media) {
                const personalIdUrl = "s3://" + personalIdMedia.media.bucket + "/" + personalIdMedia.media.key;
                const professionalIdMedia = await UploadToS3API.uploadMedia(professionalId);
                if (professionalIdMedia.media) {
                    const professionalIdUrl = "s3://" + professionalIdMedia.media.bucket + "/"
                        + professionalIdMedia.media.key;
                    const doctorName = name.trim();
                    const doctorLastName = lastName.trim();
                    const doctor = await CasesAPI.registerVolunteerDoctor(doctorName, doctorLastName, phoneNumber,
                                                                          email, personalIdUrl, professionalIdUrl);
                    if (doctor.doctorRegistered) {
                        setRegistrationResult({
                            title: "¡Registro exitoso!",
                            body: "Revisaremos la información proporcionada y nos pondremos en contacto con usted " +
                                "lo más pronto posible para explicarle cómo empezar a colaborar. Gracias por su " +
                                "compromiso con el país y por ayudarnos a aplanar la curva.",
                            errorStyle: false
                        });
                    }
                    else {
                        setErrorMessageOnRegistrationResult();
                    }
                }
                else {
                    setErrorMessageOnRegistrationResult();
                }
            }
            else {
                setErrorMessageOnRegistrationResult();
            }
            setRegisterLoading(false);
            setShowModal(true);
        }
        else {
            setRegisterLoading(false);
            setRegisterDisabled(false);
        }
    };

    const setErrorMessageOnRegistrationResult = () => {
        setRegistrationResult({
            title: "Error en el registro",
            body: "Ocurrió un error durante el proceso de registro. Por favor, intente nuevamente. Si el " +
                "error persiste, escríbanos a sincovid@gmail.com.",
            errorStyle: true
        });
    };

    const resultUnderstoodHandler = () => {
        if (registrationResult.errorStyle) {
            setShowModal(false);
            setRegisterDisabled(false);
        }
        else {
            window.location = '/';
        }
    };

    return (
      <div>
          <Modal
              show={showModal}
              errorStyle={registrationResult.errorStyle}>
              <RegistrationResult
                title={registrationResult.title}
                body={registrationResult.body}
                errorStyle={registrationResult.errorStyle}
                onUnderstoodClicked={resultUnderstoodHandler}/>
          </Modal>
          <RegistrationCard
              name={name}
              nameError={nameError}
              inputNameRef={inputNameRef}
              lastName={lastName}
              lastNameError={lastNameError}
              inputLastNameRef={inputLastNameRef}
              phoneNumber={phoneNumber}
              phoneNumberError={phoneNumberError}
              inputPhoneNumberRef={inputPhoneNumberRef}
              email={email}
              emailError={emailError}
              inputEmailRef={inputEmailRef}
              personalIdError={personalIdError}
              inputPersonalIdRef={inputPersonalIdRef}
              professionalIdError={professionalIdError}
              inputProfessionalIdRef={inputProfessionalIdRef}
              disableRegister={registerDisabled}
              registerLoading={registerLoading}
              onNameChanged={nameChangeHandler}
              onLastNameChanged={lastNameChangeHandler}
              onPhoneNumberChanged={phoneNumberChangeHandler}
              onEmailChanged={emailChangeHandler}
              onPersonalIdChanged={personalIdChangeHandler}
              onProfessionalIdChanged={professionalIdChangeHandler}
              onRegisterClicked={registerHandler}/>
      </div>
    );
};

export default DoctorRegistration;
