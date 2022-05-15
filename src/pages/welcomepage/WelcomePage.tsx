import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../shared/constants/routes';

const WelcomePage: FC = () => {
  return (
    <div data-testid="welcomepage">
      <div>Welcome Page</div>
      <p>
        <Link to={PATHS.boards}>Link to Boards</Link>
      </p>
      <p>
        <Link to={PATHS.signIn}>Link to Signin</Link>
      </p>
      <p>
        <Link to={PATHS.signUp}>Link to Signun</Link>
      </p>
    </div>
  );
};

export { WelcomePage };
