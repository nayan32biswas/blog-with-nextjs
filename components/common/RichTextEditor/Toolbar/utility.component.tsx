import React, { PropsWithChildren, ReactNode, Ref } from 'react';
import ReactDOM from 'react-dom';
import { css, cx } from '@emotion/css';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

interface ButtonProps extends BaseProps {
  active: boolean;
  reversed: boolean;
}

export const Button = React.forwardRef<HTMLSpanElement, PropsWithChildren<ButtonProps>>(
  ({ className, active, reversed, ...props }, ref: Ref<HTMLSpanElement>) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className as string,
        css`
          cursor: pointer;
          color: ${reversed ? (active ? 'white' : '#fff') : active ? 'black' : '#000'};
          padding: 5px;
          border: 2px solid #eee;
          border-radius: 5px;
        `,
      )}
    />
  ),
);
Button.displayName = 'Button';

export const Menu = React.forwardRef<HTMLDivElement, PropsWithChildren<ButtonProps>>(
  ({ className, ...props }, ref: Ref<HTMLDivElement>) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cx(
        className as string,
        css`
          & > * {
            display: inline-block;
          }
          & > * + * {
            margin-left: 15px;
          }
        `,
      )}
    />
  ),
);
Menu.displayName = 'Menu';

export const Portal = ({ children }: { children?: ReactNode }) => {
  return typeof document === 'object' ? ReactDOM.createPortal(children, document.body) : null;
};

export const Toolbar = React.forwardRef<HTMLDivElement, PropsWithChildren<ButtonProps>>(
  ({ className, ...props }, ref: Ref<HTMLDivElement>) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className as string,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `,
      )}
    />
  ),
);
Toolbar.displayName = 'Toolbar';
