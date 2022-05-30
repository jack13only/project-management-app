import { FC } from 'react';
import { FooterLink } from './FooterLink';
import { Switcher } from '../../buttons';

import './Footer.scss';
import { useAppSelector } from '../../../app/hooks';
import { localizationObj } from '../../../features/localization';

const Footer: FC = () => {
  const { lang } = useAppSelector((state) => state.langStorage);
  return (
    <footer data-testid="footer" className="footer">
      <div className="wrapper footer__wrapper">
        <Switcher
          description={localizationObj[lang].language}
          type="checkbox"
          id="language"
          name="language"
        />
        <div className="footer__info">
          <div className="footer__logo">
            <FooterLink
              href="https://rs.school/react/"
              className="footer__link footer__logo-link"
            />
          </div>
          <span className="footer__year">2022</span>
        </div>
        <div className="footer__team">
          <h4 className="footer__title">{localizationObj[lang].meetOurTeam}</h4>
          <ul className="footer__contacts">
            <li className="footer__contact">
              <FooterLink
                href="https://github.com/jack13onlycv"
                className="footer__link contact-2"
              />
            </li>
            <li className="footer__contact">
              <FooterLink
                href="https://github.com/VictoriaKochieva"
                className="footer__link contact-3"
              />
            </li>
            <li className="footer__contact">
              <FooterLink
                href="https://github.com/mitrofanzxc"
                className="footer__link contact-1"
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
