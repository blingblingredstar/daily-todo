import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

const Card: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        'rounded-3xl px-10 py-4 drop-shadow-xl bg-white',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
