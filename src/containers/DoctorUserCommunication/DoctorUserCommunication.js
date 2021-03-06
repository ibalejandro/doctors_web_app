import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import CommunicationCard from "../../components/CommunicationCard/CommunicationCard";
import CallAPI from "../../services/CallAPI";
import CasesAPI from "../../services/CasesAPI";
import ReportsAPI from "../../services/ReportsAPI";

const DoctorUserCommunication = ({doctorId, patientId, token}) => {
    const [userContactNumberState, setUserContactNumberState] = useState({
        userContactNumber: null
    });

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

    const [videoCallMessageState, setVideoCallMessageState] = useState({
        videoCallMessage: null
    });

    const callHandler = async () => {
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
        if (userContactNumberState.userContactNumber === null) {
            const userPii = await ReportsAPI.getUserContactNumber(patientId, token);
            setUserContactNumberState({
                userContactNumber: userPii.userContactNumber
            });
        }
    };

    const videoCallHandler = async () => {
        let videoCallMessage = videoCallMessageState.videoCallMessage;
        videoCallMessage = "Generando...";
        setVideoCallMessageState({
            videoCallMessage: videoCallMessage
        });
        const appointment = await CasesAPI.createVideoCallCode(doctorId, patientId, token);
        setVideoCallCodeState({
            videoCallCode: appointment.videoCallCode,
            videoCallLink: "https://talky.io/" + appointment.videoCallCode
        });
        const timerAfterVideoCallCodeIsGenerated = setTimeout(() => {
            setVideoCallMessageState({videoCallMessage: null})
        }, 1000)
        return () => clearTimeout(timerAfterVideoCallCodeIsGenerated);
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
            if (userContactNumberState.userContactNumber !== null) {
                if (!enableCallState.enableCall && callRef.current.call === null) {
                    CallAPI.makeCall(callRef.current, userContactNumberState.userContactNumber, reportCallEvent);
                } else if (enableCallState.enableCall && callRef.current.call !== null) {
                    CallAPI.hangUp(callRef.current);
                }
            }
        }
    }, [enableCallState, callEnvAuthorizedState.callEnvAuthorized, userContactNumberState.userContactNumber]);

    return (
        <div>
            <CommunicationCard
                enableCall={enableCallState.enableCall}
                callMessage={callMessageState.callMessage}
                videoCallMessage={videoCallMessageState.videoCallMessage}
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
