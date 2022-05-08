import { FC } from 'react';

interface InputCheckboxProps {
  className: string;
  type: 'checkbox';
  complete: boolean;
  id?: string | undefined;
  toggleCardComplete: (cardId: string | undefined) => void;
}

const InputCheckbox: FC<InputCheckboxProps> = ({
  className,
  type,
  complete,
  id,
  toggleCardComplete,
}) => {
  return (
    <input
      className={className}
      type={type}
      checked={complete}
      onChange={() => toggleCardComplete(id)}
    />
  );
};

export { InputCheckbox };
