import React, { ReactNode } from 'react';

import DataLoader from './DataLoader';
import { getFakeLoader } from '../helpers/formatter';

interface FakeDataLoaderProps {
  content?: any;
  mode?: string;
  watch?: string | number | null | undefined;
  children: ReactNode;
}

export default function FakeDataLoader({
  content,
  mode,
  watch,
  children,
}: FakeDataLoaderProps) {
  return (
    <DataLoader
      loader={getFakeLoader(content, mode)}
      watch={watch}
    >
      {children}
    </DataLoader>
  );
}
