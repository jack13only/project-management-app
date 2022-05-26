export interface BoardsTypes {
  title: string;
  id: string;
  order?: number;
  description: string;
  isActiveModal: (shouldShowModal: boolean) => void;
  getDeletedBoard: (boardTitle: string, boardId: string) => void;
}
