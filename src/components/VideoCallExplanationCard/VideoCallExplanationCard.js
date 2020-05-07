import React from "react";
import ReactPlayer from "react-player";
import {StyledCardDiv, StyledCardSubDiv, StyledCardTitle, StyledVideoDiv} from "./StyledVideoCallExplanationCard";
import {ReactComponent as OpenIcon} from "./assets/down-arrow.svg"
import {ReactComponent as CloseIcon} from "./assets/up-arrow.svg"

const videoCallExplanationCard = ({showVideo, onShowVideoClick}) => {

    let icon = <OpenIcon style={{cursor: "pointer"}} onClick={onShowVideoClick}/>;
    if (showVideo) {
        icon = <CloseIcon style={{cursor: "pointer"}} onClick={onShowVideoClick}/>;
    }

    return (
        <StyledCardDiv>
            <StyledCardSubDiv>
                <StyledCardTitle>¿Cómo iniciar la videollamada?</StyledCardTitle>
                {icon}
            </StyledCardSubDiv>
            <StyledVideoDiv showVideo={showVideo}>
                <ReactPlayer url="https://youtu.be/GKheaj2EDl0" width="150" controls={true} playing={showVideo}/>
            </StyledVideoDiv>
        </StyledCardDiv>
    );
};

export default videoCallExplanationCard;