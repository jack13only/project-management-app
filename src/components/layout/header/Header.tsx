import { FC, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../buttons/header/PrimaryButton';
import logo from '../../../images/icons/logo.svg';
import './Header.scss';
import { PATHS } from '../../../shared/constants/routes';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { saveTokenToLS } from '../../../features/ls-load-save';
import { logoutUser } from '../../../reducers/auth';
import decodeUserId from '../../../features/decodeUserId';
import { useGetUserByIdQuery, usePostBoardMutation } from '../../../app/RtkQuery';
import { setEmptyUser, setUserData } from '../../../reducers/userReducer';
import { TertiaryButton } from '../../buttons';

const getRandomTitleBoard = () => Math.floor(Math.random() * 100).toString();

const Header: FC = () => {
  const [postBoard] = usePostBoardMutation();
  const [scrolledPage, isScrolledPage] = useState(false);
  const body = window.document.body as HTMLBodyElement;
  const heightScrollTop = 170;
  const navigate = useNavigate();
  const location = useLocation();
  const { userToken } = useAppSelector((state) => state.authStorage);
  const { userName } = useAppSelector((state) => state.userStorage);
  const dispatch = useAppDispatch();

  const listenScrollEvent = () => {
    body.scrollTop > heightScrollTop ? isScrolledPage(true) : isScrolledPage(false);
  };

  const userId = decodeUserId(userToken); // receive userId
  const { data } = useGetUserByIdQuery(userId);

  const addNewBoard = async () =>
    await postBoard({ title: getRandomTitleBoard(), description: "it's a description" });

  useEffect(() => {
    if (data && 'name' in data && 'id' in data) {
      dispatch(
        setUserData({
          userName: data.name,
          userId: data.id,
        })
      );
    }
  }, [userId, data]);

  useEffect(() => {
    body.addEventListener('scroll', listenScrollEvent);
    return () => body.removeEventListener('scroll', listenScrollEvent);
  }, [scrolledPage]);

  return (
    <header data-testid="header" className={'header' + (scrolledPage ? ' header-scrolled' : '')}>
      <div className="wrapper header__wrapper">
        <div className="header__logo__wrapper">
          <Link to={PATHS.main} className={'header__logo' + (userToken ? ' border-right' : '')}>
            <img src={logo} alt="logo" className="header__logo-img" />
          </Link>
          {userToken && (
            <>
              <Link to={PATHS.boards}>
                <div className="boards-logo__wrapper">
                  <div className="boards-logo" />
                  <div className="boards-logo-description">Boards</div>
                </div>
              </Link>
              {location.pathname === '/boards' && (
                <TertiaryButton
                  className="button__tertiary board__new-btn"
                  type="button"
                  description="+ Create a new board"
                  onClick={addNewBoard}
                />
              )}
            </>
          )}
        </div>
        <div className="header__navigation">
          <div className="header__buttons">
            {!userToken && (
              <>
                <PrimaryButton
                  dataTestId="PrimaryButton"
                  type="button"
                  className="btn btn-log btn-bordered"
                  description="Sign In"
                  onClick={() => navigate(PATHS.signIn, { replace: true })}
                />
                <PrimaryButton
                  dataTestId="PrimaryButton"
                  type="button"
                  className="btn btn-sign btn-colored"
                  description="Sign up"
                  onClick={() => navigate(PATHS.signUp, { replace: true })}
                />
              </>
            )}
            {userToken && (
              <>
                <div>{userName}</div>
                <PrimaryButton
                  dataTestId="PrimaryButton"
                  type="button"
                  className="btn btn-sign btn-colored"
                  description="Sign out"
                  onClick={() => {
                    dispatch(logoutUser());
                    dispatch(setEmptyUser());
                    saveTokenToLS('');
                    console.log('logout');
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
