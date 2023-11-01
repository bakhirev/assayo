import React from 'react';

import localization from 'ts/helpers/Localization';

import style from '../index.module.scss';

function CommitFormat() {
  return (
    <>
      <p className={style.nothing_found_title}>
        {localization.get('uiKit.nothingFound.common.title')}
      </p>
      <p className={style.nothing_found_text}>
        Система обработает больше данных, если коммиты будут подписаны в формате &quot;
        <a
          href="https://www.conventionalcommits.org/en/v1.0.0/"
          target="_blank"
          rel="noreferrer"
          className={style.nothing_found_link}
        >
          Git commit message convention
        </a>
        &quot;. Шаблон:
      </p>
      <p className={style.nothing_found_console}>
        {localization.get('uiKit.nothingFound.common.console')}
      </p>
      <p className={style.nothing_found_text}>
        {localization.get('uiKit.nothingFound.common.example')}
      </p>
      <p className={style.nothing_found_console}>
        JIRA-0001 feat(profile): add user avatar<br/>
        JIRA-0002 fix(profile): changed link for user web site<br/>
        JIRA-0003 test(profile): added unit tests for edit phone
      </p>
    </>
  );
}

export default CommitFormat;
