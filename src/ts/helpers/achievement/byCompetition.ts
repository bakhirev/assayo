import IHashMap from 'ts/interfaces/HashMap';

class AchievementsByCompetition {
  authors: IHashMap<string[]> = {};

  get(name: string) {
    return this.authors[name]
      ? [...this.authors[name]]
      : [];
  }

  updateByDataGrip(statisticByAuthor: any) {
    //   У меня работает - больше всего коммитов с текстом fix
    // 500я на проде - больше всего коммитов с префиксом hotfix
    // Хуяк, хуяк и в продакшен - больше всего коммитов с префиксом add или feat
    // Выпускающий редактор - больше всего коммитов с текстом refactor
    //  - больше всего коммитов в час
    const {
      total,
      achievements,
    } = this.#getTotalByAuthor(statisticByAuthor);

    const nameLength = this.#getFirstAndLast(total.nameLength);
    // Азим Азиз Иль Ам Кадир Имран II - самое длинное имя
    achievements[nameLength.first].push('longestName');
    // Корнишон - самое короткое имя
    achievements[nameLength.last].push('shortestName');

    const midMessage = this.#getFirstAndLast(total.midMessage);
    // Мастер красноречия - стабильно ,самые длинные подписи коммитов
    achievements[midMessage.first].push('everyMessageLong');
    // Нет времени обьяснять - стабильно, самые короткие подписи коммитов
    achievements[midMessage.last].push('everyMessageShort');

    const maxMessage = this.#getFirstAndLast(total.maxMessage);
    // Пиздеть, не мешки ворочить - самая длинная подпись коммита за все время
    achievements[maxMessage.first].push('longestMessage');

    const tasks = this.#getFirstAndLast(total.tasks);
    // Батя - больше всего закрытых задач
    achievements[tasks.first].push('moreTasks');
    // Зашел и вышел - меньше всего закрытых задач
    achievements[tasks.last].push('lessTasks');

    const days = this.#getFirstAndLast(total.days);
    // Ценный работник - больше всего рабочих дней
    achievements[days.first].push('moreWorkDays');
    // Дальше без меня - меньше всего рабочих дней
    achievements[days.last].push('lessWorkDays');

    const lazyDays = this.#getFirstAndLast(total.lazyDays);
    // Мысленно я с вами - больше всего дней без коммитов
    achievements[lazyDays.first].push('moreLazyDays');
    // Папа Карло - меньше всего дней без коммитов
    achievements[lazyDays.last].push('lessLazyDays');

    const allDaysInProject = this.#getFirstAndLast(total.allDaysInProject);
    // Старожил - больше всего дней на проекте
    achievements[allDaysInProject.first].push('moreDaysInProject');
    // Сосунок - меньше всего дней на проекте
    achievements[allDaysInProject.last].push('lessDaysInProject');

    this.authors = achievements;
  }

  #getTotalByAuthor(statisticByAuthor: any) {
    const achievements = {};
    const total: any = {
      nameLength: [],
      maxMessage: [],
      midMessage: [],
      tasks: [],
      days: [],
      lazyDays: [],
      allDaysInProject: [],
    };

    statisticByAuthor.forEach((statistic: any) => {
      achievements[statistic.author] = [];
      total.nameLength.push([statistic.author, statistic.author.length]);
      total.maxMessage.push([statistic.author, statistic.messageLength[statistic.messageLength.length - 1]]);
      total.midMessage.push([statistic.author, statistic.middleMessageLength]);
      total.tasks.push([statistic.author, statistic.tasks.length]);
      total.days.push([statistic.author, statistic.days]);
      total.lazyDays.push([statistic.author, statistic.lazyDays]);
      total.allDaysInProject.push([statistic.author, statistic.allDaysInProject]);
    });

    Object.keys(total).forEach(achievement => {
      total[achievement].sort((a: any, b: any) => b[1] - a[1]);
    });

    return { total, achievements };
  }

  #getFirstAndLast(list: any[]) {
    const first = list.shift();
    const last = list.pop() || first;

    return {
      first: first[0],
      last: last[0],
    };
  }
}

const achievements = new AchievementsByCompetition();

export default achievements;
