import { FC, ChangeEvent } from 'react';

import './Textarea.scss';

interface TextareaProps {
  className: string;
  cols: number;
  rows: number;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement>) => void;
}

const Textarea: FC<TextareaProps> = ({
  className,
  cols,
  rows,
  placeholder,
  value,
  onChange,
  onClick,
}) => {
  return (
    <textarea
      className={className}
      cols={cols}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  );
};

export { Textarea };
