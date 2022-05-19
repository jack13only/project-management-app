import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { saveTokenToLS } from '../../features/ls-load-save';
import { loginUser } from '../../reducers/auth';
import { PATHS } from '../../shared/constants/routes';

const WelcomePage: FC = () => {
  const { userToken } = useAppSelector((state) => state.authStorage);
  const dispatch = useAppDispatch();
  return (
    <div data-testid="welcomepage">
      <div>Welcome Page</div>
      {userToken && (
        <>
          <p>
            <Link to={PATHS.boards}>Link to Boards</Link>
          </p>
          <button
            onClick={() => {
              dispatch(loginUser(''));
              saveTokenToLS('');
              console.log('logout');
            }}
          >
            Sign out
          </button>
        </>
      )}
      {!userToken && (
        <>
          <p>
            <Link to={PATHS.signIn}>Link to Signin</Link>
          </p>
          <p>
            <Link to={PATHS.signUp}>Link to Signun</Link>
          </p>
        </>
      )}
    </div>
  );
};

export { WelcomePage };
