import React from "react";
import {StyledUnderstoodButton} from "./StyledRegistrationResult";

const registrationResult = ({title, body, errorStyle, onUnderstoodClicked}) => {
    return (
      <div>
          <h4>{title}</h4>
          <p>{body}</p>
          <StyledUnderstoodButton
            errorStyle={errorStyle}
            onClick={onUnderstoodClicked}>Entendido
          </StyledUnderstoodButton>
      </div>
    );
};

export default registrationResult;