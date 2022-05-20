import React, { FC, useState } from 'react';

import { InputCheckbox } from '../inputCheckbox/InputCheckbox';
import { DeleteButton } from '../buttons';
import { useUpdateTaskMutation } from '../../app/RtkQuery';

import './CardItem.scss';

interface CardItemProps {
  id: string;
  cardTitle: string;
  complete: boolean;
  columnId: string;
  boardId: string;
  order: number;
  removeCard: (cardId: string) => void;
  toggleCardComplete: (cardId: string) => void;
}

const userId = '37e596ea-e3b8-4515-9eb2-48f1e6ed6204';

const CardItem: FC<CardItemProps> = ({
  id,
  cardTitle,
  complete,
  removeCard,
  toggleCardComplete,
  order,
  columnId,
  boardId,
}) => {
  const [isTitleOpenToChange, setIsTitleOpenToChange] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [updateTask] = useUpdateTaskMutation();

  const handleTaskTitle = () => {
    setIsTitleOpenToChange(true);
  };

  const handleTaskTitleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskTitle(event.target.value);
  };

  const cancelTaskTitle = () => {
    setIsTitleOpenToChange(false);
  };

  const submitTaskTitle = async () => {
    if (taskTitle.trim().length) {
      setIsTitleOpenToChange(false);

      await updateTask({
        columnId,
        boardId,
        taskId: id,
        task: {
          title: taskTitle,
          order,
          description: taskTitle,
          userId,
        },
      });
    }
  };

  return (
    <div className="board__task" style={{ order: order }}>
      {isTitleOpenToChange ? (
        <>
          <li className="board__task-input">
            <textarea
              className="textarea"
              cols={3}
              rows={3}
              placeholder="Your task"
              value={taskTitle}
              onChange={handleTaskTitleInput}
            />
          </li>
          <div className="board__task-btns">
            <button onClick={submitTaskTitle}>Save</button>
            <button type="button" onClick={cancelTaskTitle}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <li key={id} className="task" style={{ order: order }}>
          <InputCheckbox
            className="task-checkbox"
            type="checkbox"
            complete={complete}
            id={id}
            toggleCardComplete={toggleCardComplete}
          />
          <span className="task-text" onClick={handleTaskTitle}>
            {cardTitle}
          </span>
          <DeleteButton
            className="task-delete"
            type="button"
            description="&times;"
            id={id}
            removeCard={removeCard}
          />
        </li>
      )}
    </div>
  );
};

export { CardItem };
