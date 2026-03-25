import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import { Column, ColumnTypes, Table } from 'ts/components/Table';

interface ViewProps {
  response?: IPagination<any>;
}

export function View({ response }: ViewProps) {
  if (!response) return null;

  return (
    <Table rows={response?.content || []}>
      <Column
        template={ColumnTypes.STRING}
        title="uiKit.translation.modal.key"
        properties="key"
        width={270}
      />
      <Column
        template={ColumnTypes.STRING}
        title="uiKit.translation.modal.value"
        properties="value"
      />
      <Column
        template={ColumnTypes.STRING}
        properties="valu2e"
        width={40}
      />
    </Table>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
