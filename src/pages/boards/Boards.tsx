import { ChangeEvent, FC, useState } from 'react';

import { CardList } from '../../components/cardList/CardList';
import { CardContainer } from '../../components/cardContainer/CardContainer';
import { TertiaryButton } from '../../components/buttons';

import './Boards.scss';

type CardsState = {
  id: string;
  cardTitle: string;
  complete: boolean;
};

const Boards: FC = () => {
  return (
    <section className="boards">
      <h2 className="boards__title">Your boards</h2>
      <div className="boards__container">
        <TertiaryButton
          className="button__tertiary board__new"
          type="button"
          description="+ Create a new board"
          isOpenCard={false}
        />
      </div>
    </section>
  );
};

export { Boards };
