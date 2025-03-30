import React, { useState } from 'react';
import './FaqItem.css';
import { Box } from '@mui/material';

const plusImg =
  'https://assets.ccbp.in/frontend/react-js/faqs-plus-icon-img.png';
const minusImg =
  'https://assets.ccbp.in/frontend/react-js/faqs-minus-icon-img.png';

const FaqItem = ({ faqDetails }) => {
  const [isActive, setIsActive] = useState(false);

  const { questionText, answerText } = faqDetails;

  const toggleActive = () => {
    setIsActive(prevState => !prevState);
  };

  return (
    <li className="faq-item">
      <div className="question-container">
        <h1 className="question">{questionText}</h1>
        <Box className="button" type="button" onClick={toggleActive}>
          <img alt={isActive ? 'minus' : 'plus'} src={isActive ? minusImg : plusImg} />
        </Box>
      </div>
      {isActive && (
        <>
          <hr className="horizontal" />
          
          <p className="answer">{answerText}</p>
        </>
      )}
    </li>
  );
};

export default FaqItem;
