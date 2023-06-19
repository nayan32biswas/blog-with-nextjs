import React from 'react';

import { debounce } from 'lodash';

const useDebounce = (time: number, callback: any) => {
  const ref: any = React.useRef();

  React.useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = React.useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, time);
  }, [time]);

  return debouncedCallback;
};

export default useDebounce;
