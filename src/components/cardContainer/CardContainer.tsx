import { FC, ChangeEvent } from 'react';

import { Textarea } from '..';
import { useAppSelector } from '../../app/hooks';
import { localizationObj } from '../../features/localization';
import { SecondaryButton, DeleteButton } from '../buttons';

import './CardContainer.scss';

interface CardContainerProps {
  isOpenCard: boolean;
  onClick: () => void;
  cardTitle: string;
  handleCardTitle: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  addCard: () => void;
}

const CardContainer: FC<CardContainerProps> = ({
  isOpenCard,
  onClick,
  cardTitle,
  handleCardTitle,
  addCard,
}) => {
  const { lang } = useAppSelector((state) => state.langStorage);
  return (
    <section className={isOpenCard ? 'card__container' : 'card__container hidden'}>
      <Textarea
        className="textarea"
        cols={10}
        rows={3}
        placeholder={localizationObj[lang].addATitle}
        value={cardTitle}
        onChange={handleCardTitle}
      />
      <div className="button__container">
        <SecondaryButton
          className="button__tertiary"
          type="button"
          description={'+ ' + localizationObj[lang].createColumn}
          onClick={addCard}
        />
        <DeleteButton type="button" onClick={onClick} />
      </div>
    </section>
  );
};

export { CardContainer };
