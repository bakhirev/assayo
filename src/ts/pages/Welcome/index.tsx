import React from 'react';

import Console from 'ts/components/Console';
import Description from 'ts/components/Description';
import {
  getStringFromFileList,
  getStringsForParser,
} from 'ts/components/DropZone/helpers';
import localization from 'ts/helpers/Localization';
import dataGripStore from 'ts/store/DataGrip';

import style from './styles/index.module.scss';

function WarningInfo() {
  return (
    <h4 className={style.welcome_warning}>
      <Description
        text={localization.get('page.welcome.warning1')}
        className={style.welcome_warning_text}
      />
      <Description
        text={localization.get('page.welcome.warning2')}
        className={style.welcome_warning_text}
      />
    </h4>
  );
}

function Welcome() {
  const command = 'git --no-pager log --raw --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" > log.txt\n';
  return (
    <>
      {process.env.REACT_APP_TYPE !== 'local' && (<WarningInfo />)}
      <section className={style.welcome}>
        <div className={style.welcome_row}>
          <h2 className={style.welcome_first_title}>
            {localization.get('page.welcome.step1')}
          </h2>
          <Console
            className={style.welcome_console}
            textForCopy={command}
          />
          <Description
            text={localization.get('page.welcome.description')}
            className={`${style.welcome_description}`}
          />
          <h2 className={style.welcome_last_title}>
            {localization.get('page.welcome.step2') === 'page.welcome.step2'
              ? ''
              : localization.get('page.welcome.step2')}
            <label className={style.welcome_title_link}>
              {localization.get('page.welcome.step3')}
              <input
                multiple
                type="file"
                style={{ display: 'none' }}
                onChange={async (event: any) => {
                  const files = Array.from(event.target.files);
                  const text = await getStringFromFileList(files);
                  const report = getStringsForParser(text);
                  dataGripStore.setCommits(report);
                }}
              />
            </label>
            {localization.get('page.welcome.step4')}
          </h2>
        </div>
      </section>
    </>
  );
}

export default Welcome;
