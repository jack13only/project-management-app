import { FC, useEffect, useState, lazy } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

import {
  useGetBoardsByIdQuery,
  useGetColumnsQuery,
  usePostColumnMutation,
  useUpdateColumnMutation,
} from '../../app/RtkQuery';
import { BackButton } from '../../components/buttons';
import { localizationObj } from '../../features/localization';

import './Board.scss';

const BoardColumn = lazy(() => import('../../components/boardColumn/BoardColumn'));

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
  const { lang } = useAppSelector((state) => state.langStorage);

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
              onClick={addNewColumn}
            />
          </div>
          {!isLoading ? (
            <Droppable droppableId={boardId} direction="horizontal">
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
            <div>{localizationObj[lang].loading}</div>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export { Board };
