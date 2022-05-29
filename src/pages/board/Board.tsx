import React, { FC, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';

import {
  apiUser,
  useDeleteTaskMutation,
  useGetBoardsByIdQuery,
  useGetColumnsQuery,
  usePostColumnMutation,
  usePostTaskMutation,
  useUpdateColumnMutation,
  useUpdateTaskMutation,
} from '../../app/RtkQuery';
import { BackButton } from '../../components/buttons';
import { localizationObj } from '../../features/localization';
import { Preloader } from '../../components/preloader/Preloader';

import './Board.scss';
import { Modal } from '../../components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TasksList } from '../../components/boardColumn/BoardColumn';
const BoardColumn = React.lazy(() => import('../../components/boardColumn/BoardColumn'));

export interface ColumnType {
  title: string;
  id: string;
  order: number;
}

const Board: FC = () => {
  const { id } = useParams();
  const boardId = id ?? '';

  const api = apiUser;
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.userStorage);

  const { data: data1, error, isLoading } = useGetColumnsQuery({ boardId });
  const [postColumn] = usePostColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const [postTask] = usePostTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const getBoardsById = useGetBoardsByIdQuery(boardId);
  const currentBoardTitle = getBoardsById.data?.title;
  const moveRef = useRef(['', '']);
  const { lang } = useAppSelector((state) => state.langStorage);
  const [columnsList, updateColumnsList] = useState<ColumnType[]>([]);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [columnTitle, setColumnTitle] = useState('');

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

  const addNewColumn = async () => {
    if (columnTitle.trim().length) {
      await postColumn({
        boardId: boardId,
        body: {
          title: columnTitle,
        },
      });
      setActiveModal(false);
      setColumnTitle('');
    }
  };

  const updateColumnHandler = async (id: string, title: string, order: number) => {
    await updateColumn({
      columnId: id,
      boardId,
      body: {
        title,
        order,
      },
    });
  };

  const reorderColumns = (columnsList: ColumnType[], startIndex: number, endIndex: number) => {
    const columns = [...columnsList];
    const [movedColumn] = columns.splice(startIndex, 1);
    columns.splice(endIndex, 0, movedColumn);
    updateColumnHandler(movedColumn.id, movedColumn.title, endIndex + 1);
    return columns;
  };

  const addTaskToAnotherColumn = async (
    columnId: string,
    taskTitle: string,
    description: string
  ) => {
    return await postTask({
      columnId,
      boardId,
      body: {
        title: taskTitle,
        description: description,
        userId,
      },
    });
  };

  const deleteTaskFromCurrentCol = async (columnId: string, taskId: string) => {
    return await deleteTask({
      columnId,
      boardId,
      taskId,
    });
  };

  const updateTaskHandler = async (
    columnId: string,
    taskTitle: string,
    taskId: string,
    order: number,
    description: string
  ) => {
    return await updateTask({
      columnId: columnId,
      boardId,
      taskId,
      task: {
        title: taskTitle,
        order,
        description: description,
        userId,
      },
    });
  };

  const reorderTasks = async (
    tasksList: TasksList[],
    endIndex: number,
    columnId: string,
    taskId: string,
    description: string
  ) => {
    const [movedTask] = tasksList.filter((task) => task.id === taskId);
    await updateTaskHandler(columnId, movedTask.title, taskId, endIndex + 1, description);
  };

  const onDragEndHandler = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === boardId && type === 'tasks') return;

    //if dragging to another column
    if (
      source.droppableId !== destination.droppableId &&
      type === 'tasks' &&
      !moveRef.current.includes(draggableId)
    ) {
      moveRef.current.push(draggableId);
      moveRef.current.shift();

      const task = dispatch(
        api.endpoints.getTaskById.initiate({
          columnId: source.droppableId,
          boardId,
          taskId: draggableId,
        })
      );

      task
        .then((res) =>
          Promise.all([
            addTaskToAnotherColumn(destination.droppableId, res.data.title, res.data.description),
            deleteTaskFromCurrentCol(source.droppableId, draggableId),
          ])
        )
        .catch((error) => {
          console.log('error', error);
        });
      task.unsubscribe();
      return;
    }

    //if dragging inside column
    if (source.droppableId === destination.droppableId && type === 'tasks') {
      const tasks = dispatch(
        api.endpoints.getTasks.initiate({
          columnId: source.droppableId,
          boardId,
        })
      );

      tasks
        .then((res) => res.data)
        .then((data) =>
          reorderTasks(data, destination.index, source.droppableId, draggableId, data.description)
        )
        .catch((error) => console.log('error', error));
      tasks.unsubscribe();
      return;
    }

    //dragColumns
    if (type === 'columns') {
      const columns: ColumnType[] = reorderColumns(columnsList, source.index, destination.index);
      updateColumnsList(columns);
    }
  };

  useEffect(() => {
    if (data1) {
      updateColumnsList([...data1].sort((a: ColumnType, b: ColumnType) => a.order - b.order));
    }
  }, [data1]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <div className="board">
          <div className="wrapper">
            <div className="board__title__wrapper">
              <Link to="/boards">
                <BackButton
                  classNameWrapper="btn-back__wrapper"
                  className="btn-back-common btn-back"
                  type="button"
                  description={localizationObj[lang].back}
                />
              </Link>
              <h2 className="board__title">
                <span className="board__title-description">{localizationObj[lang].board} </span>
                {currentBoardTitle}
              </h2>
              <BackButton
                classNameWrapper="btn-back__wrapper"
                className="btn-back-common btn-new"
                type="button"
                description={localizationObj[lang].createColumn}
                onClick={() => setActiveModal(true)}
              />
            </div>
            {!isLoading ? (
              <Droppable droppableId={boardId} direction="horizontal" type="columns">
                {(provided) => (
                  <div
                    className="board__columns board__wrapper"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {columnsList.map(({ title, id, order }: ColumnType, index: number) => {
                      return (
                        <BoardColumn
                          columnTitle={title}
                          key={id}
                          boardId={boardId}
                          columnId={id}
                          order={order}
                          index={index}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ) : (
              <Preloader />
            )}
          </div>
        </div>
      </DragDropContext>

      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <div className="modal__wrapper">
          <div className="modal__text">
            <h2>{`${localizationObj[lang].addATitle}`}</h2>
            <input
              type="text"
              value={columnTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setColumnTitle(event?.target.value)
              }
            />
            <button type="button" onClick={addNewColumn}>
              {localizationObj[lang].submit}
            </button>
            <button type="button" onClick={() => setActiveModal(false)}>
              {localizationObj[lang].cancel}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export { Board };
