import React from 'react';

import Card from './components/Card';

import style from './styles/index.module.scss';

function Main() {
  return (
    <section className={style.main}>
      <h2 className={style.main_title}>
        Выберите раздел аналити
      </h2>
      <div  className={style.main_cards}>
        <Card
          icon="./assets/cards/money_lazy.png"
          title="Команда"
          description="Собраны метрики работы команды в целом, сумарные финансовые показатели, рекомендации для менеджера проекта."
          link="/team/total"
        />
        <Card
          icon="./assets/cards/money_lazy.png"
          title="Сотрудник"
          description="Данные по каждому сотруднику отдельно. Личные достижения, характеристики, показатели работоспособности."
          link="/person/total/0"
        />
      </div>
    </section>
  );
}

export default Main;
