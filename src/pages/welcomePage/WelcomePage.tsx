import { FC } from 'react';
import { WelcomeCard } from './components/welcomeCard/WelcomeCard';
import avatar1 from '../../images/avatar-1.jpg';
import avatar2 from '../../images/avatar-2.jpg';
import avatar3 from '../../images/avatar-3.jpg';
import './WelcomePage.scss';

const WelcomePage: FC = () => {
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
    </div>
  );
};

export { WelcomePage };
