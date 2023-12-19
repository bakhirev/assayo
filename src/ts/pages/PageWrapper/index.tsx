import React, { ReactNode } from 'react';

import Recommendations from 'ts/components/Recommendations/components/ModalDescription';
import isMobile from 'ts/helpers/isMobile';

import SideBar from './components/sidebar';
import Header from './components/header';
import Footer from './components/footer';
import Print from './components/Print';
import style from './styles/index.module.scss';
import LightHeader from './components/LightHeader';

interface IPageWrapper {
  children: ReactNode;
  selectedMenuItem?: string;
}

function PageWrapper({
  children,
}: IPageWrapper) {
  return (
    <div className={style.page_wrapper}>
      {!isMobile && <SideBar />}
      {isMobile
        ? <LightHeader />
        : <Header />
      }
      <div className={style.page_wrapper_main}>
        {children}
      </div>
      <Print />
      <Recommendations />
      {isMobile && <Footer />}
    </div>
  );
}

PageWrapper.defaultProps = {
  selectedMenuItem: '',
};

export default PageWrapper;
