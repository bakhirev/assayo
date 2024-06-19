import React from 'react';
import { observer } from 'mobx-react-lite';

import Money from './components/money';
import Share from './components/share';

import sponsorStore, { MODAL_TYPE } from './store';

const SponsorScreen = observer((): React.ReactElement | null  => {
  if (sponsorStore.type === MODAL_TYPE.MONEY) {
    return <Money/>;
  }
  if (sponsorStore.type === MODAL_TYPE.SHARE) {
    return <Share/>;
  }
  return null;
});

export default SponsorScreen;
