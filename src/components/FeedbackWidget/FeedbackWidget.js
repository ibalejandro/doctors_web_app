import React from "react";
import {FeedbackButton, FeedbackContainer} from "./StyledFeedbackWidget";
import {MdFeedback} from "react-icons/all";

const feedbackWidget = ({onGiveFeedbackClick}) => {
    return (
        <FeedbackContainer>
            <FeedbackButton onClick={onGiveFeedbackClick}><MdFeedback size={25}/>¡Danos tu opinión!</FeedbackButton>
        </FeedbackContainer>
    )
};

export default feedbackWidget;
