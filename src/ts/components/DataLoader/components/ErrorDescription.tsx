import React from 'react';

interface IErrorDescriptionProps {
  response?: any | null | undefined;
}

function ErrorDescription({ response }: IErrorDescriptionProps) {
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

ErrorDescription.defaultProps = {
  response: null,
};

export default ErrorDescription;
