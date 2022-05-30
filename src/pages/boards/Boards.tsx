import React, { FC, useState, MouseEvent, lazy } from 'react';
import { Link } from 'react-router-dom';
import {
  useDeleteBoardMutation,
  useGetBoardsQuery,
  useGetUsersQuery,
  usePostBoardMutation,
} from '../../app/RtkQuery';

import { Modal, PreloaderSuspense } from '../../components';
import { Preloader } from '../../components/preloader/Preloader';

import { BoardsTypes } from './typesBoards/TypesBoards';

import './Boards.scss';
import { useAppSelector } from '../../app/hooks';
import { localizationObj } from '../../features/localization';
import { ChangeTitleBtns } from '../../components/buttons';

const BoardsItem = lazy(() => import('./BoardsItem'));

const Boards: FC = () => {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [deletedBoardTitle, setDeletedBoardTitle] = useState<string>('');
  const [deletedBoardId, setDeletedBoardId] = useState<string>('');
  const { lang } = useAppSelector((state) => state.langStorage);

  const { data = [], error, isLoading } = useGetBoardsQuery('');
  const { data: users = [] } = useGetUsersQuery('');
  const [postBoard] = usePostBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  const handlerModal = (isActiveModal: boolean) => {
    setActiveModal(isActiveModal);
  };

  const getDeletedBoard = (deletedBoardTitle: string, deletedBoardId: string) => {
    setDeletedBoardTitle(deletedBoardTitle);
    setDeletedBoardId(deletedBoardId);
  };

  const cancelDeleteBoard = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveModal(false);
  };

  const deleteBoardItem = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveModal(false);
    deleteBoard(deletedBoardId);
  };

  return (
    <section className="boards">
      <h2 className="h2">{localizationObj[lang].yourBoards}</h2>
      <div className="boards__container">
        {!isLoading ? (
          <PreloaderSuspense>
            {data?.map(({ id, title, description }: BoardsTypes) => {
              return (
                <BoardsItem
                  key={id}
                  title={title}
                  id={id}
                  isActiveModal={handlerModal}
                  getDeletedBoard={getDeletedBoard}
                  description={description}
                  activeModalProps={activeModal}
                />
              );
            })}
          </PreloaderSuspense>
        ) : (
          <Preloader />
        )}
      </div>

      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <div className="modal__wrapper">
          <div className="modal__img modal__img-delete" />
          <div className="modal__text">
            <h2>{localizationObj[lang].areYouSure}</h2>
            <h3>{`${localizationObj[lang].doYouWantToDelete} '${deletedBoardTitle}' ?`}</h3>
            <ChangeTitleBtns onClickSubmit={deleteBoardItem} onClickCancel={cancelDeleteBoard} />
          </div>
        </div>
      </Modal>
    </section>
  );
};

export { Boards };
