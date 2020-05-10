import React from "react";
import {Modal} from "./StyledModal";

const modal = (props) => {
    return (
        <Modal
            show={props.show}
            errorStyle={props.errorStyle}>{props.children}
        </Modal>
    );
};

export default modal;