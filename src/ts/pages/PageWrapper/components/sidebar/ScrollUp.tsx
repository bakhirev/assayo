import React, { useEffect, useState } from 'react';

import style from '../../styles/scrollUp.module.scss';

function scrollTop() {
  if (!window.scrollY) return;
  const top = window.scrollY * 0.7;
  window.scrollTo(0, top > 20 ? top : 0);
  setTimeout(scrollTop, 30);
}

function SideBarScrollUp() {
  const [isShow, setShow] = useState<boolean>(false);

  useEffect(() => {
    function updateScroll() {
      setShow(window.scrollY > document.body.offsetHeight);
    }

    window.addEventListener('scroll', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, [window.scrollY]);

  if (!isShow) return null;

  return (
    <div
      className={style.scroll_up_button}
      onClick={() => {
        scrollTop();
      }}
    >
      <img
        className={style.scroll_up_button_icon}
        src="./assets/list/arrow.svg"
      />
    </div>
  );
}

export default SideBarScrollUp;
