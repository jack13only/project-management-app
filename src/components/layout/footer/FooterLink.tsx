import { FC } from 'react';

interface FooterItemProps {
  href: string;
  className: string;
}

const FooterLink: FC<FooterItemProps> = ({ href, className }) => {
  return <a href={href} className={className} target="_blank" rel="noreferrer" />;
};

export { FooterLink };
