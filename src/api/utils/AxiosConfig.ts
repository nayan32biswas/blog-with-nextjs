import baseApi from 'axios';

baseApi.defaults.headers.common['X-API-TOKEN'] = 'nomoreapikey';
baseApi.defaults.headers.common['Accept'] = 'application/json';

const authApi = async (config: any) => {
  const callBack = baseApi(config);
  return callBack
    .then(() => {
      return callBack;
    })
    .catch(async (error) => {
      if (error?.response?.status === 422) {
        return error;
      } else if (error?.response?.status === 400 || error?.response?.status === 403) {
        return error.response;
      } else if (error.response == null) {
        return error;
      } else if (error?.response?.status === 401) {
        const result = await fetch('/');
        if (result !== null) {
          try {
            config.headers = {
              common: {
                'X-JWT-TOKEN': `Bearer ${result}`
              }
            };
          } catch (error) {
            console.log(error);
          }
          return baseApi(config);
        } else {
          return baseApi(config);
        }
      } else if (error?.response?.status === 503) {
        return error;
      } else if (error.code === 'ECONNABORTED') {
        return baseApi(config);
      } else {
        if (error.response.data.message) {
          return error.response.data.message;
        }
        return error;
      }
    });
};

export { authApi, baseApi };
