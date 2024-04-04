import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitButton from 'ts/components/UiKit/components/Button';
import { Modal, Header, Body, Footer } from 'ts/components/ModalWindow';
import Description from 'ts/components/Description';
import RECOMMENDATION_TYPES from 'ts/helpers/Recommendations/contstants';
import localization from 'ts/helpers/Localization';
import isMobile from 'ts/helpers/isMobile';

import { getFormattedTitle, getDescriptionText } from '../helpers';
import recommendationStore from '../store/index';

import style from '../styles/modal.module.scss';

function getClassName(recommendation?: any) {
  const type = recommendation?.type;
  return {
    [RECOMMENDATION_TYPES.INFO]: style.recommendations_modal_info,
    [RECOMMENDATION_TYPES.FACT]: style.recommendations_modal_fact,
    [RECOMMENDATION_TYPES.WARNING]: style.recommendations_modal_warning,
    [RECOMMENDATION_TYPES.ALERT]: style.recommendations_modal_error,
  }[type || RECOMMENDATION_TYPES.INFO] ?? style.recommendations_modal_fact;
}

const RecommendationDescription = observer(() => {
  const { recommendation } = recommendationStore;
  if (!recommendation) return null;

  const title = getFormattedTitle(recommendation);
  const titleArgs = recommendation?.arguments?.title;
  const className = getClassName(recommendation);
  const parts = getDescriptionText(recommendation).split('\n');
  const subTitle = parts.shift();

  return (
    <Modal
      className={`${className} ${style.recommendations_modal}`}
      onClose={() => {
        recommendationStore.close();
      }}
    >
      <Header className={style.recommendations_modal_header}>
        <span className={style.recommendations_modal_title}>
          {localization.get(title, titleArgs)}
        </span>
        <p className={style.recommendations_modal_sub_title}>
          {subTitle}
        </p>
      </Header>
      <Body>
        <Description
          className={style.recommendations_modal_description}
          text={parts}
        />
      </Body>
      <Footer className={style.recommendations_modal_footer}>
        <UiKitButton
          mode={[ isMobile ? 'primary' : 'border', 'full_size']}
          onClick={() => {
            recommendationStore.close();
          }}
        >
          {localization.get('recommendations.modal.cancel')}
        </UiKitButton>
      </Footer>
    </Modal>
  );
});

export default RecommendationDescription;
