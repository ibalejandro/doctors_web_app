import React, { useState, useEffect } from 'react';
//import {useCognitoContext} from "../AuthContext";
import './Login.css';
//import Icon from 'react-native-vector-icons/FontAwesome';
//import { Input } from 'react-native-elements';
//import {PageView} from "../../Tracking";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(null)
    const [displayErrors, setDisplayErrors] = useState(false)
    //useEffect(() => {
    //    PageView()
    //}, [])
    function validate() {
        return true;
    }
    function showErrors() {
        setDisplayErrors(true)
    }
    const submitHandler = async () => {
        //if( validate() ) {
            //const result = await loginHandler(email, password)
            //if(result.hasError) {
            //    setErrors(result.error.message)
            //    showErrors()
        //    }
        //} else {
            //showErrors()
        //}
    }
    return (
        <section className="Login">
            <div className="login-container">
                <div className="login-header">
                    <h1>COVID-19: Doctors Web App</h1>
                    <h2>Ingresa tus datos para iniciar sesión:</h2>
                    <h3>Ingresa tu correo electronico registrado, junto con la contraseña.</h3>
                </div>
                <div className="login-content">
                    <div className="login-errors">
                        <span className="error" style={ {"display" : displayErrors ? "block" : "none"} }>
                            {errors}
                        </span>
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Correo Electronico</label>
                        <input  type="text" id="email" onChange={(event) => {
                            setEmail(event.target.value)
                        }}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" onChange={(event) => {
                            setPassword(event.target.value)
                        }}/>
                    </div>
                    <button className="submit" onClick={submitHandler}>Ingresar!</button>
                </div>
            </div>
        </section>
    )
}
export default Login;