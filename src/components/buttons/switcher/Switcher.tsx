import { MutableRefObject } from 'react';

import './Switcher.scss';

type SwitcherTypes = {
  description: string;
  type: string;
  id: string;
  name: string;
  firstValue: string;
  secondValue: string;
  defaultChecked: boolean;
  inputCheckboxRef: MutableRefObject<HTMLInputElement | null>;
};

const Switcher = ({
  description,
  type,
  id,
  name,
  firstValue,
  secondValue,
  defaultChecked,
  inputCheckboxRef,
}: SwitcherTypes) => {
  return (
    <div className="form__container">
      <div>{description}</div>
      <div className="switcher__container">
        <div>{firstValue}</div>
        <label className="switch">
          <input
            type={type}
            id={id}
            name={name}
            defaultChecked={defaultChecked}
            ref={inputCheckboxRef}
          />
          <span className="slider round" />
        </label>
        <div>{secondValue}</div>
      </div>
    </div>
  );
};

export { Switcher };
