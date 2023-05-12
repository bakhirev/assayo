import React from 'react';

interface ILineProps {
  value?: number;
  width?: number;
  title?: string;
  description?: string;
  suffix?: string;
  color?: { first: string, second: string } | null;
  className?: string;
}

function Line({
  value,
  width,
  title,
  description,
  suffix,
  color,
  className,
}: ILineProps): React.ReactElement | null {
  if (!width || width <= 0) return null;

  const formattedTitle = title || '';
  const formattedDescription = value
    ? `${width}% (${value} ${suffix}) ${description || formattedTitle}`
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
};

export default Line;
