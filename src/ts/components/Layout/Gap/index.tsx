import React from 'react';

interface GapProps {
  width?: string | number;
  height?: string | number;
}

function getSize(key?: string | number) {
  const defaultSize = {
    xxxs: '2px',
    xxs: '4px',
    xs: '6px',
    s: '8px',
    sm: '10px',
    m: '12px',
    l: '16px',
    xl: '18px',
    xxl: '24px',
  }[key || ''];
  if (defaultSize) return defaultSize;
  return typeof key === 'number' ? `${key}px` : key;
}

function Gap({
  width,
  height,
}: GapProps) {
  const style = {} as any;
  if (width) style.width = getSize(width);
  if (height) style.height = getSize(height);
  return (
    <div  style={style}/>
  );
}

Gap.defaultProps = {
  width: '',
  height: '',
};

export default Gap;
