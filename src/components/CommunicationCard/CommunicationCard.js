import React from 'react';
import {
    StyledCallButton,
    StyledCallIcon,
    StyledCardDiv,
    StyledCardSubDiv,
    StyledVideoCallButton,
    StyledVideoCallCodeSpan,
    StyledVideoCallLink
} from './StyledCommunicationCard'
import callIcon from './assets/call.png'
import videoCallIcon from './assets/video-call.png'

const communicationCard = (props) => {
    return (
        <StyledCardDiv>
            <h3>Comunicación</h3>
            <StyledCardSubDiv>
                <StyledCallButton
                    callStyle={props.enableCall}
                    onClick={props.callHandler}>
                    <StyledCallIcon src={callIcon} alt="Llamada"/>
                </StyledCallButton>
                <StyledVideoCallButton
                    onClick={props.videoCallHandler}>
                    <StyledCallIcon src={videoCallIcon} alt="Videollamada"/>
                </StyledVideoCallButton>
            </StyledCardSubDiv>
            <p>{props.callMessage}</p>
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