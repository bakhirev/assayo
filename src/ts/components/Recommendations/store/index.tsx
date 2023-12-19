import { makeObservable, observable, action } from 'mobx';

export interface IRecommendationStore {
  open: Function;
  close: Function;
}

class RecommendationStore implements IRecommendationStore {
  recommendation: any | null = null;

  constructor() {
    makeObservable(this, {
      recommendation: observable,
      open: action,
      close: action,
    });
  }

  open(recommendation: any) {
    this.recommendation = recommendation;
  }

  close() {
    this.recommendation = null;
  }
}

const recommendationStore = new RecommendationStore();

export default recommendationStore;
