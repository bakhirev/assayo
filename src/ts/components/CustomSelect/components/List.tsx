import React, { useEffect, useState } from 'react';

import UiKitSelectOption from './Option';

import style from '../styles/index.module.scss';

interface UiKitSelectListProps {
  value: any;
  options: any;
  search?: string;
  keyCode?: string;
  setKeyCode: Function;
  className?: string;
  onClick: Function;
}

function UiKitSelectList({
  value,
  options,
  search,
  keyCode,
  className,
  setKeyCode,
  onClick,
}: UiKitSelectListProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  console.log(value);
  const searchResult = options
    ?.filter((option: any) => option.title.indexOf(search) !== -1);

  useEffect(() => {
    if (!keyCode) return;
    if (keyCode === 'down') {
      let nextIndex = selectedIndex + 1;
      if (nextIndex >= searchResult.length) nextIndex = 0;
      setSelectedIndex(nextIndex);
    }
    if (keyCode === 'up') {
      let nextIndex = selectedIndex - 1;
      if (nextIndex < 0) nextIndex = searchResult.length - 1;
      setSelectedIndex(nextIndex);
    }
    if (keyCode === 'enter') {
      const selected = searchResult[selectedIndex];
      onClick(selected, selectedIndex);
    }
    setKeyCode('');
  }, [keyCode]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [search]);

  const items = searchResult?.map((option: any, index: number) => {
    return (
      <UiKitSelectOption
        key={option.id}
        focus={index === selectedIndex}
        option={option}
        className={className}
        onClick={() => {
          onClick(option.source, index);
        }}
      />
    );
  });

  if (!items.length) return null;

  return (
    <ul className={`${style.ui_kit_select_list} scroll_y ${className || ''}`}>
      {items}
    </ul>
  );
}


export default UiKitSelectList;
