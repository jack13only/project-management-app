import React, { FC, useState } from 'react';
import { InputCheckbox, Modal, Textarea } from '..';
import { DeleteButton } from '../buttons';

import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../app/RtkQuery';

import './CardItem.scss';
import { useAppSelector } from '../../app/hooks';
import { localizationObj } from '../../features/localization';

interface CardItemProps {
  id: string;
  cardTitle: string;
  complete: boolean;
  columnId: string;
  boardId: string;
  order: number;
}

const CardItem: FC<CardItemProps> = ({ id, cardTitle, order, columnId, boardId }) => {
  const [isTitleOpenToChange, setIsTitleOpenToChange] = useState(false);
  const [taskTitle, setTaskTitle] = useState(cardTitle);
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const { userId } = useAppSelector((state) => state.userStorage);
  const { lang } = useAppSelector((state) => state.langStorage);

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

  const handlerModal = () => {
    setActiveModal(true);
  };

  const removeTask = async () => {
    await deleteTask({
      boardId,
      columnId,
      taskId: id,
    });
  };

  return (
    <div className="board__task" style={{ order: order }}>
      {isTitleOpenToChange ? (
        <>
          <li className="board__task-input">
            <Textarea
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
        <>
          <li key={id} className="task" style={{ order: order }}>
            <span className="task-text" onClick={handleTaskTitle}>
              {cardTitle}
            </span>
            <DeleteButton type="button" id={id} onClick={handlerModal} />
          </li>

          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <div className="modal__wrapper">
              <div className="modal__img" />
              <div className="modal__text">
                <h2>{`${localizationObj[lang].doYouWantToDelete} '${cardTitle}'`} ?</h2>
                <button type="button" onClick={removeTask}>
                  {localizationObj[lang].submit}
                </button>
                <button type="button" onClick={() => setActiveModal(false)}>
                  {localizationObj[lang].cancel}
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export { CardItem };
