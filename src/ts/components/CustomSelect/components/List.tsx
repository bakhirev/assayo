import React, { useEffect, useState } from 'react';

import UiKitSelectOption from './Option';
import IOption from '../interfaces/Option';

import style from '../styles/index.module.scss';

interface UiKitSelectListProps {
  value: any; // TODO: remove me
  options: IOption[];
  search?: string;
  keyCode?: string;
  setKeyCode: Function;
  className?: string;
  onClick: Function;
}

function UiKitSelectList({
  options,
  search,
  keyCode,
  className,
  setKeyCode,
  onClick,
}: UiKitSelectListProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const searchText = search ? search.toLowerCase() : '';
  const searchResult = searchText
    ? options?.filter((option: any) => option?._textForSearch?.indexOf(searchText) !== -1)
    : options;

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
