import React from 'react';
import { observer } from 'mobx-react-lite';

import Share from './components/share';

import sponsorStore, { MODAL_TYPE } from './store';

const SponsorScreen = observer((): React.ReactElement | null  => {
  if (sponsorStore.type === MODAL_TYPE.SHARE) {
    return <Share/>;
  }
  return null;
});

export default SponsorScreen;
