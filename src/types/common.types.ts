import { NextPageContext } from 'next';
import React from 'react';

export interface ObjectType {
  [key: string]: any;
}

export type ComponentChildrenProps = {
  children: React.ReactNode;
};

export interface BaseApiFuncArgs {
  SSContext?: NextPageContext | null;
}

export interface ApiFuncArgs extends BaseApiFuncArgs {
  params?: ObjectType;
  post_slug?: string;
  [key: string]: any;
}
