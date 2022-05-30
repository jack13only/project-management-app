import { FC } from 'react';
import { WelcomeCard } from './components/welcomeCard/WelcomeCard';
import avatar1 from '../../images/avatar-1.jpg';
import avatar2 from '../../images/avatar-2.jpg';
import avatar3 from '../../images/avatar-3.jpg';
import './WelcomePage.scss';
import { useAppSelector } from '../../app/hooks';
import { localizationObj } from '../../features/localization';

const WelcomePage: FC = () => {
  const { lang } = useAppSelector((state) => state.langStorage);

  return (
    <div data-testid="welcomepage" className="welcome-page">
      <div className="welcome-page__promo">
        <div className="wrapper">
          <div className="welcome-page__content">
            <h1 className="welcome-page__title">{localizationObj[lang].welcome}</h1>
            <h2 className="welcome-page__subtitle">{localizationObj[lang].app}</h2>
            <p>{localizationObj[lang].aboutProject}</p>
          </div>
        </div>
      </div>
      <div className="team">
        <h2 className="h2">{localizationObj[lang].meetOurTeam}</h2>
        <div className="welcome__container">
          <WelcomeCard
            src={avatar2}
            name={localizationObj[lang].shatau}
            specialization="Front-end Developer"
            github="https://github.com/jack13only"
            linkedin="https://www.linkedin.com/in/jack13only/"
          />
          <WelcomeCard
            src={avatar3}
            name={localizationObj[lang].kochieva}
            specialization="Front-end Developer"
            github="https://github.com/VictoriaKochieva"
            linkedin="https://www.linkedin.com/in/victoria-kochieva/"
          />
          <WelcomeCard
            src={avatar1}
            name={localizationObj[lang].karakulka}
            specialization="Front-end Developer"
            github="https://github.com/mitrofanzxc"
            linkedin="https://www.linkedin.com/in/dzmitry-karakulka/"
          />
        </div>
      </div>
    </div>
  );
};

export { WelcomePage };
