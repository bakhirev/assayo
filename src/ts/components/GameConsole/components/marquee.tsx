import React, { useEffect, useState } from 'react';

import style from '../styles/index.module.scss';

const SOURCE_CODE = `JIRA-1227 fix(profile): change validation
Counting objects: 100% (22/22), done.
Delta compression using up to 8 threads
JIRA-323 fix: change validation
Writing objects: 100% (12/12), 1.88 KiB | 1.88 MiB/s, done.
Total 12 (delta 9), reused 0 (delta 0), pack-reused 0
`.split('\n');

function getRandomText(index: number, messages?: string[]) {
  const source = messages || SOURCE_CODE;
  const splitIndex = index % source.length;
  const start = source.slice(0, splitIndex);
  const end = source.slice(splitIndex);
  return [...end, ...start]
    .slice(0, 13)
    .map((text: string) => (<p key={text}>{text}</p>));
}

interface IMarqueeProps {
  commitsInDay: number;
  messages?: string[];
}

function Marquee({
  commitsInDay,
  messages,
}: IMarqueeProps) {
  const [index, setIndex] = useState<number>(0);
  const text = getRandomText(index, messages);

  useEffect(() => {
    const delay = 3000 * 6;
    const speed = Math.ceil(delay / (commitsInDay || 1));
    const timer = setInterval(() => {
      setIndex((value: number) => value + 1);
    }, speed);
    return () => {
      clearInterval(timer);
    };
  }, [commitsInDay]);

  return (
    <div className={style.game_console_monitor}>
      <p id={`game-console-text-${index}`}>{text}</p>
    </div>
  );
}

export default Marquee;
