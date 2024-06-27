import React, { useEffect, useState } from 'react';

import { getOnDrop, getShowDropZone } from './helpers';
import style from './index.module.scss';

interface IDropZoneProps {
  onChange: Function;
}

function DropZone({
  onChange,
}: IDropZoneProps) {
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const onDropCallback = getOnDrop(setLoading, onChange);
    const showDropCallback = getShowDropZone(setLoading);
    document.body.addEventListener('drop', onDropCallback);
    document.body.addEventListener('dragover', showDropCallback);
    return () => {
      document.body.removeEventListener('drop', onDropCallback);
      document.body.removeEventListener('dragover', showDropCallback);
    };
  }, []);

  if (!isLoading) return (<></>);

  return (
    <div className={style.dropzone}>
      {/*<Dropzone className={style.dropzone_icon}/>*/}
      <p className={style.dropzone_title}>
        Drop file here
      </p>
    </div>
  );
}

export default DropZone;
