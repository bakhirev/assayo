import React, { useMemo, useState } from 'react';

import IOption from './interfaces/Option';
import UiKitSelectValue from './components/Value';
import UiKitSelectSearch from './components/Search';
import UiKitSelectList from './components/List';
import UiKitSelectIcon from './components/Icon';
import { getOption, getTitle } from './helpers';

import style from './styles/index.module.scss';

interface UiKitSelectProps {
  value: any;
  options: any;
  className?: string;
  onChange?: Function;
}

function UiKitSelect({
  value,
  options,
  className,
  onChange,
}: UiKitSelectProps) {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [keyCode, setKeyCode] = useState<string>('');

  const formattedOptions: IOption[] = useMemo(() => options?.map(getOption) || [], [options]);
  const formattedValue = useMemo(() => {
    const selectedOption = options.find((option: any) => option.id === value);
    return getTitle(selectedOption) || getTitle(value);
  }, [value]);

  return (
    <div className={`${style.ui_kit_select_container} ${className || ''}`}>
      {!openSearch ? (
        <UiKitSelectValue
          value={formattedValue}
          options={formattedOptions}
          className={className}
          onClick={() => setOpenSearch(true)}
        />
      ) : null}

      {openSearch ? (
        <UiKitSelectSearch
          value={search}
          placeholder={formattedValue}
          className={className}
          onChange={setSearch}
          onKeyDown={setKeyCode}
          onClose={() => {
            setSearch('');
            setOpenSearch(false);
          }}
        />
      ) : null}

      <UiKitSelectIcon
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
      />

      {openSearch ? (
        <UiKitSelectList
          value={value}
          options={formattedOptions}
          search={search}
          keyCode={keyCode}
          setKeyCode={setKeyCode}
          className={className}
          onClick={(selected: any) => {
            setSearch('');
            setOpenSearch(false);
            if (onChange) onChange(selected?.id);
          }}
        />
      ) : null}
    </div>
  );
}


export default UiKitSelect;
