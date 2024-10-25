import React from 'react';

import PageWrapper from 'ts/components/Page/wrapper';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import PieChart from 'ts/components/PieChart';
import PageColumn from 'ts/components/Page/column';
import { increment } from 'ts/helpers/Math';

function getCountryChart(rows: any[]) {
  const order = rows.map((data: any) => data.country);
  const limit = order.length > 10 ? 2 : 1;
  const options = getOptions({ order, limit, suffix: 'page.team.country.chart.item' });
  const details = Object.fromEntries(
    rows.map((row: any) => [row.country, row.employments.length]),
  );
  return [options, details];
}

function getTimeZoneChart(authors: any[]) {
  const details = authors.reduce((acc: any, author) => {
    increment(acc, author.lastCommit.timezone.replace(':', '.'));
    return acc;
  }, {});

  const options = getOptions({
    order: Object.keys(details).sort(),
    limit: 5,
    suffix: 'page.team.country.chart.item',
  });

  return [options, details];
}

interface PieChartsProps {
  authors: any[];
  countries: any[];
}

function PieCharts({ authors, countries }: PieChartsProps): React.ReactElement | null {
  const [countryOptions, countryDetails] = getCountryChart(countries);
  const [timezoneOptions, timezoneDetails] = getTimeZoneChart(authors);

  return (
    <PageWrapper>
      <PageColumn>
        <PieChart
          title="page.team.country.pieByDomain.title"
          options={countryOptions}
          details={countryDetails}
        />
      </PageColumn>
      <PageColumn>
        <PieChart
          title="page.team.country.pieByTimezone.title"
          options={timezoneOptions}
          details={timezoneDetails}
        />
      </PageColumn>
    </PageWrapper>
  );
}

export default PieCharts;
