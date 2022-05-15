import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { PrimaryButton } from '../../buttons/header/PrimaryButton';

import logo from '../../../images/icons/logo.svg';
import './Header.scss';
import { PATHS } from '../../../shared/constants/routes';

const Header: FC = () => {
  const [scrolledPage, isScrolledPage] = useState(false);
  const body = window.document.body as HTMLBodyElement;
  const heightScrollTop = 170;

  const listenScrollEvent = () => {
    body.scrollTop > heightScrollTop ? isScrolledPage(true) : isScrolledPage(false);
  };

  useEffect(() => {
    body.addEventListener('scroll', listenScrollEvent);
    return () => body.removeEventListener('scroll', listenScrollEvent);
  }, [scrolledPage]);

  return (
    <header data-testid="header" className={'header' + (scrolledPage ? ' header-scrolled' : '')}>
      <div className="wrapper">
        <Link to={PATHS.main} className="header__logo">
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
