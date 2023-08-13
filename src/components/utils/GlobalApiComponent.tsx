import React from 'react';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { isAuthenticated } from '@/api/apiUtils/auth';
import { getMe } from '@/api/authApi';
import { UserContext } from '@/context/UserContext';
import { IUserDetails } from '@/types/api.types';
import { isServer } from '@/utils';

function GlobalApiComponent() {
  const { userState, userDispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    (async () => {
      if (isServer() === false) {
        if (isAuthenticated()) {
          if (!userState.me) {
            try {
              const me: IUserDetails = await getMe();
              userDispatch({
                type: 'SET_USER',
                payload: me
              });
            } catch (e: any) {
              const { message } = handleAxiosError(e);
              alert(message);
            }
          }
        } else {
          // call un authenticated api's
        }
      }
    })();
  }, [userState.me, userDispatch]);
  return null;
}

export default GlobalApiComponent;
