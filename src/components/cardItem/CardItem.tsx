import React, { FC, useEffect, useState } from 'react';
import { Modal, Textarea } from '..';
import { DeleteButton } from '../buttons';

import { useDeleteTaskMutation, useGetUsersQuery, useUpdateTaskMutation } from '../../app/RtkQuery';

import './CardItem.scss';
import { useAppSelector } from '../../app/hooks';
import { Draggable } from 'react-beautiful-dnd';
import { localizationObj } from '../../features/localization';

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
  const [taskTitle, setTaskTitle] = useState(cardTitle);
  const [taskDescription, setTaskDescription] = useState(cardDescription);
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [isUserChangeModal, setIsUserChangeModal] = useState<boolean>(false);
  const { userId } = useAppSelector((state) => state.userStorage);
  const { lang } = useAppSelector((state) => state.langStorage);
  const { data: users = [] } = useGetUsersQuery('');
  const [userOwner, setUserOwner] = useState<string>('');
  const [isOpenTask, setIsOpenTask] = useState(false);

  const handleTaskTitleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskTitle(event.target.value);
  };

  const handleTaskDescriptionInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(event.target.value);
  };

  const submitTaskContent = async () => {
    if (taskTitle.trim().length && taskDescription.trim().length) {
      setIsOpenTask(false);
      setActiveModal(false);

      await updateTask({
        columnId,
        boardId,
        taskId: id,
        task: {
          title: taskTitle,
          order,
          description: taskDescription,
          userId: userOwnerId,
        },
      });
    }
  };

  const cancelTaskContent = () => {
    setIsOpenTask(false);
    setActiveModal(false);
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

  const openTaskHandler = () => {
    setIsOpenTask(true);
    setActiveModal(true);
    setTaskTitle('');
    setTaskDescription('');
  };

  useEffect(() => {
    if (!activeModal) {
      setIsDeleteModal(false);
      setIsUserChangeModal(false);
      setIsOpenTask(false);
    }
  }, [activeModal]);

  useEffect(() => {
    if (users.length) {
      const userName = users.find((user: { id: string; name: string }) => user.id === userOwnerId);
      setUserOwner(userName ? userName.name : 'Deleted');
    }
  }, [users, userOwnerId]);

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <li
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
            <>
              <span key={id} className="task">
                <span className="task-text" onClick={openTaskHandler}>
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
              </span>
            </>
          </li>
        )}
      </Draggable>

      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <>
          {isDeleteModal && (
            <div className="modal__wrapper">
              <div className="modal__img" />
              <div className="modal__text">
                <h2>{`${localizationObj[lang].doYouWantToDelete} '${cardTitle}' ?`}</h2>
                <div className="board__column-btns">
                  <button className="button-modal__wrapper" type="button" onClick={removeTask}>
                    <div className="button-modal button__submit" />
                    <div className="button-modal__description">{localizationObj[lang].submit}</div>
                  </button>
                  <button
                    className="button-modal__wrapper"
                    type="button"
                    onClick={() => setActiveModal(false)}
                  >
                    <div className="button-modal button__cancel" />
                    <div className="button-modal__description">{localizationObj[lang].cancel}</div>
                  </button>
                </div>
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
                <button type="button" onClick={() => setActiveModal(false)}>
                  {localizationObj[lang].cancel}
                </button>
              </div>
            </div>
          )}
          {isOpenTask && (
            <div className="modal__wrapper modal__tasks">
              <h2>
                {`${localizationObj[lang].user}: `}
                {userOwner}
              </h2>
              <div className="modal__text">
                <h1 className="modal__tasks-header">
                  {`${localizationObj[lang].yourTask}: `}
                  {cardTitle}
                </h1>
                <Textarea
                  className="textarea modal__tasks-textarea"
                  cols={2}
                  rows={2}
                  placeholder="Change the title"
                  value={taskTitle}
                  onChange={handleTaskTitleInput}
                />
                <h2>{`${localizationObj[lang].taskDescription}: `}</h2>
                <p>{cardDescription}</p>

                <Textarea
                  className="textarea modal__tasks-textarea"
                  cols={3}
                  rows={3}
                  placeholder="Change the description"
                  value={taskDescription}
                  onChange={handleTaskDescriptionInput}
                />

                <div className="board__task-btns">
                  <button onClick={submitTaskContent}>{localizationObj[lang].submit}</button>
                  <button type="button" onClick={cancelTaskContent}>
                    {localizationObj[lang].cancel}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      </Modal>
    </>
  );
};

export { CardItem };
