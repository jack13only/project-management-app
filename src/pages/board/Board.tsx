import React, { FC, useEffect, useState } from 'react';
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
import { RootState, store } from '../../app/store';

import './Board.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TaskType } from '../../app/apiTypes';
import { TasksList } from '../../components/boardColumn/BoardColumn';
const BoardColumn = React.lazy(() => import('../../components/boardColumn/BoardColumn'));

export interface ColumnType {
  title: string;
  id: string;
  order: number;
}

type Tasks = {
  title: string;
  order: number;
  description: string;
  userId: string;
};

const Board: FC = () => {
  const { id } = useParams();
  const boardId = id ?? '';

  const api = apiUser;
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.userStorage);

  const { data: data1 = [], error, isLoading } = useGetColumnsQuery({ boardId });
  const [postColumn] = usePostColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const [postTask] = usePostTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const getBoardsById = useGetBoardsByIdQuery(boardId);
  const currentBoardTitle = getBoardsById.data?.title;

  const [columnsList, updateColumnsList] = useState<ColumnType[]>([]);
  const [tasks, setTasks] = useState<TasksList[]>([]);

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
    await postTask({
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
    await deleteTask({
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
    await updateTask({
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

  const reorderTasks = (
    tasksList: TasksList[],
    startIndex: number,
    endIndex: number,
    columnId: string,
    taskId: string
  ) => {
    const [movedTask] = tasksList.filter((task) => task.id === taskId);
    updateTaskHandler(columnId, movedTask.title, taskId, endIndex + 1);
  };

  const onDragEndHandler = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === boardId && type === 'tasks') return;

    //get tasks of current column
    const tasks = dispatch(
      api.endpoints.getTasks.initiate({
        columnId: source.droppableId,
        boardId,
      })
    );

    //get task to dragg to another column
    const task = dispatch(
      api.endpoints.getTaskById.initiate({
        columnId: source.droppableId,
        boardId,
        taskId: draggableId,
      })
    );

    //if dragging to another column
    if (source.droppableId !== destination.droppableId && type === 'tasks') {
      deleteTaskFromCurrentCol(source.droppableId, draggableId);

      task
        .then((res) => addTaskToAnotherColumn(destination.droppableId, res.data.title))
        .catch((error) => console.log('error', error));

      return;
    }

    //if dragging inside column
    if (source.droppableId === destination.droppableId && type === 'tasks') {
      tasks
        .then((res) => res.data)
        .then((data) =>
          reorderTasks(data, source.index, destination.index, source.droppableId, draggableId)
        )
        .catch((error) => console.log('error', error));
      return;
    }

    //dragColumns
    if (type === 'columns') {
      const columns: ColumnType[] = reorderColumns(columnsList, source.index, destination.index);
      updateColumnsList(columns);
    }
  };

  useEffect(() => {
    if (data1.length) {
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
