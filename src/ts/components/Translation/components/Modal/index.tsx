import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'ts/components/Translation';

import { Modal, Header, Body, Footer } from 'ts/components/ModalWindow';
import UiKitButton from 'ts/components/UiKit/components/Button';
import notificationsStore from 'ts/components/Notifications/store';
import { DataLoader, Pagination, sendFakeRequest } from 'ts/components/DataLoader';
import ISort from 'ts/interfaces/Sort';
import { IPaginationRequest } from 'ts/interfaces/Pagination';
import { downloadFile } from 'ts/helpers/File';
import localization from 'ts/helpers/Localization';

import translationStore from '../../store';
import View from './View';

const TranslationList = observer((): React.ReactElement | null  => {
  const { t } = useTranslation();
  const content = useMemo(() => translationStore.getList(), [translationStore.isOpen]);

  if (!translationStore.isOpen) return null;

  return (
    <Modal
      mode="big"
      onClose={() => {
        translationStore.hide();
      }}
    >
      <Header>
        {t('uiKit.translation.modal.title')}
      </Header>
      <Body>
        <DataLoader
          loader={(pagination?: IPaginationRequest, sort?: ISort[]) => {
            const data = { ...pagination, size: 5 };
            return sendFakeRequest({ content, pagination: data, sort });
          }}
        >
          <View />
          <Pagination/>
        </DataLoader>
      </Body>
      <Footer>
        <UiKitButton
          mode="second"
          onClick={() => {
            translationStore.hide();
          }}
        >
          {t('uiKit.translation.modal.cancel')}
        </UiKitButton>
        <UiKitButton
          mode="primary"
          onClick={() => {
            const translations = translationStore.export();
            const type = 'text/plain;charset=windows-utf-8;';
            const file = new Blob([translations], { type });
            downloadFile(file, `translations.${localization.language}.txt`);
            notificationsStore.show({
              title: 'Режим переводчика',
              description: 'Вы можете посмотреть актуальный список переводов или экспортировать его',
              type: 'info',
            });
          }}
        >
          {t('uiKit.translation.modal.export')}
        </UiKitButton>
      </Footer>
    </Modal>
  );
});

export default TranslationList;
