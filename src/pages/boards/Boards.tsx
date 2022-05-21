import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useDeleteBoardMutation,
  useGetBoardsQuery,
  usePostBoardMutation,
} from '../../app/RtkQuery';

import { TertiaryButton } from '../../components/buttons';
import { Modal, PreloaderSuspense } from '../../components';

import { BoardsTypes } from './typesBoards/TypesBoards';

import './Boards.scss';

// a mock title creator for created board,
// will be deleted later, when we add a form for creating a new board;
const getRandomTitleBoard = () => Math.floor(Math.random() * 100).toString();
const BoardsItem = React.lazy(() => import('./BoardsItem'));

const Boards: FC = () => {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [deletedBoardTitle, setdeletedBoardTitle] = useState<string>('');
  const [deletedBoardId, setDeletedBoardId] = useState<string>('');

  const { data = [], error, isLoading } = useGetBoardsQuery('');
  const [postBoard] = usePostBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

  const addNewBoard = async () => await postBoard({ title: getRandomTitleBoard() });

  const handlerModal = (isActiveModal: boolean) => {
    setActiveModal(isActiveModal);
  };

  const getDeletedBoard = (deletedBoardTitle: string, deletedBoardId: string) => {
    setdeletedBoardTitle(deletedBoardTitle);
    setDeletedBoardId(deletedBoardId);
  };

  const cancelDeleteBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveModal(false);
  };

  const deleteBoardItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveModal(false);
    deleteBoard(deletedBoardId);
  };

  return (
    <section className="boards">
      <h2 className="h2">Your boards</h2>
      <div className="boards__container">
        <TertiaryButton
          className="button__tertiary board__new-btn"
          type="button"
          description="+ Create a new board"
          onClick={addNewBoard}
        />

        {!isLoading ? (
          <PreloaderSuspense>
            {data?.map(({ id, title }: BoardsTypes) => {
              return (
                <Link
                  to={`/boards/${id}`}
                  key={id}
                  className="boards-item__link"
                  onClick={
                    activeModal
                      ? (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()
                      : undefined
                  }
                >
                  <BoardsItem
                    title={title}
                    id={id}
                    isActiveModal={handlerModal}
                    getDeletedBoard={getDeletedBoard}
                  />
                </Link>
              );
            })}
          </PreloaderSuspense>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <div className="modal__wrapper">
          <div className="modal__text">
            <h2>Are you sure?</h2>
            <h3>{`Do you want to delete board '${deletedBoardTitle}'`} ?</h3>
            <p>If you press `Yes`, the board will be deleted</p>
            <p>If you would like to cancel, press `Cancel`</p>
            <button type="button" onClick={deleteBoardItem}>
              Yes
            </button>
            <button type="button" onClick={cancelDeleteBoard}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export { Boards };
