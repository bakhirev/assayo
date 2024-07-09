export default {
  title: 'Сотрудники отдела',
  icon: './assets/games/wheel.jpg',
  description: 'Текст с каким то описанием на три предложения, которые интригуют и манят пройти этот унылый квиз с небольшим количеством графики.',
  questions: [
    {
      title: 'Сколь директорий создал Anatoliy?',
      answers: [
        {
          title: '17',
          icon: './assets/games/wheel.jpg',
          score: 0,
        },
        {
          title: '23',
          icon: './assets/games/wheel.jpg',
          score: 1,
        },
        {
          title: '29',
          icon: './assets/games/wheel.jpg',
          score: 0,
        },
      ],
    },
    {
      title: 'Albert коммитит чаще Marrie?',
      answers: [
        {
          title: 'Да',
          icon: './assets/games/wheel.jpg',
          score: 0,
        },
        {
          title: 'Нет',
          icon: './assets/games/wheel.jpg',
          score: 1,
        },
      ],
    },
    {
      title: 'Самое длинное commit message оставил:',
      answers: [
        {
          title: 'Kolya Elow',
          icon: './assets/games/wheel.jpg',
          score: 0,
        },
        {
          title: 'Subrine Titan',
          icon: './assets/games/wheel.jpg',
          score: 0,
        },
        {
          title: 'Grebenshikov Muz TV',
          icon: './assets/games/wheel.jpg',
          score: 1,
        },
      ],
    },
  ],
  results: [
    {
      title: 'Поздравляем, пытка окончена',
      icon: './assets/games/wheel.jpg',
      description: 'Вы протестировали этот квиз и готовы написать на него отзыв длинной два или три предложения.',
      'min': 0,
      'max': 60,
    },
  ],
};
