import React, { ReactNode } from 'react';

import Recommendations from 'ts/components/Recommendations/components/ModalDescription';
import isMobile from 'ts/helpers/isMobile';

import SideBar from './components/sidebar';
import Header from './components/header';
import HeaderWithTab from './components/header/WithTab';
import Footer from './components/footer';
import Print from './components/Print';
import style from './styles/index.module.scss';

interface IPageWrapper {
  children: ReactNode;
}

function MobileView({
  children,
}: IPageWrapper) {
  return (
    <>
      <div className={style.page_wrapper}>
        <div className={style.page_wrapper_main_mobile}>
          {children}
        </div>
        <HeaderWithTab/>
        <Print/>
        <Recommendations/>
        <Footer/>
      </div>
      <div className={style.page_wrapper_header}/>
    </>
  );
}

function DesktopView({ children }: IPageWrapper) {
  return (
    <div className={style.page_wrapper}>
      <SideBar/>
      <Header/>
      <div className={style.page_wrapper_main}>
        {children}
      </div>
      <Print/>
      <Recommendations/>
    </div>
  );
}

function PageWrapper({ children }: IPageWrapper) {
  return isMobile
    ? (<MobileView>{children}</MobileView>)
    : (<DesktopView>{children}</DesktopView>);
}

PageWrapper.defaultProps = {
  selectedMenuItem: '',
};

export default PageWrapper;
