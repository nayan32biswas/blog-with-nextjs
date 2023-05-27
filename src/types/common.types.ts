import { ReactNode } from 'react';

export interface ObjectType {
  [key: string]: any;
}

export type ComponentChildrenProps = {
  children: ReactNode;
};
