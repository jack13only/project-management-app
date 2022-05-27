import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { enLang, ruLang } from '../../../features/ls-load-save';
import { setLang } from '../../../reducers/langReducer';

import './Switcher.scss';

interface SwitcherProps {
  description: string;
  type: string;
  id: string;
  name: string;
}

const Switcher: FC<SwitcherProps> = ({ description, type, id, name }: SwitcherProps) => {
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector((state) => state.langStorage);
  const [isChecked, setIsChecked] = useState(lang === ruLang);
  useEffect(() => {
    dispatch(setLang(isChecked ? ruLang : enLang));
  }, [isChecked]);

  return (
    <div className="form__container">
      <div>{description}</div>
      <div className="switcher__container">
        <div>{enLang}</div>
        <label className="switch">
          <input
            type={type}
            id={id}
            name={name}
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className="slider round" />
        </label>
        <div>{ruLang}</div>
      </div>
    </div>
  );
};

export { Switcher };
