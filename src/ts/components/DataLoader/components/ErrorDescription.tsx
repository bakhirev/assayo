import React from 'react';

interface IErrorDescriptionProps {
  response?: any | null | undefined;
}

function ErrorDescription({ response = null }: IErrorDescriptionProps) {
  return (
    <div className="data-loader-error">
      <div title="Запрос не может быть выполнен">
        <div>
          {response}
        </div>
      </div>
    </div>
  );
}

export default ErrorDescription;
