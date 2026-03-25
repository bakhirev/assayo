import React from 'react';

import { IColumn } from 'ts/components/Table/interfaces/Column';

import Line from './Line';
import LineWithTemplate from './LineWithTemplate';
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
  let alreadySetHeader = false;
  const parts = lines.map((line: IColumn, columnIndex: number) => {
    const value = line.properties
      ? item[line.properties]
      : item;

    const formattedValue = line.formatter
      ? line.formatter(value)
      : value;

    const hasTemplate = typeof line.template === 'function';
    const content = hasTemplate // @ts-ignore
      ? line.template(formattedValue, item)
      : `${line.prefixes ?? ''}${formattedValue ?? ''}${line.suffixes ?? ''}`;

    if (!alreadySetHeader && line.title) {
      alreadySetHeader = true;
      return (
        <Title
          key={`${line.title}_${columnIndex}`}
          item={item}
          column={line}
          value={content}
        />
      );
    }

    if (hasTemplate && (!line.width || (line.width && line.width > 110))) {
      return (
        <LineWithTemplate
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
