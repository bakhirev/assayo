import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import SectionSlider from 'ts/pages/PageWrapper/components/SectionSlider';
import printStore from 'ts/plugins/Print/components/store';
import fullScreen from 'ts/store/FullScreen';

import plugins from 'ts/helpers/Plugins';

interface ViewProps {
  page?: string;
}

const View = observer(({ page }: ViewProps): React.ReactElement | null => {
  let mode = undefined;
  if (fullScreen.isOpen) mode = 'fullscreen';
  if (printStore.processing) mode = 'print';
  return plugins.getPage(`/team/${page}`, { mode });
});

export default function Team() {
  const { type } = useParams<any>();
  if (type && type !== 'team') return null;

  return <SectionSlider getViewById={(page: string) => <View page={page} />} />;
}
