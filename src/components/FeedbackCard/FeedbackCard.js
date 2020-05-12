import React from "react";
import {
    StyledCancelIconContainer, StyledCardMessage,
    StyledCardSubDiv,
    StyledCardTitle,
    StyledErrorParagraph,
    StyledFeedbackTextArea,
    StyledSendButton,
} from "./StyledFeedbackCard";
import {ReactComponent as CancelIcon} from "./assets/cancel.svg";


const feedbackCard = ({
                          title, feedback, body, buttonText, errorMessage, disableSend, onCancelClicked,
                          onFeedbackChanged, onSendClicked
                      }) => {
    let cancelIcon = (
        <StyledCancelIconContainer>
            <CancelIcon style={{cursor: "pointer"}} onClick={onCancelClicked}/>
        </StyledCancelIconContainer>
    );
    let content = (
        <StyledFeedbackTextArea
            placeholder={"Escribe aquí tu opinión..."}
            onChange={(event) => {
                onFeedbackChanged(event.target.value)
            }}
            value={feedback}>
        </StyledFeedbackTextArea>
    );
    if (body) {
        cancelIcon = null;
        content = <StyledCardMessage>{body}</StyledCardMessage>
    }

    return (
        <div>
            <StyledCardSubDiv>
                <StyledCardTitle>{title}</StyledCardTitle>
                {cancelIcon}
            </StyledCardSubDiv>
            {content}
            <StyledSendButton
                disabled={disableSend}
                onClick={onSendClicked}>
                {buttonText}
            </StyledSendButton>
            <StyledErrorParagraph>{errorMessage}</StyledErrorParagraph>
        </div>
    );
};

export default feedbackCard;
