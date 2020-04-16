import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "react-bootstrap";
import UserBasicData from '../UserBasicData/UserBasicData';

const NameAgeCard = ({ id="", name="", age="", citizenId="", city="", score=0 }) => {
    return (
      <Card style={{border: "none"}} className="mb-3">
        <Card.Header className="border-bottom-0">
          <UserBasicData
            id={id}
            citizenId={citizenId}
            age={age}
            name={name}
            city={city}
            score={score}
            showButton={false}
          />
        </Card.Header>
      </Card>
    );
};

NameAgeCard.propTypes = {
  citizenId: PropTypes.string,
  name: PropTypes.string,
  age: PropTypes.string,
  city: PropTypes.string,
  score: PropTypes.number
};

export default NameAgeCard;
