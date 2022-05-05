import { FC } from 'react';
import SignUpBtn from '../buttons/header/SignUpBtn';
import logo from '../../images/logo.svg';
import './Header.scss';

const Header: FC = () => {
  return (
    <header data-testid="header" className="header">
      <div className="wrapper">
        <div className="header__logo">
          <img src={logo} alt="logo" className="header__logo-img" />
        </div>
        <div className="header__navigation">
          <div className="header__buttons">
            <SignUpBtn
              dataTestId="signUpBtn"
              type="button"
              className="btn btn-log btn-bordered"
              description="Log in"
            />
            <SignUpBtn
              dataTestId="signUpBtn"
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

export default Header;
