import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Print from './Print';
import Sponsor from './Sponsor';
import Settings from './Settings';

import PageTeamAuthor from './PageTeamAuthor';
import PageTeamBuilding from './PageTeamBuilding';
import PageTeamChanges from './PageTeamChanges';
import PageTeamCommits from './PageTeamCommits';
import PageTeamCompanies from './PageTeamCompanies';
import PageTeamCountry from './PageTeamCountry';
import PageTeamVacation from './PageTeamVacation';
import PageTeamDepartments from './PageTeamDepartments';
import PageTeamFileAnalytics from './PageTeamFileAnalytics';
import PageTeamFiles from './PageTeamFiles';
import PageTeamHours from './PageTeamHours';
import PageTeamMonth from './PageTeamMonth';
import PageTeamPullRequests from './PageTeamPullRequests';
import PageTeamRecommendations from './PageTeamRecommendations';
import PageTeamRefactor from './PageTeamRefactor';
import PageTeamRelease from './PageTeamRelease';
import PageTeamScope from './PageTeamScope';
import PageTeamEmails from './PageTeamEmails';
import PageTeamTasks from './PageTeamTasks';
import PageTeamDay from './PageTeamDay';
import PageTeamTotal from './PageTeamTotal';
import PageTeamTypes from './PageTeamTypes';
import PageTeamWeeks from './PageTeamWeeks';

import PagePersonAchievements from './PagePersonAchievements';
import PagePersonChanges from './PagePersonChanges';
import PagePersonCommits from './PagePersonCommits';
import PagePersonMoney from './PagePersonMoney';
import PagePersonSpeed from './PagePersonSpeed';
import PagePersonTotal from './PagePersonTotal';
import PagePersonWeek from './PagePersonWeek';
import PagePersonVacation from './PagePersonVacation';

export default [
  PageTeamTotal,
  PageTeamScope,
  PageTeamAuthor,
  PageTeamTypes,
  PageTeamCompanies,
  PageTeamDepartments,
  PageTeamCountry,
  PageTeamVacation,
  PageTeamEmails,
  PageTeamDay,
  PageTeamWeeks,
  PageTeamMonth,
  PageTeamHours,
  PageTeamFiles,
  PageTeamFileAnalytics,
  PageTeamRefactor,
  PageTeamRelease,
  PageTeamTasks,
  PageTeamPullRequests,
  PageTeamCommits,
  PageTeamChanges,
  PageTeamRecommendations,
  PageTeamBuilding,

  PagePersonTotal,
  PagePersonAchievements,
  PagePersonMoney,
  PagePersonSpeed,
  PagePersonWeek,
  PagePersonVacation,
  PagePersonCommits,
  PagePersonChanges,

  Print,
  Sponsor,
  Settings,
] as IPlugin[];
