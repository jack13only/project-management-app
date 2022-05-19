import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { saveTokenToLS } from '../../features/ls-load-save';
import { loginUser } from '../../reducers/auth';
import { PATHS } from '../../shared/constants/routes';
import { WelcomeCard } from './components/welcomeCard/WelcomeCard';
import avatar1 from '../../images/avatar-1.jpg';
import avatar2 from '../../images/avatar-2.jpg';
import avatar3 from '../../images/avatar-3.jpg';
import './WelcomePage.scss';

const WelcomePage: FC = () => {
  const { userToken } = useAppSelector((state) => state.authStorage);
  const dispatch = useAppDispatch();
  return (
    <div data-testid="welcomepage" className="welcome__page">
      <h2 className="h2">Meet Our Team</h2>
      <div className="welcome__container">
        <WelcomeCard
            src={avatar2}
            name="Yauheni Shatau"
            specialization="Front-end Developer"
            github="https://github.com/jack13only"
            linkedin="https://www.linkedin.com/in/jack13only/"
            instagram="https://www.instagram.com/"
        />
        <WelcomeCard
            src={avatar3}
            name="Victoria Kochieva"
            specialization="Front-end Developer"
            github="https://github.com/VictoriaKochieva"
            linkedin="https://www.linkedin.com/in/victoria-kochieva/"
            instagram="https://www.instagram.com/"
        />
        <WelcomeCard
            src={avatar1}
            name="Dzmitry Karakulka"
            specialization="Front-end Developer"
            github="https://github.com/mitrofanzxc"
            linkedin="https://www.linkedin.com/in/dzmitry-karakulka/"
            instagram="https://www.instagram.com/mitrofanzxc/"
        />
      </div>
      <Link to="/boards">Link to Boards</Link>
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
