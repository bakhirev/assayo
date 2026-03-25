import { HashMap } from 'ts/interfaces/HashMap';

export interface DayEvent {
  firstDay: Set<string> | undefined;
  lastDay: Set<string> | undefined;
  release: Set<string> | undefined;
  vacationStart: Set<string> | undefined;
  vacationEnd: Set<string> | undefined;
  travel: Set<string> | undefined;
}

export type DayEvents = HashMap<DayEvent>;

function getDayEvent(): DayEvent {
  return {
    firstDay: undefined,
    lastDay: undefined,
    release: undefined,
    vacationStart: undefined,
    vacationEnd: undefined,
    travel: undefined,
  };
}

function updateEvent(events: DayEvents, timestamp: string, callback: Function) {
  const day = events.get(timestamp) || getDayEvent();
  callback(day);
  events.set(timestamp, day);
}

function getCallback(property: string, name: string) {
  return function updateEventProperty(event: DayEvent) {
    if (event[property]) {
      event[property].add(name);
    } else {
      event[property] = new Set([name]);
    }
  };
}

function addByAuthor(events: DayEvents, authors: any[]) {
  authors.forEach((user: any) => {
    user?.countries?.forEach((travel: any) => {
      updateEvent(events, travel.fromTimestamp, getCallback('travel', user.author));
    });

    if (user.isStaff) return;

    updateEvent(events, user.firstCommitTimestamp, getCallback('firstDay', user.author));

    if (user.isDismissed) {
      updateEvent(events, user.lastCommitTimestamp, getCallback('lastDay', user.author));
    }
  });
}

function addByRelease(events: DayEvents, releases: any[]) {
  releases.forEach((release: any) => {
    updateEvent(events, release.to.timestamp, getCallback('release', release.title));
  });
}

function addByAbsence(events: DayEvents, absence: any[]) {
  absence.forEach((item: any) => {
    if (item.duration > 30) return;
    updateEvent(events, item.from.timestamp, getCallback('vacationStart', item.author));
    updateEvent(events, item.to.timestamp, getCallback('vacationEnd', item.author));
  });
}

export function getEvents(
  statisticByAuthors: any[],
  statisticsByCommits: any,
) {
  const events = new Map();
  addByAuthor(events, statisticByAuthors);
  addByRelease(events, statisticsByCommits.release.totalInfo);
  addByAbsence(events, statisticsByCommits.absence.totalInfo);
  return events;
}
