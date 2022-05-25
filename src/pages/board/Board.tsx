import React, { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';

import {
  useGetBoardsByIdQuery,
  useGetColumnsQuery,
  usePostColumnMutation,
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

  const { data = [], error, isLoading } = useGetColumnsQuery({ boardId });
  const [postColumn] = usePostColumnMutation();
  const getBoardsById = useGetBoardsByIdQuery(boardId);
  const currentBoardTitle = getBoardsById.data?.title;

  const [columnsList, updateColumnsList] = useState<ColumnType[]>(data);

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

  const reorderColumns = (columnsList: ColumnType[], startIndex: number, endIndex: number) => {
    const columns = [...columnsList];
    const [movedColumn] = columns.splice(startIndex, 1);
    columns.splice(endIndex, 0, movedColumn);
    return columns;
  };

  const onDragEndHandler = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const columns: ColumnType[] = reorderColumns(columnsList, source.index, destination.index);
    updateColumnsList(columns);
  };

  useEffect(() => {
    updateColumnsList(data);
  }, [data]);

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
