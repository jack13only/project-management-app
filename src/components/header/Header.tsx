import React from 'react';
import logo from '../../images/logo.svg';
import LogInBtn from '../buttons/header/LogInBtn';
import SignUpBtn from '../buttons/header/SignUpBtn';
import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="header__logo">
          <img src={logo} alt="logo" className="header__logo-img" />
        </div>

        <div className="header__navigation">
          <div className="header__buttons">
            <LogInBtn />
            <SignUpBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
