import {DependencyList, useEffect} from 'react';

export function useKeydown(
  callback: (e: KeyboardEvent) => void,
  deps?: DependencyList | undefined
) {
  useEffect(() => {
    window.addEventListener('keydown', callback);
    return () => {
      window.removeEventListener('keydown', callback);
    };
  }, deps);
}

export function useHandleClick(
  callback: (e: MouseEvent) => any,
  deps?: DependencyList | undefined
) {
  useEffect(() => {
    window.addEventListener('click', callback);
    return () => {
      window.removeEventListener('click', callback);
    };
  }, deps);
}
