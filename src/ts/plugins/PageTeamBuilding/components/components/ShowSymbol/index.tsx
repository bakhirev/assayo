import React, { useEffect, useState } from 'react';

import OneSymbol from './components/OneSymbol';
import Button from './components/Button';

import style from './styles/index.module.scss';

function getSymbolList(text: string, length?: number) {
  const list = (text || '').split('');
  const lastIndex = length
    ? (length - 1)
    : (list.length - 1);

  if ((list.length - 1) > lastIndex) {
    list[lastIndex] = '…';
  }

  return list;
}

interface IShowSymbolProps {
  text: string;
  length?: number;
  mode?: string;
}

function ShowSymbol({
  text,
  length,
  mode,
}: IShowSymbolProps): React.ReactElement | null {
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    setShowAll(false);
  }, [text]);

  if (!text && !length) return null;

  const list = getSymbolList(text, length);
  const fakeList = length ? (new Array(length)).fill(1) : null;
  const line = (fakeList || list)
    .map((symbol: string, index: number) => (
      <OneSymbol
        key={`${text}|${symbol}|${index}`}
        mode={mode}
        show={showAll}
      >
        {list[index] || ''}
      </OneSymbol>
    ));

  return (
    <div
      className={`${style.show_symbol_wrapper}`}
      style={{
        paddingTop: mode === 'table-row' ? '8px' : 0,
      }}
    >
      {line}
      <Button
        mode={mode}
        onClick={() => setShowAll(true)}
      >
        »
      </Button>
    </div>
  );
}

export default ShowSymbol;
