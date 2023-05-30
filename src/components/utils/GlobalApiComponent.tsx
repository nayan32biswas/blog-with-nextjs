import { useContext, useEffect } from 'react';

import { isAuthenticated } from '@/api/apiUtils/auth';
import { getMe } from '@/api/authApi';
import { UserContext } from '@/context/UserContext';
import { IMinimalUser } from '@/types/api.types';
import { isServer } from '@/utils/utils';

function GlobalApiComponent() {
  const { userState, userDispatch } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (isServer() === false) {
        if (isAuthenticated()) {
          if (!userState.me) {
            const me: IMinimalUser = await getMe();
            userDispatch({
              type: 'SET_USER',
              payload: me
            });
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
