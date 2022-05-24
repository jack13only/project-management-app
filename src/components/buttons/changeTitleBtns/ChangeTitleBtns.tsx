interface ChangeTitleBtnsProps {
  onClickSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ChangeTitleBtns = ({ onClickSubmit, onClickCancel }: ChangeTitleBtnsProps) => {
  return (
    <div className="board__column-btns">
      <button type="submit" onClick={onClickSubmit}>
        Submit
      </button>
      <button type="button" onClick={onClickCancel}>
        Cancel
      </button>
    </div>
  );
};

export { ChangeTitleBtns };
