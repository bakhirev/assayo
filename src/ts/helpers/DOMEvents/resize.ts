import { useEffect } from 'react';

let timeoutId: any = undefined;
let callbacks: Function[] = [];

const handleResize = () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    callbacks.forEach((callback: Function) => callback());
  }, 300);
};

window.addEventListener('resize', handleResize);

export default function useWindowResize(callback: Function, args?: any[]) {
  useEffect(() => {
    callbacks.push(callback);
    return () => {
      callbacks = callbacks.filter((func) => func !== callback);
    };
  }, args);
}
