import React from 'react';

import IQuiz from './interfaces/Quiz';
import QuizPage from './components/index';
import example from './helpers/example';

interface IQuizProps {
}

function Quiz({}: IQuizProps): React.ReactElement | null {
  return (
    <QuizPage
      quiz={example as IQuiz}
      onEnd={() => {
      }}
    />
  );
}

export default Quiz;
