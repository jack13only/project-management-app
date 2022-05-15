import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../shared/constants/routes';
import Signup from '../signup/Signup';

const WelcomePage: FC = () => {
  return (
    <div data-testid="welcomepage">
      <div>Welcome Page</div>
      <Signup></Signup>
      <Link to={PATHS.boards}>Link to Boards</Link>
    </div>
  );
};

export { WelcomePage };
