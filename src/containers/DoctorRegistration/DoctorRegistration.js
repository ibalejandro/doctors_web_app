import React, {useState, useRef} from "react";
import RegistrationCard from "../../components/RegistrationCard/RegistrationCard";
import CallAPI from "../../services/CallAPI";

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

    const personalIdChangeHandler = (content) => {
        setPersonalId(content);
    };

    const professionalIdChangeHandler = (content) => {
        setProfessionalId(content);
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
            setNameError("Por favor, ingrese su nombre.");
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
            setLastNameError("Por favor, ingrese sus apellidos.");
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
            setPhoneNumberError("Por favor, verifique que su número de celular tenga 10 dígitos.");
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
            setEmailError("Por favor, verifique que su correo electrónico sea válido.");
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
            setPersonalIdError("Por favor, adjunte su Cédula de Ciudadanía/Extranjería.");
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
            setProfessionalIdError("Por favor, adjunte su Tarjeta Profesional.");
            inputProfessionalIdRef.current.focus();
            return false;
        }
    };

    const fieldsValidation = [validateName, validateLastName, validatePhoneNumber, validateEmail, validatePersonalId,
                              validateProfessionalId];

    const registerHandler = () => {
        let allFieldsValid = true;
        for (let i = 0; i < fieldsValidation.length && allFieldsValid; i++) {
            if (!fieldsValidation[i]()) {
                allFieldsValid = false;
            }
        }
        if (allFieldsValid) {
            const doctorName = name.trim();
            const doctorLastName = lastName.trim();
            // TODO make request.
        }
    };

    return (
      <div>
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