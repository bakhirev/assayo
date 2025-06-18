import { HashMap } from 'ts/interfaces/HashMap';

export interface DayEvent {
  firstDay: Set<string> | undefined;
  lastDay: Set<string> | undefined;
  release: Set<string> | undefined;
}

export type DayEvents = HashMap<DayEvent>;

function getDayEvent(): DayEvent {
  return {
    firstDay: undefined,
    lastDay: undefined,
    release: undefined,
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
    if (user.isStaff) return;

    updateEvent(events, user.firstCommit.timestamp, getCallback('firstDay', user.author));

    if (user.isDismissed) {
      updateEvent(events, user.lastCommit.timestamp, getCallback('lastDay', user.author));
    }
  });
}

function addByRelease(events: DayEvents, releases: any[]) {
  releases.forEach((release: any) => {
    updateEvent(events, release.lastCommit.timestamp, getCallback('release', release.title));
  });
}

export function getEvents(statisticByAuthors: any[], statisticByRelease: any[]) {
  const events = new Map();
  addByAuthor(events, statisticByAuthors);
  addByRelease(events, statisticByRelease);
  return events;
}
