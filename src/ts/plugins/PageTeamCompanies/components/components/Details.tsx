import React from 'react';

import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';

import TaskCodes from './TaskCodes';
import Employments from './Employments';

interface DetailsProps {
  authors?: any[];
  taskCodes?: any[];
}

export function Details({ authors, taskCodes }: DetailsProps) {
  return (
    <>
      <FakeDataLoader content={taskCodes}>
        <TaskCodes
          mode="details"
          rowsForExcel={taskCodes}
        />
        <Pagination />
      </FakeDataLoader>
      <FakeDataLoader content={authors}>
        <Employments
          mode="details"
          rowsForExcel={authors}
        />
        <Pagination />
      </FakeDataLoader>
    </>
  );
}

export default Details;
