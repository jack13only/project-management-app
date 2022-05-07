import { FC } from 'react';
import { Link } from 'react-router-dom';

const WelcomePage: FC = () => {
  return (
    <div data-testid="welcomepage">
      <div>Welcome Page</div>
      <Link to="/boards">Link to Boards</Link>
    </div>
  );
};

export { WelcomePage };
