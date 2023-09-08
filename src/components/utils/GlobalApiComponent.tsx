import { useRouter } from 'next/router';
import React from 'react';

import { handleAxiosError } from '@/api/apiUtils/AxiosConfig';
import { isAuthenticated } from '@/api/apiUtils/auth';
import { getMe } from '@/api/userApi';
import { UserContext } from '@/context/UserContext';
import { IUserDetails } from '@/types/api.types';
import { isServer } from '@/utils';

function GlobalApiComponent() {
  const router = useRouter();
  const { userState, userDispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    (async () => {
      if (isServer() === false) {
        if (isAuthenticated() && router.isReady) {
          if (!userState.me) {
            try {
              const me: IUserDetails = await getMe();
              userDispatch({
                type: 'SET_USER',
                payload: me
              });
            } catch (e: any) {
              const { status } = handleAxiosError(e);
              if (status == 401) {
                router.push(`/auth/sign-in?next=${router.asPath}`);
              }
            }
          }
        } else {
          // call un authenticated api's
        }
      }
    })();
  }, [router, userState.me, userDispatch]);
  return null;
}

export default GlobalApiComponent;
