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
import { TertiaryButton } from '../../components/buttons';
import { BackButton } from '../../components/buttons';

import './Board.scss';
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

  const [columnsList, updateColumnsList] = useState<ColumnType[]>([]);

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

  const addNewColumn = async () => {
    await postColumn({
      boardId: boardId,
      body: {
        title: 'new column',
      },
    });
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

  const addTaskToAnotherColumn = async (columnId: string, taskTitle: string) => {
    return await postTask({
      columnId,
      boardId,
      body: {
        title: taskTitle,
        description: taskTitle,
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
    order: number
  ) => {
    return await updateTask({
      columnId: columnId,
      boardId,
      taskId,
      task: {
        title: taskTitle,
        order,
        description: taskTitle,
        userId,
      },
    });
  };

  const reorderTasks = async (
    tasksList: TasksList[],
    endIndex: number,
    columnId: string,
    taskId: string
  ) => {
    const [movedTask] = tasksList.filter((task) => task.id === taskId);
    await updateTaskHandler(columnId, movedTask.title, taskId, endIndex + 1);
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
            addTaskToAnotherColumn(destination.droppableId, res.data.title),
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
        .then((data) => reorderTasks(data, destination.index, source.droppableId, draggableId))
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
    <DragDropContext onDragEnd={onDragEndHandler}>
      <div className="board">
        <div className="wrapper board__wrapper">
          <div className="board__title__wrapper">
            <h2 className="board__title">Board {currentBoardTitle}</h2>
            <Link to="/boards">
              <BackButton type="button" />
            </Link>
          </div>
          {!isLoading ? (
            <Droppable droppableId={boardId} direction="horizontal" type="columns">
              {(provided) => (
                <div
                  className="board__columns"
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
            <div>Loading...</div>
          )}

          <TertiaryButton
            className="button__tertiary column__new-btn"
            type="button"
            description="+ Add a new column"
            onClick={addNewColumn}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export { Board };
