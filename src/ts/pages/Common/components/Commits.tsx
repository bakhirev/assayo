import React, { useState, useMemo } from 'react';

import { getDate, getDateByTimestamp, getShortNumber } from 'ts/helpers/formatter';

import Recommendations from 'ts/components/Recommendations';
import PageWrapper from 'ts/components/Page/wrapper';
import { BarChart, BarChartWithFewValues } from 'ts/components/Charts';
import { Title, NothingFound, DayInfo } from 'ts/components/Layout';
import { RECOMMENDATION_TYPES } from 'ts/helpers/Recommendations/helpers/contstants';
import localization from 'ts/helpers/Localization';
import { Distribution } from 'ts/helpers/Math';

interface ICommitsProps {
  statistic: any;
  from: number;
  to: number;
}

function getDistributionsForChart(distribution: any, from: number) {
  return distribution.getWeightedAverages().map((value: number, index: number) => {
    const fromDate = from + distribution.step * index;
    const toDate = from + distribution.step * (index + 1);
    const commits = getShortNumber(value);
    return {
      title: `с ${getDate(fromDate)} по ${getDate(toDate)}`,
      value: commits,
      meta: {},
    };
  });
}

function getDistributions(days: any, from: number, to: number, property: string) {
  const commitsDistribution = new Distribution(from, to, 20);
  days.forEach((day: any) => {
    commitsDistribution.getWeightedAverage(day.milliseconds)?.update(day[property]);
  });
  return getDistributionsForChart(commitsDistribution, from);
}

function getDistributionsByAuthor(days: any, from: number, to: number) {
  const commitsDistribution = new Distribution(from, to, 20);
  days.forEach((day: any) => {
    Object.values(day.tasksByAuthor).forEach((refTaskCommits: any) => {
      const countTasks = Object.keys(refTaskCommits)?.length;
      commitsDistribution.getWeightedAverage(day.milliseconds)?.update(countTasks);
    });
  });
  return getDistributionsForChart(commitsDistribution, from);
}

function Commits({ statistic, from, to }: ICommitsProps) {
  const maxData = statistic.commitsByTimestampCounter.maxData;

  const [selected, setSelected] = useState<any>(maxData);

  const dots = statistic.allCommitsByTimestamp
    .map((dot: any) => ({
      title: `${dot.timestamp} - ${dot.commits} коммитов`,
      value: dot.commits,
      meta: dot,
    }));
  if (!dots?.length) return (<NothingFound />);

  const commitsDistributions = useMemo<any>(() => (
    getDistributions(statistic.allCommitsByTimestamp, from, to, 'commits')
  ), [from, to]);

  const tasksDistributions = useMemo<any>(() => (
    getDistributions(statistic.allCommitsByTimestamp, from, to, 'tasksInDay')
  ), [from, to]);

  const tasksDistributionsByAuthor = useMemo<any>(() => (
    getDistributionsByAuthor(statistic.allCommitsByTimestamp, from, to)
  ), [from, to]);

  const [fullDay, shortDay] = getDateByTimestamp(maxData.timestamp);
  const recommendations = [
    {
      title: fullDay,
      description: 'page.common.commits.description',
      type: RECOMMENDATION_TYPES.FACT,
      arguments: {
        description: [shortDay],
      },
    },
  ];

  return (
    <>
      <Recommendations recommendations={recommendations} />
      <Title title="Средневзвешенное количество коммитов в день"/>
      <PageWrapper template="box">
        <BarChartWithFewValues
          dots={commitsDistributions}
          selected={commitsDistributions[0]}
          onClick={(dot: any) => {
            console.log(dot.meta);
          }}
        />
      </PageWrapper>
      <Title title="Средневзвешенное количество задач в день"/>
      <PageWrapper template="box">
        <BarChartWithFewValues
          dots={tasksDistributions}
          selected={tasksDistributions[0]}
          onClick={(dot: any) => {
            console.log(dot.meta);
          }}
        />
      </PageWrapper>
      <Title title="Средневзвешенное количество задач в день на одного сотрудника"/>
      <PageWrapper template="box">
        <BarChartWithFewValues
          dots={tasksDistributionsByAuthor}
          selected={tasksDistributionsByAuthor[0]}
          onClick={(dot: any) => {
            console.log(dot.meta);
          }}
        />
      </PageWrapper>
      <Title title="page.common.commits.title"/>
      <PageWrapper template="box">
        <BarChart
          dots={dots}
          selected={selected}
          onClick={(dot: any) => {
            setSelected(dot.meta);
          }}
        />
      </PageWrapper>
      <br/>
      <br/>
      <Title title={localization.get(
        'page.common.commits.title2',
        getDate(selected?.timestamp),
        selected?.commits,
      )} />
      <PageWrapper template="box">
        <DayInfo timestamp={selected?.timestamp} />
      </PageWrapper>
    </>
  );
}

export default Commits;
