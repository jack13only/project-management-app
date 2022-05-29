import React, { FC, RefObject, useEffect, useRef, useState } from 'react';

import { DeleteButton, TertiaryButton } from '../buttons';
import { BoardColumnTitle, CardList, Modal } from '..';

import './BoardColumn.scss';

import { useDeleteColumnMutation, useGetTasksQuery, usePostTaskMutation } from '../../app/RtkQuery';

import './BoardColumn.scss';
import { useAppSelector } from '../../app/hooks';
import { Draggable } from 'react-beautiful-dnd';
import { localizationObj } from '../../features/localization';

type BoardColumnProps = {
  columnTitle: string;
  boardId: string;
  columnId: string;
  order: number;
  index: number;
};

const BoardColumn: FC<BoardColumnProps> = ({ columnTitle, boardId, columnId, order, index }) => {
  const columnRef = useRef() as RefObject<HTMLDivElement>;
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [isOpenCard, setIsOpenCard] = useState<boolean>(false);
  const { userId } = useAppSelector((state) => state.userStorage);
  const { lang } = useAppSelector((state) => state.langStorage);
  const { data = [], error, isLoading } = useGetTasksQuery({ columnId, boardId });
  const [deleteColumn] = useDeleteColumnMutation();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [postTask] = usePostTaskMutation();
  const [isTask, setIsTask] = useState(false);
  const [isColumn, setIsColumn] = useState(false);

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

  const removeColumn = async () => {
    setActiveModal(false);
    await deleteColumn({ boardId, columnId });
  };

  const addTask = async () => {
    if (taskTitle.trim().length && taskDescription.trim().length) {
      await postTask({
        boardId,
        columnId,
        body: {
          title: taskTitle,
          description: taskDescription,
          userId: userId,
        },
      });

      setActiveModal(false);
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  useEffect(() => {
    columnRef.current ? (columnRef.current.scrollTop = columnRef.current.scrollHeight) : null;
  }, [data.length, isOpenCard]);

  useEffect(() => {
    setTaskTitle('');
    setIsOpenCard(false);
  }, [data.length]);

  useEffect(() => {
    if (!activeModal) {
      setIsColumn(false);
      setIsTask(false);
      setTaskTitle('');
      setTaskDescription('');
    }
  }, [activeModal]);

  return (
    <>
      <Draggable draggableId={columnId} index={index}>
        {(provided, snapshot) => (
          <>
            <div
              className="board__column-container"
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              style={{
                boxShadow: snapshot.draggingOver ? '0 10px 15px grey' : '',
                ...provided.draggableProps.style,
              }}
            >
              <div className="board__column" ref={columnRef}>
                <div className="board__column-head">
                  <BoardColumnTitle
                    columnTitle={columnTitle}
                    columnId={columnId}
                    boardId={boardId}
                    order={order}
                  />
                  <DeleteButton
                    type="button"
                    onClick={() => {
                      setIsColumn(true);
                      setActiveModal(true);
                    }}
                  />
                </div>
                <div className="cards__list__container">
                  <CardList tasks={data} />
                </div>
                <div className="card__add">
                  <TertiaryButton
                    className="button__tertiary column__btn"
                    type="button"
                    description={'+ ' + localizationObj[lang].createTask}
                    isOpenCard={isOpenCard}
                    onClick={() => {
                      setIsTask(true);
                      setActiveModal(true);
                    }}
                  />
                </div>
              </div>
            </div>
            <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
              <div className="modal__wrapper">
                {isColumn && (
                  <>
                    <div className="modal__img" />
                    <div className="modal__text">
                      <h2>{`${localizationObj[lang].doYouWantToDelete} '${columnTitle}'`} ?</h2>
                      <button type="button" onClick={removeColumn}>
                        {localizationObj[lang].submit}
                      </button>
                      <button type="button" onClick={() => setActiveModal(false)}>
                        {localizationObj[lang].cancel}
                      </button>
                    </div>
                  </>
                )}

                {isTask && (
                  <div className="modal__text">
                    <h2>Add Task Title</h2>
                    <input
                      type="text"
                      value={taskTitle}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setTaskTitle(event?.target.value)
                      }
                    />
                    <h2>Add task description</h2>
                    <input
                      type="text"
                      value={taskDescription}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setTaskDescription(event?.target.value)
                      }
                    />
                    <button type="button" onClick={addTask}>
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModal(false);
                        setTaskTitle('');
                        setTaskDescription('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </Modal>
          </>
        )}
      </Draggable>
    </>
  );
};

export default BoardColumn;
