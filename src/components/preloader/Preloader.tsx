import { useAppSelector } from '../../app/hooks';
import { localizationObj } from '../../features/localization';

const Preloader = () => {
  const { lang } = useAppSelector((state) => state.langStorage);
  return <div>{localizationObj[lang].loading}</div>;
};

export { Preloader };
