import { useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement>(elRef:React.RefObject<T>, callback:() => void) => {
  useEffect(() => {
    function clickHandler(e:MouseEvent) {
      if (elRef.current && !elRef.current.contains(e.target as Node)) {
        callback();
      }
    }

    window.addEventListener('click', clickHandler);

    return () => {
    window.removeEventListener('click', clickHandler);
    };
  }, [elRef, callback]);

  return null;
};