import { FC } from 'react';

import './Switcher.scss';

interface SwitcherProps {
  description: string;
  type: string;
  id: string;
  name: string;
  firstValue: string;
  secondValue: string;
  defaultChecked: boolean;
}

const Switcher: FC<SwitcherProps> = ({
  description,
  type,
  id,
  name,
  firstValue,
  secondValue,
  defaultChecked,
}: SwitcherProps) => {
  return (
    <div className="form__container">
      <div>{description}</div>
      <div className="switcher__container">
        <div>{firstValue}</div>
        <label className="switch">
          <input type={type} id={id} name={name} defaultChecked={defaultChecked} />
          <span className="slider round" />
        </label>
        <div>{secondValue}</div>
      </div>
    </div>
  );
};

export { Switcher };
