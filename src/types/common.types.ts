import { GetServerSidePropsContext } from 'next';
import React from 'react';

export interface ObjectType {
  [key: string]: any;
}

export type ComponentChildrenProps = {
  children: React.ReactNode;
};

export interface BaseApiFuncArgs {
  SSContext?: GetServerSidePropsContext | null;
}

export interface ApiFuncArgs extends BaseApiFuncArgs {
  params?: ObjectType;
  [key: string]: any;
}
