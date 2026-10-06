export default `
§ plugin.team_weeks.recommendations.lazyDays.down.title: Weniger Fehlzeiten
§ plugin.team_weeks.recommendations.lazyDays.down.description: dieser Wert ist in den letzten drei Wochen gesunken
§ plugin.team_weeks.recommendations.lazyDays.up.title: Mehr Fehlzeiten
§ plugin.team_weeks.recommendations.lazyDays.up.description: es gibt keine Aufgaben, oder es ist eine strengere Kontrolle erforderlich
§ plugin.team_weeks.recommendations.notWork.title: Erbringt durchgehend nicht die volle Arbeitszeit
§ plugin.team_weeks.recommendations.notWork.description: da jede Woche weniger als 100 % der Zeit Code geschrieben wird
§ plugin.team_weeks.recommendations.upWork.title: Leistet durchgehend Überstunden
§ plugin.team_weeks.recommendations.upWork.description: da jede Woche am Wochenende Code geschrieben wird
§ plugin.team_weeks.recommendations.task.up.title: Die Produktivität steigt
§ plugin.team_weeks.recommendations.task.up.description
oder die Aufgaben sind zu klein geworden.
 
Dies muss geprüft werden. Wenn die Granularität gleich ist, das Ergebnis festigen.
§ plugin.team_weeks.recommendations.task.lazyMaintainer.description: ein beständiger Spitzenreiter beim Fehlen von commits.
§ plugin.team_weeks.recommendations.task.down.title: Die Produktivität sinkt
§ plugin.team_weeks.recommendations.task.down.description
oder die Aufgaben werden schlechter aufgeteilt. Dies muss geprüft werden. Wenn die Granularität gleich ist, unter Kontrolle nehmen.

# Bewertungsmethode:
- die Anzahl der Aufgaben pro Tag, an denen gearbeitet wird, sinkt über die letzten drei Wochen stetig.

# Mögliche Fehler:
- die Aufgaben könnten schwieriger gewesen sein, als es schien;
- die Aufgaben könnten einen großen Arbeitsumfang gehabt haben (prüfen, ob die Anzahl der Änderungen im selben Zeitraum sinkt)
`;
