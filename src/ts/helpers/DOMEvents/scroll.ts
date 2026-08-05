let overflow = document.body.style.overflow;

function setBlur(value?: number) {
  const element = document.getElementById('root');
  if (element) element.style.filter = value ? `blur(${value}px)` : 'none';
}

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
  setBlur(1);
  return () => {
    on();
    setBlur();
  };
}

export default {
  on,
  off,
  useOnOff,
};
