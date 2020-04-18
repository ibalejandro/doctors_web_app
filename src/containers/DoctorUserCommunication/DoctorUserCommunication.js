import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import CommunicationCard from "../../components/CommunicationCard/CommunicationCard";
import CallAPI from "../../services/CallAPI";
import CasesAPI from "../../services/CasesAPI";

const DoctorUserCommunication = ({userContactNumber, doctorId}) => {
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

    const videoCallHandler = async () => {
        const videoCallCode = await CasesAPI.createVideoCallCode(doctorId, userContactNumber);
        setVideoCallCodeState({
            videoCallCode: videoCallCode,
            videoCallLink: "https://talky.io/" + videoCallCode
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
    }, []);

    useEffect(() => {
        if(callMessageState.callMessage === "Llamada finalizada") {
            const timerAfterCallHangsUp = setTimeout(() => {
                setCallMessageState({callMessage: null})
            }, 2000)
            return () => clearTimeout(timerAfterCallHangsUp)
        }
    }, [callMessageState.callMessage])

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
                CallAPI.makeCall(callRef.current, userContactNumber, reportCallEvent);
            } else if (enableCallState.enableCall && callRef.current.call !== null) {
                CallAPI.hangUp(callRef.current);
            }
        }
    }, [enableCallState, callEnvAuthorizedState.callEnvAuthorized, userContactNumber]);

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

DoctorUserCommunication.propTypes = {
    userContactNumber: PropTypes.string,
    doctorId: PropTypes.string
};

export default DoctorUserCommunication;
