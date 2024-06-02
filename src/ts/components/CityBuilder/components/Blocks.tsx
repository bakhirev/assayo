import React from 'react';

import Block from './Block';

interface IBlocksProps {
  level: any;
}

function Blocks({
  level,
}: IBlocksProps): React.ReactElement | null {
  const blocks: any[] = [];
  const lastRowIndex = level?.length - 1;
  const lastColumnIndex = level?.[0]?.length - 1;

  level?.forEach((row: any, rowIndex: number) => {
    row.forEach((cell: any, columnIndex: number) => {
      let type = 'home';
      if (cell) type = 'road';
      if ((!rowIndex || !columnIndex || rowIndex === lastRowIndex || columnIndex === lastColumnIndex)
        && cell
        && Math.random() > 0.5) type = 'green';

      blocks.push(
        <Block
          key={`${rowIndex}.${columnIndex}`}
          type={type}
        />);
    });
  });

  return (<>{blocks}</>);
}

export default Blocks;
