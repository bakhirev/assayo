import React from 'react';

import statisticStore from 'ts/store/Statistics';
import { PRLink, TaskLink } from 'ts/components/Layout';
import UiKitTags from 'ts/components/UiKit/components/Tags';
import UiKitTag from 'ts/components/UiKit/components/Tag';

import { ColumnTypes } from '../interfaces/Column';
import style from '../styles/index.module.scss';

export default function getDefaultProps(children: React.ReactNode) {
  return React.Children.map(children, (child: React.ReactNode) => {
    if (!React.isValidElement(child)) return null;

    let properties = child?.props?.properties; // @ts-ignore
    let template = child?.props?.template || ColumnTypes.STRING;

    // @ts-ignore
    const defaultWidth = child?.props?.width || {
      [ColumnTypes.SHORT_NUMBER]: 70,
      [ColumnTypes.PULL_REQUESTS]: 80,
      [ColumnTypes.TASK]: 120,
      [ColumnTypes.TAGS]: 100,
    }[template || ''] || 0;

    // @ts-ignore
    const className = child?.props?.className || {
      [ColumnTypes.STRING]: '',
      [ColumnTypes.NUMBER]: style.table_cell_number,
      [ColumnTypes.SHORT_NUMBER]: style.table_cell_number,
    }[template || ''] || '';

    // @ts-ignore
    const minWidth = child?.props?.minWidth || {
      [ColumnTypes.STRING]: 200,
      [ColumnTypes.NUMBER]: 110,
    }[template || ''] || 40;

    if (template === ColumnTypes.PULL_REQUESTS) {
      template = (prIds: number[]) => {
        if (!prIds.length) return '';
        const prByName = statisticStore.statisticsByCommits.pr.totalInfoByName;
        const prExternalId = prByName.get(prIds[0])?.prExternalId;
        const link = <PRLink prId={prExternalId} />;
        if (prIds.length === 1) return link;
        return (
          <>
            {link}
            <UiKitTag
              mode="empty"
              value={`+${prIds.length - 1}`}
            />
          </>
        );
      };
    } else if (template === ColumnTypes.TASK) {
      template = (value: string) => <TaskLink task={value} />;
    } else if (template === ColumnTypes.TAGS) {
      template = (value: any) => <UiKitTags value={value} />;
    }

    // @ts-ignore
    const isSortable = child?.props?.isSortable // @ts-ignore
      ? child?.props?.isSortable
      : [ColumnTypes.STRING, ColumnTypes.NUMBER, ColumnTypes.SHORT_NUMBER].includes(template);

    return {
      ...child.props as object,
      properties,
      className,
      template,
      isSortable,
      minWidth,
      defaultWidth,
      width: undefined,
      userWidth: undefined,
    };
  });
}
