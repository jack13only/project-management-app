import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../shared/constants/routes';

const WelcomePage: FC = () => {
  return (
    <div data-testid="welcomepage">
      <div>Welcome Page</div>
      <Link to={PATHS.boards}>Link to Boards</Link>
    </div>
  );
};

export { WelcomePage };
