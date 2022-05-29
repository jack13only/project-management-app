import React, { FC, useState } from 'react';
import { InputCheckbox, Modal, Textarea } from '..';
import { DeleteButton } from '../buttons';

import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../app/RtkQuery';

import './CardItem.scss';
import { useAppSelector } from '../../app/hooks';
import { Draggable } from 'react-beautiful-dnd';
import { localizationObj } from '../../features/localization';

interface CardItemProps {
  id: string;
  cardTitle: string;
  complete: boolean;
  columnId: string;
  boardId: string;
  order: number;
  index: number;
  toggleCardComplete: (cardId: string) => void;
}

const CardItem: FC<CardItemProps> = ({
  id,
  cardTitle,
  complete,
  toggleCardComplete,
  order,
  columnId,
  boardId,
  index,
}) => {
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
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className="board__task"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          style={{
            boxShadow: snapshot.isDragging ? '0 10px 15px grey' : '',
            background: snapshot.isDragging ? 'white' : '',
            ...provided.draggableProps.style,
          }}
        >
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
                <button onClick={submitTaskTitle}>{localizationObj[lang].submit}</button>
                <button type="button" onClick={cancelTaskTitle}>
                  {localizationObj[lang].cancel}
                </button>
              </div>
            </>
          ) : (
            <>
              <li key={id} className="task">
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
                    <div className="board__column-btns">
                      <button className="button-modal__wrapper" type="button" onClick={removeTask}>
                        <div className="button-modal button__submit" />
                        <div className="button-modal__description">
                          {localizationObj[lang].submit}
                        </div>
                      </button>
                      <button
                        className="button-modal__wrapper"
                        type="button"
                        onClick={() => setActiveModal(false)}
                      >
                        <div className="button-modal button__cancel" />
                        <div className="button-modal__description">
                          {localizationObj[lang].cancel}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export { CardItem };
