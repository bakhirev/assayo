import React from 'react';

import style from '../styles/console.module.scss';

function Console() {
  return (
    <div className={`${style.welcome_console}`}>
      <div className={`${style.welcome_console_header}`}>
        <span className={`${style.welcome_console_header_icon}`}></span>
        <span className={`${style.welcome_console_header_icon}`}></span>
        <span className={`${style.welcome_console_header_icon}`}></span>
      </div>
      <div className={`${style.welcome_console_body}`}>
        {'git --no-pager log --numstat --oneline --all --no-merges --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" | sed -e \'s/\\\\/\\\\\\\\/g\' | sed -e \'s/`/"/g\' | sed -e \'s/^/report.push(\\`/g\' | sed \'s/$/\\`\\);/g\' | sed \'s/\\$/_/g\' > dump.git\n'}
      </div>
      <button className={`${style.welcome_console_copy}`}>
        Копировать
      </button>
    </div>
  );
}

export default Console;
