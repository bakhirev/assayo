import RecommendationsPersonByTimestamp from './components/PersonByTimestamp';
import RecommendationsPersonByWeek from './components/PersonByWeek';
import RecommendationsTeamByAuthor from './components/TeamByAuthor';
import RecommendationsTeamByHour from './components/TeamByHour';
import RecommendationsTeamByScope from './components/TeamByScope';
import RecommendationsTeamByTimestamp from './components/TeamByTimestamp';
import RecommendationsTeamByType from './components/TeamByType';
import RecommendationsTeamByWeek from './components/TeamByWeek';

export default class Recommendations {
  byScope:any = new RecommendationsTeamByScope();

  byAuthor:any = new RecommendationsTeamByAuthor();

  byType:any = new RecommendationsTeamByType();

  byWeek:any = new RecommendationsTeamByWeek();

  byTimestamp:any = new RecommendationsTeamByTimestamp();

  byHour:any = new RecommendationsTeamByHour();

  personByWeek:any = new RecommendationsPersonByWeek();

  personByTimestamp:any = new RecommendationsPersonByTimestamp();

  team:any = {};

  person:any = {};

  updateTotalInfo(statisticsByCommits: any) {
    this.team = {
      byScope: this.byScope.getTotalInfo(statisticsByCommits),
      byAuthor: this.byAuthor.getTotalInfo(statisticsByCommits),
      byType: this.byType.getTotalInfo(statisticsByCommits),
      byWeek: this.byWeek.getTotalInfo(statisticsByCommits),
      byTimestamp: this.byTimestamp.getTotalInfo(statisticsByCommits),
      byHour: this.byHour.getTotalInfo(statisticsByCommits),
    };

    this.person = {
      byWeek: this.personByWeek.getTotalInfo(statisticsByCommits),
      byTimestamp: this.personByTimestamp.getTotalInfo(statisticsByCommits),
    };
  }

  clear() {
    this.team = {};
    this.person = {};
  }
}
