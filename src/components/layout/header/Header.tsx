import { FC } from 'react';
import { Link } from 'react-router-dom';

import { PrimaryButton } from '../../buttons/header/PrimaryButton';

import logo from '../../../images/icons/logo.svg';
import './Header.scss';

const Header: FC = () => {
  return (
    <header data-testid="header" className="header">
      <div className="wrapper">
        <Link to="/" className="header__logo">
          <img src={logo} alt="logo" className="header__logo-img" />
        </Link>
        <div className="header__navigation">
          <div className="header__buttons">
            <PrimaryButton
              dataTestId="PrimaryButton"
              type="button"
              className="btn btn-log btn-bordered"
              description="Log in"
            />
            <PrimaryButton
              dataTestId="PrimaryButton"
              type="button"
              className="btn btn-sign btn-colored"
              description="Sign up"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
