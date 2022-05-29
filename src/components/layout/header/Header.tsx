import { FC, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '../../../shared/constants/routes';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { saveTokenToLS } from '../../../features/ls-load-save';
import { logoutUser } from '../../../reducers/auth';
import decodeUserId from '../../../features/decodeUserId';
import { useGetUserByIdQuery, usePostBoardMutation } from '../../../app/RtkQuery';
import { setEmptyUser, setUserData } from '../../../reducers/userReducer';
import { PrimaryButton, TertiaryButton } from '../../buttons';

import './Header.scss';
import { localizationObj } from '../../../features/localization';
import Modal from '../../modal/Modal';

const Header: FC = () => {
  const [postBoard] = usePostBoardMutation();
  const [scrolledPage, isScrolledPage] = useState(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [boardTitle, setBoardTitle] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const body = window.document.body as HTMLBodyElement;
  const heightScrollTop = 1;
  const navigate = useNavigate();
  const location = useLocation();
  const { userToken } = useAppSelector((state) => state.authStorage);
  const { userName } = useAppSelector((state) => state.userStorage);
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector((state) => state.langStorage);

  const listenScrollEvent = () => {
    body.scrollTop > heightScrollTop ? isScrolledPage(true) : isScrolledPage(false);
  };

  const userId = decodeUserId(userToken); // receive userId
  const { data } = useGetUserByIdQuery(userId);

  const addNewBoard = async () => {
    if (boardTitle.trim().length && boardDescription.trim().length) {
      await postBoard({ title: boardTitle, description: boardDescription });
      setActiveModal(false);
      setBoardTitle('');
      setBoardDescription('');
    }
  };

  useEffect(() => {
    if (data && 'name' in data && 'id' in data && 'login' in data) {
      dispatch(
        setUserData({
          userName: data.name,
          userId: data.id,
          userLogin: data.login,
        })
      );
    }
  }, [userId, data]);

  useEffect(() => {
    body.addEventListener('scroll', listenScrollEvent);
    return () => body.removeEventListener('scroll', listenScrollEvent);
  }, [scrolledPage]);

  useEffect(() => {
    if (!activeModal) {
      setBoardTitle('');
      setBoardDescription('');
    }
  }, [activeModal]);

  return (
    <>
      <header data-testid="header" className={'header' + (scrolledPage ? ' header-scrolled' : '')}>
        <div className="wrapper header__wrapper">
          <div className="header__logo__wrapper">
            <Link to={PATHS.main} className={'header__logo' + (userToken ? ' border-right' : '')} />
            {userToken && (
              <>
                <Link
                  to={PATHS.boards}
                  className={location.pathname === `${PATHS.boards}` ? 'border-right' : ''}
                >
                  <div className="boards-logo__wrapper">
                    <div className="boards-logo" />
                    <div className="boards-logo-description">
                      {localizationObj[lang].boardsHeader}
                    </div>
                  </div>
                </Link>
                {location.pathname === `${PATHS.boards}` && (
                  <TertiaryButton
                    className="button__tertiary"
                    type="button"
                    description={'+ ' + localizationObj[lang].createBoard}
                    onClick={() => setActiveModal(true)}
                  />
                )}
              </>
            )}
          </div>
          <div className="header__buttons">
            {!userToken && (
              <>
                <PrimaryButton
                  dataTestId="PrimaryButton"
                  type="button"
                  className="btn btn-log btn-bordered"
                  description={localizationObj[lang].signIn}
                  onClick={() => navigate(PATHS.signIn, { replace: true })}
                />
                <PrimaryButton
                  dataTestId="PrimaryButton"
                  type="button"
                  className="btn btn-sign btn-colored"
                  description={localizationObj[lang].signUp}
                  onClick={() => navigate(PATHS.signUp, { replace: true })}
                />
              </>
            )}
            {userToken && (
              <>
                <div
                  className="boards-logo__wrapper"
                  role="button"
                  onClick={() => navigate(PATHS.userProfile)}
                >
                  <div className="boards-logo user-logo" />
                  <div className="boards-logo-description">{userName}</div>
                </div>
                <PrimaryButton
                  dataTestId="PrimaryButton"
                  type="button"
                  className="btn btn-sign btn-colored"
                  description={localizationObj[lang].signOut}
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
      </header>

      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <div className="modal__wrapper">
          <div className="modal__text">
            <h2>{`${localizationObj[lang].addATitle}`}</h2>
            <input
              type="text"
              value={boardTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setBoardTitle(event?.target.value)
              }
            />
            <h2>{`${localizationObj[lang].addADescription}`}</h2>
            <input
              type="text"
              value={boardDescription}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setBoardDescription(event?.target.value)
              }
            />
            <button type="button" onClick={addNewBoard}>
              Submit
            </button>
            <button type="button" onClick={() => setActiveModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export { Header };
