import React from 'react';

import { IUserDetails } from '@/types/api.types';

interface IProps {
  user: IUserDetails;
}

function General({ user }: IProps) {
  console.log(user);
  return <div>User General</div>;
}

export default General;
