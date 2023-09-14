import React from 'react';

interface ILineProps {
  value?: number;
  width?: number;
  title?: string;
  description?: string;
  suffix?: string;
  color?: { first: string, second: string } | null;
  className?: string;
  formatter?: Function;
}

function Line({
  value,
  width,
  title,
  description,
  suffix,
  color,
  className,
  formatter,
}: ILineProps): React.ReactElement | null {
  if (!width || width <= 0) return null;

  const formattedTitle = title || '';
  const formattedValue = formatter?.(value);
  const formattedSuffix = suffix ? ` ${suffix}` : '';
  const formattedDescription = value
    ? `${width}% (${formattedValue}${formattedSuffix}) ${description || formattedTitle}`
    : `${width}% ${description || formattedTitle}`;

  return (
    <div
      className={className}
      style={{
        width: `${width}%`,
        color: color?.second,
        padding: formattedTitle ? '0 0 0 4px' : '0',
        backgroundColor: color?.first,
      }}
      title={formattedDescription}
    >
      {formattedTitle}
    </div>
  );
}

Line.defaultProps = {
  value: 0,
  width: 0,
  title: '',
  description: '',
  suffix: '',
  color: null,
  className: '',
  formatter: (v: any) => v,
};

export default Line;
