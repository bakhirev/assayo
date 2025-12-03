import React, { ReactNode, useState, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import Recommendations from 'ts/components/Recommendations/components/ModalDescription';
import fullScreen from 'ts/store/FullScreen';
import isMobile from 'ts/helpers/isMobile';
import plugins from 'ts/helpers/Plugins';
import { TRANSLATION_MODE } from 'ts/components/Translation';
import TranslationTooltip from 'ts/components/Translation/components/Tooltip';

import SideBar from './components/sidebar';
import Header from './components/header';
import HeaderWithTab from './components/header/WithTab';
import Footer from './components/footer';
import style from './styles/index.module.scss';

interface IPageWrapper {
  children: ReactNode;
}

function MobileView({
  children,
}: IPageWrapper) {
  const { type, page } = useParams<any>();
  const commonItems = useMemo(() => plugins.getPages('global'), [plugins]);
  const padding = type === 'team' && page === 'building'
    ? { padding: 0 }
    : {};

  return (
    <>
      <div className={style.page_wrapper}>
        <div
          className={style.page_wrapper_main_mobile}
          style={padding}
        >
          {children}
        </div>
        <HeaderWithTab/>
        {commonItems}
        <Recommendations/>
        <Footer/>
      </div>
      <div className={style.page_wrapper_header}/>
    </>
  );
}

const DesktopView = observer(({ children }: IPageWrapper): React.ReactElement => {
  const { type, page } = useParams<any>();
  const commonItems = useMemo(() => plugins.getPages('global'), [plugins]);
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
      {commonItems}
      <Recommendations/>
      {TRANSLATION_MODE && <TranslationTooltip/>}
    </div>
  );
});

function PageWrapper({ children }: IPageWrapper) {
  const [localIsMobile, setLocalIsMobile] = useState<boolean>(isMobile);

  useEffect(() => {
    function handleResize() {
      setLocalIsMobile(window.innerWidth < 700 || isMobile);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return localIsMobile
    ? (<MobileView>{children}</MobileView>)
    : (<DesktopView>{children}</DesktopView>);
}

PageWrapper.defaultProps = {
  selectedMenuItem: '',
};

export default PageWrapper;
