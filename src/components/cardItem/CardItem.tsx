import React, { FC, useEffect, useState } from 'react';
import { Modal, Textarea } from '..';
import { DeleteButton } from '../buttons';

import { useDeleteTaskMutation, useGetUsersQuery, useUpdateTaskMutation } from '../../app/RtkQuery';

import './CardItem.scss';
import { useAppSelector } from '../../app/hooks';
import { Draggable } from 'react-beautiful-dnd';
import { localizationObj } from '../../features/localization';
import { ChangeTitleBtns } from '../buttons';

interface CardItemProps {
  id: string;
  cardTitle: string;
  cardDescription: string;
  columnId: string;
  boardId: string;
  userId: string;
  order: number;
  index: number;
}

const CardItem: FC<CardItemProps> = ({
  id,
  cardTitle,
  cardDescription,
  order,
  columnId,
  boardId,
  userId: userOwnerId,
  index,
}) => {
  const [isTitleOpenToChange, setIsTitleOpenToChange] = useState(false);
  const [taskTitle, setTaskTitle] = useState(cardTitle);
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [isUserChangeModal, setIsUserChangeModal] = useState<boolean>(false);
  const { userId } = useAppSelector((state) => state.userStorage);
  const { lang } = useAppSelector((state) => state.langStorage);
  const { data: users = [] } = useGetUsersQuery('');
  const [userOwner, setUserOwner] = useState<string>('');

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
          description: cardDescription,
          userId,
        },
      });
    }
  };

  const removeTask = async () => {
    await deleteTask({
      boardId,
      columnId,
      taskId: id,
    });
    setActiveModal(false);
  };

  const changeUser = async (newUserId: string) => {
    if (!users.length) return;
    await updateTask({
      columnId,
      boardId,
      taskId: id,
      task: {
        title: cardTitle,
        order,
        description: '2222',
        userId: newUserId,
      },
    });
    setActiveModal(false);
  };

  useEffect(() => {
    if (!activeModal) {
      setIsDeleteModal(false);
      setIsUserChangeModal(false);
    }
  }, [activeModal]);

  useEffect(() => {
    if (users.length) {
      const userName = users.find((user: { id: string; name: string }) => user.id === userOwnerId);
      setUserOwner(userName ? userName.name : 'Deleted');
    }
  }, [users, userOwnerId]);

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
                <span
                  className="task-owner"
                  onClick={() => {
                    setIsUserChangeModal(true);
                    setActiveModal(true);
                  }}
                >
                  {userOwner}
                </span>
                <DeleteButton
                  type="button"
                  id={id}
                  onClick={() => {
                    setActiveModal(true);
                    setIsDeleteModal(true);
                  }}
                />
              </li>

              <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                <div>
                  {isDeleteModal && (
                    <div className="modal__wrapper">
                      <div className="modal__img" />
                      <div className="modal__text">
                        <h2>{`${localizationObj[lang].doYouWantToDelete} '${cardTitle}' ?`}</h2>
                        <ChangeTitleBtns
                          onClickSubmit={removeTask}
                          onClickCancel={() => setActiveModal(false)}
                        />
                      </div>
                    </div>
                  )}
                  {isUserChangeModal && (
                    <div className="modal__wrapper">
                      <div className="modal__img" />
                      <div className="modal__text">
                        <h2>{`${localizationObj[lang].doYouWantToChangeUser}`}</h2>
                        <ul className="users-list">
                          {users.map((user: { id: string; name: string }) => (
                            <li
                              key={user.id}
                              onClick={() => {
                                changeUser(user.id);
                              }}
                            >
                              {user.name}
                            </li>
                          ))}
                        </ul>
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
                  )}
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
