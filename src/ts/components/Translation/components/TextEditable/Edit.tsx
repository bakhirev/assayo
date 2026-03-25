import React, { useEffect, useRef, useState } from 'react';

import style from './index.module.scss';

interface EditProps {
  defaultValue: string;
  height: string | number;
  autoClose: boolean;
  onChange: (value: string) => void;
}

function Edit({ defaultValue, autoClose, height, onChange }: EditProps) {
  const ref = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    ref?.current?.focus();
  }, [ref?.current]);

  return (
    <textarea
      ref={ref}
      value={value}
      className={style.component_translation_input}
      style={{
        height: `${height}px`,
      }}
      onChange={(event) => {
        event.stopPropagation();
        setValue(event.target.value);
      }}
      onBlur={() => {
        if (autoClose) onChange(value || defaultValue);
      }}
    />
  );
}

Edit.defaultProps = {
  autoClosing: true,
};

export default Edit;
