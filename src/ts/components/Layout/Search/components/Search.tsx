import React, { useState } from 'react';

import UiKitInputString from 'ts/components/UiKit/components/InputString';

import Filter from '../interfaces/Filter';
import Examples from './Examples';

interface SearchInputProps {
  filters: Filter,
  className?: string;
  placeholder?: string;
  examples?: string[];
  onChange: (filter: Filter) => void;
}

function SearchInput({
  filters,
  examples,
  placeholder,
  className,
  onChange,
}: SearchInputProps) {
  const [query, setQuery] = useState<string>('');

  const update = (property: string, value: any) => {
    onChange({
      ...filters,
      [property]: value,
      hash: Math.random(),
    });
  };

  return (
    <>
      <UiKitInputString
        value={query}
        className={className || ''}
        placeholder={placeholder || 'common.search.placeholder'}
        onChange={setQuery}
        onChangeDebounce={(lastQuery: string) => {
          update('query', lastQuery);
        }}
      />
      <Examples
        examples={examples}
        onClick={(exampleQuery: string) => {
          setQuery(exampleQuery);
          update('query', exampleQuery);
        }}
      />
    </>
  );
}

export default SearchInput;
