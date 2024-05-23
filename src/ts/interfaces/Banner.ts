interface IBanner {
  isDefault?: boolean;
  ref?: string;
  link?: string;
  isOpenInNewTab?: boolean;

  /* Логотип */
  icon?: string;
  title?: string;

  /* Картинка баннера */
  banner?: string;

  /* Текстовы баннер */
  bannerText?: string;
  color?: string;
  backgroundColor?: string;
}

export default IBanner;
