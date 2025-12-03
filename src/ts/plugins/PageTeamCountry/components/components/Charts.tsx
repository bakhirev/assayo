import React from 'react';

import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import { increment } from 'ts/helpers/Math';

function getCountryChart(rows: any[]) {
  const order = rows.map((data: any) => data.country);
  const limit = order.length > 10 ? 2 : 1;
  const details = Object.fromEntries(
    rows.map((row: any) => [row.country, row.employments.length]),
  );
  return [order, limit, details];
}

function getTimeZoneChart(authors: any[]) {
  const details = authors.reduce((acc: any, author) => {
    increment(acc, author.lastCommit.timezone.replace(':', '.'));
    return acc;
  }, {});
  const order = Object.keys(details).sort();
  return [order, details];
}

interface PieChartsProps {
  authors: any[];
  countries: any[];
}

function PieCharts({ authors, countries }: PieChartsProps): React.ReactElement | null {
  const [countryOrder, countryLimit, countryDetails] = getCountryChart(countries);
  const [timezoneOrder, timezoneDetails] = getTimeZoneChart(authors);

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="page.team.country.pieByDomain.title"
          suffix="page.team.country.chart.item"
          order={countryOrder}
          limit={countryLimit}
          details={countryDetails}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="page.team.country.pieByTimezone.title"
          suffix="page.team.country.chart.item"
          order={timezoneOrder}
          limit={5}
          details={timezoneDetails}
        />
      </SectionColumn>
    </Section>
  );
}

export default PieCharts;
