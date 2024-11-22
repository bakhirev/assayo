import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import Recommendations from 'ts/components/Recommendations/components/ModalDescription';
import fullScreen from 'ts/store/FullScreen';
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

const DesktopView = observer(({ children }: IPageWrapper): React.ReactElement => {
  const { type, page } = useParams<any>();
  const padding = type === 'team' && page === 'building'
    ? { padding: 0 }
    : {};

  if (fullScreen.isOpen) {
    return (
      <>
        <div
          className={style.page_wrapper_main_fullscreen}
          style={padding}
        >
          {children}
        </div>
        <Recommendations/>
      </>
    );
  }

  return (
    <div className={style.page_wrapper}>
      <SideBar/>
      <Header/>
      <div
        className={style.page_wrapper_main}
        style={padding}
      >
        {children}
      </div>
      <Print/>
      <Recommendations/>
    </div>
  );
});

function PageWrapper({ children }: IPageWrapper) {
  return isMobile
    ? (<MobileView>{children}</MobileView>)
    : (<DesktopView>{children}</DesktopView>);
}

PageWrapper.defaultProps = {
  selectedMenuItem: '',
};

export default PageWrapper;
