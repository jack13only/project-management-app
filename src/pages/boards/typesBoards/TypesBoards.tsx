export interface BoardsTypes {
  title: string;
  id: string;
  order?: number;
  isActiveModal: (shouldShowModal: boolean) => void;
  getDeletedBoard: (boardTitle: string, boardId: string) => void;
}
