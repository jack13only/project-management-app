import { FC } from 'react';

import { InputCheckbox } from '../inputCheckbox/InputCheckbox';
import { DeleteButton } from '../buttons';

interface CardItemProps {
  id?: string | undefined;
  cardTitle: string;
  complete: boolean;
  removeCard: (cardId: string | undefined) => void;
  toggleCardComplete: (cardId: string | undefined) => void;
}

const CardItem: FC<CardItemProps> = ({
  id,
  cardTitle,
  complete,
  removeCard,
  toggleCardComplete,
}) => {
  return (
    <li key={id} className="task">
      <InputCheckbox
        className="task-checkbox"
        type="checkbox"
        complete={complete}
        id={id}
        toggleCardComplete={toggleCardComplete}
      />
      <span className="task-text">{cardTitle}</span>
      <DeleteButton
        className="task-delete"
        type="button"
        description="&times;"
        id={id}
        removeCard={removeCard}
      />
    </li>
  );
};

export { CardItem };
