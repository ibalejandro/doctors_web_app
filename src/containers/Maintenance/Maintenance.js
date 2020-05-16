import React from 'react';
import './Maintenance.css'
import HubspotForm from 'react-hubspot-form'
import AppLogo from "../../components/GeneralInformation/assets/logo.png";

const Maintenance = props => {
    return (
        <section>
            <div>
                <div className="triangle"></div>
                <div className="logo">
                    <div>Doctores</div>
                    <div class="logo-text">
                        <img src={AppLogo} alt="5vid"/> <span>5vid</span>
                    </div>
                </div>
                <h1>
                    ¡Gracias por tu apoyo! 🤜 🤛
                </h1>
                <p>
                    Estamos haciendo lo posible por ayudar a todos nuestros usuarios. Esto implica que debemos tomar una
                    mayor
                    cantidad de medidas para garantizarles una mejor atención.
                    <b> Por eso, estamos trabajando para tener mayor control sobre las personas que están siendo
                        atendidas.</b>
                </p>
                <p>
                    <b>Déjanos tu correo y te informaremos cuando estemos listos para brindarte el mejor servicio.</b>
                </p>
                <div className="row">
                    <div className="email-container">
                        <HubspotForm
                            portalId='7726309'
                            formId='3ab0b4e0-2741-4f1e-8007-22f003bc1179'
                            onSubmit={() => console.log('Submit!')}
                            onReady={(form) => console.log('Form ready!')}
                            loading={<div>Loading...</div>}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

Maintenance.propTypes = {};

export default Maintenance;
