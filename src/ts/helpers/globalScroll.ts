let overflow = document.body.style.overflow;

function on() {
  document.body.style.overflow = overflow;
}

function off(delay?: number) {
  overflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  if (delay) setTimeout(on, delay);
}

function useOnOff() {
  off();
  return () => {
    on();
  };
}

export default {
  on,
  off,
  useOnOff,
};
