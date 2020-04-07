import React from 'react';
import {
    StyledCallButton,
    StyledCallIcon,
    StyledCardDiv,
    StyledCardSubDiv,
    StyledVideoCallButton
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
                <StyledVideoCallButton>
                    <StyledCallIcon src={videoCallIcon} alt="Videollamada"/>
                </StyledVideoCallButton>
            </StyledCardSubDiv>
            <p>{props.callMessage}</p>
        </StyledCardDiv>
    );
};


export default communicationCard;