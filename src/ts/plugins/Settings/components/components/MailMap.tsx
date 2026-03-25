import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import { Console } from 'ts/components/Layout';

const MailMap = observer((): React.ReactElement | null => {
  const items = (statisticStore?.statisticsByCommits?.author?.totalInfo || [])
    .map((item: any) => (
      item.emails.map((email: string) => `${item.author} <${item.emails[0]}> <${email}>`)
    ))
    .flat();
  const commands = items.map((text: any) => (<p key={text}>{text}</p>));
  const commandsForCopy = items.join('\r\n');

  return (
    <Console textForCopy={commandsForCopy}>
      {commands}
    </Console>
  );
});

export default MailMap;
