import React from "react";
import DoctorRegistration from "../DoctorRegistration/DoctorRegistration";
import GeneralInformation from "../../components/GeneralInformation/GeneralInformation";

const Landing = () => {
    return (
        <div>
            <GeneralInformation/>
            <DoctorRegistration/>
        </div>
    );
};

export default Landing;