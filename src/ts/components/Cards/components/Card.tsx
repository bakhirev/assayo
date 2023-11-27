import React from 'react';

import { IColumn } from 'ts/components/Table/interfaces/Column';

import Line from './Line';
import Title from './Title';
import style from '../styles/index.module.scss';

interface ICardProps {
  item: any;
  lines: IColumn[];
  className?: string;
  customStyle?: any;
}

function Card({
  item,
  lines,
  className,
  customStyle,
}: ICardProps) {
  const parts = lines.map((line: IColumn, columnIndex: number) => {
    const value = line.properties
      ? item[line.properties]
      : item;

    const formattedValue = line.formatter
      ? line.formatter(value)
      : value;

    if (typeof line.template === 'function') {
      return line.template(formattedValue, item);
    }

    const content = `${line.prefixes ?? ''}${formattedValue ?? ''}${line.suffixes ?? ''}`;

    if (!columnIndex) {
      return (
        <Title
          key={`${line.title}_${columnIndex}`}
          item={item}
          column={line}
          value={content}
        />
      );
    }

    return (
      <Line
        key={`${line.title}_${columnIndex}`}
        item={item}
        column={line}
        value={content}
      />
    );
  });

  return (
    <div
      className={`${style.card} ${className}`}
      style={customStyle || {}}
    >
      {parts}
    </div>
  );
}

Card.defaultProps = {
  className: '',
};

export default Card;
