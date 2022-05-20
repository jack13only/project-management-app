import React from 'react';
import './ErrorSign.scss';

type Error = {
  errorMsg: string;
};

const ErrorSign = ({ errorMsg }: Error) => {
  return (
    <div className="error-modal">
      <h3 className="error-modal__title">Error!</h3>
      <div>{errorMsg}</div>
    </div>
  );
};

export default ErrorSign;
