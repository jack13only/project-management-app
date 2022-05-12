import { FC } from 'react';
import { Link } from 'react-router-dom';

import { FooterLink } from '../../components/layout/footer/FooterLink';

const WelcomePage: FC = () => {
  return (
    <div data-testid="welcomepage">
      <h2 className="h2">Our Team</h2>
      <ul className="footer__contacts">
        <li className="footer__contact">
          <FooterLink href="https://github.com/mitrofanzxc" className="footer__link contact-1" />
        </li>
        <li className="footer__contact">
          <FooterLink href="https://github.com/jack13onlycv" className="footer__link contact-2" />
        </li>
        <li className="footer__contact">
          <FooterLink
            href="https://github.com/VictoriaKochieva"
            className="footer__link contact-3"
          />
        </li>
      </ul>
      <Link to="/boards">Link to Boards</Link>
    </div>
  );
};

export { WelcomePage };
