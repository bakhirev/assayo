import React, { useEffect, useState } from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import Description from 'ts/components/Description';
import ShowSymbol from 'ts/components/ShowSymbol';
import { shuffle } from 'ts/helpers/random';
import GameBanner from 'ts/components/GameBanner';
import styleBanner from 'ts/components/GameBanner/index.module.scss';

import CityMap from './components/CityMap';
import style from './style/wrapper.module.scss';

interface IValue {
  title: string;
  value: number;
}

function getTotal(valuesByKey: IHashMap<number>): number {
  return Object.values(valuesByKey || {})
    .reduce((sum: number, value: number) => sum + value, 0);
}

function getRandomList(valuesByKey: IHashMap<number>): IValue[] {
  const list = Object.entries(valuesByKey || {})
    .map(([title, value]: any) => ({ title, value }));
  return shuffle(list);
}

interface ICityBuilderProps {
  valuesByTitle: IHashMap<number>;
}

function CityBuilder({
  valuesByTitle,
}: ICityBuilderProps): React.ReactElement | null {
  const [list, setList] = useState<IValue[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [total, setTotal] = useState<number>(100);
  const lastIndex = list.length - 1;

  useEffect(() => {
    setTotal(getTotal(valuesByTitle));
    setList(getRandomList(valuesByTitle));
  }, [valuesByTitle]);

  if (!list.length) return null;

  const selected = list[selectedIndex];
  const percent = Math.ceil(((selected.value || 0) * 100) / total);

  return (
    <>
      <GameBanner src="./assets/games/citybuilder.jpg">
        <ShowSymbol
          text={selected.title}
          length={20}
        />
        <Description
          className={styleBanner.game_banner_text}
          text={`Сейчас в проекте есть ${selected.value || 0} файлов созданных этим пользователем. Это примерно ${percent}% от всех файлов в проекте.`}
        />
      </GameBanner>
      <div className={style.city_builder_control}>
        <button
          disabled={!selectedIndex}
          className={style.city_builder_control_prev}
          style={{ backgroundImage: 'url(./assets/menu/arrow_left.svg)' }}
          onClick={() => {
            setSelectedIndex(selectedIndex - 1);
          }}
        />
        <button
          disabled={selectedIndex === lastIndex}
          className={style.city_builder_control_next}
          style={{ backgroundImage: 'url(./assets/menu/arrow_right.svg)' }}
          onClick={() => {
            setSelectedIndex(selectedIndex + 1);
          }}
        />
        <CityMap percent={percent} />
      </div>
    </>
  );
}

export default CityBuilder;
