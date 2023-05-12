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

  updateTotalInfo(dataGrip: any) {
    this.team = {
      byScope: this.byScope.getTotalInfo(dataGrip),
      byAuthor: this.byAuthor.getTotalInfo(dataGrip),
      byType: this.byType.getTotalInfo(dataGrip),
      byWeek: this.byWeek.getTotalInfo(dataGrip),
      byTimestamp: this.byTimestamp.getTotalInfo(dataGrip),
      byHour: this.byHour.getTotalInfo(dataGrip),
    };

    this.person = {
      byWeek: this.personByWeek.getTotalInfo(dataGrip),
      byTimestamp: this.personByTimestamp.getTotalInfo(dataGrip),
    };
  }

  clear() {
    this.team = {};
    this.person = {};
  }
}