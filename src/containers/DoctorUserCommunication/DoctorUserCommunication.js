import React, {useEffect, useState, useRef} from 'react';
import CommunicationCard from "../../components/CommunicationCard/CommunicationCard";
import CallAPI from "../../services/CallAPI";

const DoctorUserCommunication = (props) => {
    const NUMBERTOCALL = "+573163703362";

    const [enableCallState, setEnableCallState] = useState({
        enableCall: true
    });

    const [callMessageState, setCallMessageState] = useState({
        callMessage: null
    });

    const [callEnvAuthorizedState, setCallEnvAuthorizedState] = useState({
        callEnvAuthorized: false
    });

    const callRef = useRef(null);

    const callHandler = () => {
        let enableCall = enableCallState.enableCall;
        let callMessage = callMessageState.callMessage;
        enableCall = !enableCall;
        if (!enableCall) {
            callMessage = "Llamando...";
        } else {
            callMessage = "Llamada finalizada";
        }
        setEnableCallState({
            enableCall: enableCall
        });
        setCallMessageState({
            callMessage: callMessage
        });
    };

    useEffect(() => {
        const setUp = async () => {
            const callEnvAuthorized = await CallAPI.setUp();
            setCallEnvAuthorizedState({
                callEnvAuthorized: callEnvAuthorized
            });
        };
        setUp();

        return (() => {
            // Clean up function.
        });
    }, []);

    useEffect(() => {
        const myCallback = (identifier) => {
            console.log(identifier);
            /*
            setCallState({
                call: callAndMessage.call
            });
             */
        };
        if (callEnvAuthorizedState.callEnvAuthorized) {
            if (!enableCallState.enableCall && !callRef.current) {
                alert("Making call...");
                CallAPI.makeCall(callRef.current, NUMBERTOCALL, myCallback);
            }
            else if (enableCallState.enableCall && callRef.current) {
                alert("Hanging up call...");
            }
        }

        return (() => {
            // Clean up function.
        });
    }, [enableCallState]);

    return (
        <div>
            <CommunicationCard
                enableCall={enableCallState.enableCall}
                callMessage={callMessageState.callMessage}
                callHandler={callHandler}/>
        </div>
    );
};

export default DoctorUserCommunication;