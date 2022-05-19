import React from 'react';
import './Modal.scss';

type IProps = {
  activeModal: boolean;
  setActiveModal: (active: boolean) => void;
  children: JSX.Element | JSX.Element[];
};

const Modal = (props: IProps) => {
  //for control pls use const [activeModal, setActiveModal] = useState<boolean>(false);
  return (
    <div
      className={props.activeModal ? 'modal active' : 'modal'}
      data-testid="modal"
      onClick={() => {
        props.setActiveModal(false);
      }}
    >
      <div
        className={props.activeModal ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
        <div
          role="button"
          className="modal__close"
          onClick={() => {
            props.setActiveModal(false);
          }}
        >
          &#128939;
        </div>
      </div>
    </div>
  );
};

export default Modal;
