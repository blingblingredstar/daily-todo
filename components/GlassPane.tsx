import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

const GlassPane: FC<PropsWithChildren<{ className?: string }>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        'glass rounded-2xl border-solid border-2 border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
