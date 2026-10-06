import recommendations from './recommendations';

export default `
§ plugin.team_weeks.sidebar: Nach Wochen
§ plugin.team_weeks.title: Statistik nach Wochen
§ plugin.team_weeks.numberTasks: Anzahl der Aufgaben
§ plugin.team_weeks.people: Anzahl der Mitarbeiter
§ plugin.team_weeks.line: Änderung der Zeilen
§ plugin.team_weeks.lossesDetails: Wer keinen commit gemacht hat
§ plugin.team_weeks.add: hinzugefügt
§ plugin.team_weeks.change: geändert
§ plugin.team_weeks.remove: entfernt
§ plugin.team_weeks.hasCommits: es gab commits
§ plugin.team_weeks.hasNotCommits: es gab keine commits
§ plugin.team_weeks.last.title: Statistik für die ausgewählte Woche
§ plugin.team_weeks.last.titleDefault: Letzte Woche
§ plugin.team_weeks.last.tasks.title: Aufgaben in dieser Woche
§ plugin.team_weeks.last.tasks.description: Eindeutige Aufgabennummern, die in diesem Zeitraum gefunden wurden
§ plugin.team_weeks.last.tasks.scoring: Wert der Vorwoche / Durchschnittswert des Vormonats
§ plugin.team_weeks.last.changes.title: Änderung der Zeilen
§ plugin.team_weeks.last.changes.description: Hinzugefügte, geänderte und entfernte Zeilen
§ plugin.team_weeks.last.changes.scoring: Wert der Vorwoche / Durchschnittswert des Vormonats
§ plugin.team_weeks.last.types.title: Commit-Typen
§ plugin.team_weeks.last.days.title: Tatsächliche Personentage
§ plugin.team_weeks.last.best.title: Am aktivsten
§ plugin.team_weeks.last.best.description: Die meisten Aufgaben in dieser Woche
§ plugin.team_weeks.last.quiet.title: Ruhige Woche
§ plugin.team_weeks.last.quiet.description: Die wenigsten Aufgaben in dieser Woche
§ plugin.team_weeks.last.vsPrev: gegenüber der Vorwoche
${recommendations}
`;
