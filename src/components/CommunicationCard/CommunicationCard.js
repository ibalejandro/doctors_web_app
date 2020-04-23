import React from 'react';
import {
    CommunicationButton,
    StyledCardDiv,
    StyledCardSubDiv,
    StyledVideoCallCodeSpan,
    StyledVideoCallLink
} from './StyledCommunicationCard'

import {ReactComponent as CallIcon} from './assets/phone.svg'
import {ReactComponent as VideoIcon} from './assets/video-cameras.svg'

const communicationCard = (props) => {
    let videoCallMessage = "Generar código de videollamada";
    if (props.videoCallMessage) {
        videoCallMessage = props.videoCallMessage;
    }

    return (
        <StyledCardDiv>
            <h3>Comunicación</h3>
            <StyledCardSubDiv>
                <CommunicationButton
                    callStyle={props.enableCall}
                    onClick={props.callHandler}
                    communicationType="call">
                    <CallIcon/>
                    {
                        !props.callMessage ? <span>Llamar al usuario</span> : <span>{props.callMessage}</span>
                    }
                </CommunicationButton>
                <CommunicationButton
                    callStyle={true}
                    onClick={props.videoCallHandler}
                    communicationType="videocall">
                    <VideoIcon/>
                    {
                        <span>{videoCallMessage}</span>
                    }
                </CommunicationButton>
            </StyledCardSubDiv>
            <StyledVideoCallLink
                videoCallCode={props.videoCallCode}
                href={props.videoCallLink}
                target="_blank">Código para
                videollamada: <StyledVideoCallCodeSpan>{props.videoCallCode}</StyledVideoCallCodeSpan>
            </StyledVideoCallLink>
        </StyledCardDiv>
    );
};


export default communicationCard;
