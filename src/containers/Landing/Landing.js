import React, {useEffect} from "react";
import DoctorRegistration from "../DoctorRegistration/DoctorRegistration";
import GeneralInformation from "../../components/GeneralInformation/GeneralInformation";
import LoginRedirection from "../LoginRedirection/LoginRedirection";
import {useAuth0} from "../../shared/Auth";
import {useHistory} from "react-router-dom";

const Landing = () => {

    const {loading, isAuthenticated, token} = useAuth0();
    let history = useHistory();

    useEffect(() => {
        if (isAuthenticated && token) {
            history.push("/reports");
        }
    }, [isAuthenticated, token]);

    if (loading || (isAuthenticated && token)) return <div>Cargando...</div>;

    return (
        <div>
            <GeneralInformation/>
            <LoginRedirection/>
            <DoctorRegistration/>
        </div>
    );
};

export default Landing;