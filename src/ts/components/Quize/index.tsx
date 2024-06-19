import React from 'react';

import IQuize from './interfaces/Quize';
import QuizePage from './components/index';
import example from './helpers/example';

interface IQuizeProps {
}

function Quize({}: IQuizeProps): React.ReactElement | null {
  return (
    <QuizePage
      quize={example as IQuize}
      onEnd={() => {
      }}
    />
  );
}

export default Quize;
