import React from "react";
import {Modal} from "./StyledModal";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
    return (
        <div>
            <Backdrop show={props.show}/>
            <Modal
                show={props.show}>{props.children}
            </Modal>
        </div>
    );
};

export default modal;