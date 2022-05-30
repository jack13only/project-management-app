import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { localizationObj } from '../../../../features/localization';
import './ErrorSign.scss';

type Error = {
  errorMsg: string;
};

const ErrorSign = ({ errorMsg }: Error) => {
  const { lang } = useAppSelector((state) => state.langStorage);
  return (
    <div className="error-modal">
      <h3 className="error-modal__title">{localizationObj[lang].error}</h3>
      <div>{errorMsg}</div>
    </div>
  );
};

export default ErrorSign;
