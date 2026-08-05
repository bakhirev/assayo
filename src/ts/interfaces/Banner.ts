interface IBanner {
  ref?: string;
  link?: string;
  isOpenInNewTab?: boolean;

  /* Картинка баннера */
  banner?: string;

  /* Текстовы баннер */
  text?: string;
  textIcon?: string;
  color?: string;
  backgroundColor?: string;
}

export default IBanner;
