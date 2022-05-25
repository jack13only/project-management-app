import React, { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';

import {
  useGetBoardsByIdQuery,
  useGetColumnsQuery,
  usePostColumnMutation,
  useUpdateColumnMutation,
} from '../../app/RtkQuery';
import { TertiaryButton } from '../../components/buttons';
import { BackButton } from '../../components/buttons';
import { PreloaderSuspense } from '../../components/preloader/index';

import './Board.scss';

const BoardColumn = React.lazy(() => import('../../components/boardColumn/BoardColumn'));

export interface ColumnType {
  title: string;
  id: string;
  order: number;
}

const Board: FC = () => {
  const { id } = useParams();
  const boardId = id ?? '';

  const { data: data1 = [], error, isLoading } = useGetColumnsQuery({ boardId });
  const [postColumn] = usePostColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const getBoardsById = useGetBoardsByIdQuery(boardId);
  const currentBoardTitle = getBoardsById.data?.title;

  const [columnsList, updateColumnsList] = useState<ColumnType[]>([]);

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

  const updateColumnHandler = async (
    columnId: string,
    body: {
      title: string;
      order: number;
    }
  ) => {
    await updateColumn({
      columnId,
      boardId,
      body,
    });
  };

  const addNewColumn = async () => {
    await postColumn({
      boardId: boardId,
      body: {
        title: 'new column',
      },
    });
  };

  const reorderColumns = (columnsList: ColumnType[], startIndex: number, endIndex: number) => {
    const columns = [...columnsList];
    const [movedColumn] = columns.splice(startIndex, 1);
    columns.splice(endIndex, 0, movedColumn);
    const body = { title: movedColumn.title, order: endIndex + 1 };
    updateColumnHandler(movedColumn.id, body);
    console.log('startIndex', startIndex);
    console.log('endIndex', endIndex);
    return columns;
  };

  const onDragEndHandler = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const columns: ColumnType[] = reorderColumns(columnsList, source.index, destination.index);
    updateColumnsList(columns);
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
            <Droppable droppableId={boardId} direction="horizontal">
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
