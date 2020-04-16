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
    return (
        <StyledCardDiv>
            <h3>Comunicación</h3>
            <StyledCardSubDiv>
                <CommunicationButton
                    callStyle={props.enableCall}
                    onClick={props.callHandler}>
                    <CallIcon/>
                    {
                        !props.callMessage ? <span>Llamar al usuario</span> : <span>{props.callMessage}</span>
                    }
                </CommunicationButton>
                <CommunicationButton
                    callStyle={true}
                    onClick={props.videoCallHandler}>
                    <VideoIcon/>
                    <span>Generar código de videollamada</span>
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
