import className from 'classnames';
import type { MouseEventHandler } from 'react';

type IButtonProps = {
  xl?: boolean;
  xxl?: boolean;
  disabled: boolean;
  children: string;
  onClick: MouseEventHandler;
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xl': props.xl,
    'btn-xxl': props.xxl,
    'btn-base': !props.xl && !props.xxl,
    'btn-primary': true,
  });

  return (
    <button
      disabled={props.disabled}
      className={btnClass}
      onClick={props.onClick}
    >
      {props.children}

      <style jsx>
        {`
          .btn {
            @apply inline-block rounded-md text-center;
          }

          .btn-base {
            @apply text-lg font-semibold py-2 px-4;
          }

          .btn-xl {
            @apply font-extrabold text-xl py-4 px-6;
          }

          .btn-xxl {
            @apply font-extrabold text-2xl py-4 px-8;
          }

          .btn-primary {
            @apply text-primary-900 bg-primary-500;
          }

          .btn-primary:hover {
            @apply bg-primary-600;
          }
        `}
      </style>
    </button>
  );
};

export { Button };
