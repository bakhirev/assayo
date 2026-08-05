import React from 'react';

import { Console, Description, splashScreenStore } from 'ts/components/Layout';
import getDataFromFiles from 'ts/helpers/getDataFromFiles';
import { t } from 'ts/helpers/Localization';

import statisticStore from 'ts/store/StatisticsByCommitsStore';
import sourceData from 'ts/store/SourceData';

import style from './index.module.scss';

function WarningInfo() {
  return (
    <div className={style.welcome_warning}>
      <Description
        translationId="page.welcome.warning1"
        className={style.welcome_warning_text}
      />
      <Description
        translationId="page.welcome.warning2"
        className={style.welcome_warning_text}
      />
    </div>
  );
}

function Welcome() {
  const command = 'git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%aN>%aE>%s" > log.txt\n';
  // @ts-ignore
  const hasYandexMetrika = window.ym;
  return (
    <>
      {hasYandexMetrika && (<WarningInfo/>)}
      <section className={style.welcome}>
        <div className={style.welcome_row}>
          <h2 className={style.welcome_first_title}>
            {t('page.welcome.step1')}
          </h2>
          <Console
            className={style.welcome_console}
            textForCopy={command}
          />
          <Description
            translationId="page.welcome.description"
            className={style.welcome_description}
          />
          <h2 className={style.welcome_last_title}>
            {t('page.welcome.step2') === 'page.welcome.step2'
              ? ''
              : t('page.welcome.step2')}
            <label className={style.welcome_title_link}>
              {t('page.welcome.step3')}
              <input
                multiple
                type="file"
                style={{ display: 'none' }}
                onChange={async (event: any) => {
                  const files = Array.from(event.target.files);
                  const fileGroups = await getDataFromFiles(files);
                  sourceData.addGroups(fileGroups);
                  if (fileGroups.gitLog) {
                    splashScreenStore.setDelay(fileGroups.gitLog.length);
                    statisticStore.asyncSetCommits(fileGroups.gitLog);
                  }
                }}
              />
            </label>
            {t('page.welcome.step4')}
          </h2>
        </div>
      </section>
    </>
  );
}

export default Welcome;
