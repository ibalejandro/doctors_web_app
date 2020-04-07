import React, {useEffect, useRef} from 'react';
import CommunicationCard from "../../components/CommunicationCard/CommunicationCard";
// import {StyledTogglePersonsButton} from "../../AppStyled";

const doctorUserCommunication = (props) => {
    /*
    const togglePersonsButtonRef = useRef(null);
    const authCtx = useContext(authContext);

    console.log(authCtx.authenticated);

    useEffect(() => {
        console.log("[Cockpit.js] useEffect.");
        // HTTP request.

        setTimeout(() => {
            alert("Save data to cloud!");
        }, 1000);

        togglePersonsButtonRef.current.click();
        return (() => {
            // Clean up function.
            console.log("[Cockpit.js] clean up work in useEffect.");
        });
    }, []);
    */

    return (
        <div>
            <CommunicationCard/>
        </div>
    );
};

export default doctorUserCommunication;