import React from "react";
import {FeedbackButton, FeedbackContainer} from "./StyledFeedbackWidget";

const feedbackWidget = ({onGiveFeedbackClick}) => {
    return (
        <FeedbackContainer>
            <FeedbackButton onClick={onGiveFeedbackClick}>¡Danos tu opinión!</FeedbackButton>
        </FeedbackContainer>
    )
};

export default feedbackWidget;