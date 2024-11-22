import React from 'react';

import QuizPage from './components/index';
import getQuizQuestions from './helpers/getQuestions';

function Quiz(): React.ReactElement | null {
  const questions = getQuizQuestions();
  return (
    <QuizPage
      quiz={questions}
      onEnd={() => {
      }}
    />
  );
}

export default Quiz;
