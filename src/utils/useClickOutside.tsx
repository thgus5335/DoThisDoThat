import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

interface Params {
  (reference: MutableRefObject<HTMLElement | null>, setState: Dispatch<SetStateAction<boolean>>): void;
}

const useClickOutside: Params = (reference, setState) => {
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (reference.current && !reference.current.contains(event.target as Node)) {
        setState(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
};

export default useClickOutside;
