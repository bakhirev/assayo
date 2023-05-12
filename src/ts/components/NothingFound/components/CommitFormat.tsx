import React from 'react';

import style from '../index.module.scss';

function CommitFormat() {
  return (
    <>
      <p className={style.nothing_found_title}>
        Нет или недостаточно данных для отображения
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
        Номер_задачи тип(фича): пояснение
      </p>
      <p className={style.nothing_found_text}>
        Например:
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
