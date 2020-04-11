import React, {useEffect, useRef, useState} from 'react';
import CommunicationCard from "../../components/CommunicationCard/CommunicationCard";
import CallAPI from "../../services/CallAPI";

const DoctorUserCommunication = (props) => {
    const [enableCallState, setEnableCallState] = useState({
        enableCall: true
    });

    const [callMessageState, setCallMessageState] = useState({
        callMessage: null
    });

    const [callEnvAuthorizedState, setCallEnvAuthorizedState] = useState({
        callEnvAuthorized: false
    });

    const callRef = useRef({
        call: null
    });

    const [videoCallCodeState, setVideoCallCodeState] = useState({
        videoCallCode: null,
        videoCallLink: '#'
    });

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

    const videoCallHandler = () => {
        const videoCallCode = Math.random().toString().substring(2, 5) + Math.random().toString().substring(12, 15);
        setVideoCallCodeState({
            videoCallCode: videoCallCode,
            videoCallLink: "https://talky.io/" + videoCallCode
        })
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
        const reportCallEvent = (callMessage) => {
            if (callMessage !== "Conectado") {
                setEnableCallState({
                    enableCall: true
                });
            }
            setCallMessageState({
                callMessage: callMessage
            });
        };
        if (callEnvAuthorizedState.callEnvAuthorized) {
            if (!enableCallState.enableCall && callRef.current.call === null) {
                CallAPI.makeCall(callRef.current, props.userContactNumber, reportCallEvent);
            } else if (enableCallState.enableCall && callRef.current.call !== null) {
                CallAPI.hangUp(callRef.current);
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
                videoCallCode={videoCallCodeState.videoCallCode}
                videoCallLink={videoCallCodeState.videoCallLink}
                callHandler={callHandler}
                videoCallHandler={videoCallHandler}/>
        </div>
    );
};

export default DoctorUserCommunication;