import { FC } from 'react';
import { Link } from 'react-router-dom';

import { TertiaryButton } from '../../components/buttons';

import './Boards.scss';

const Boards: FC = () => {
  const addNewBoard = () => console.log('new board');

  return (
    <section className="boards">
      <h2 className="h2">Your boards</h2>
      <div className="boards__container">
        <TertiaryButton
          className="button__tertiary board__new"
          type="button"
          description="+ Create a new board"
          onClick={addNewBoard}
        />

        {/* todo: delete the next link after adding functionallity for created board: click on the newboard item - open a new board with columns */}

        <Link to="/boards/board">
          See a New Board Page (example. will be opened after clicking on the new board)
        </Link>
      </div>
    </section>
  );
};

export { Boards };
