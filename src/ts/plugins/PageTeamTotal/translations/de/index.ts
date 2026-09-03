export default `
§ plugin.team_total.sidebar: Allgemeine Informationen
§ plugin.team_total.common.title: Über das Projekt
§ plugin.team_total.workSpeed.title: Aufgaben pro Tag
§ plugin.team_total.workSpeed.description: Durchschnittlicher Teamdurchsatz bei der aktuellen Mitarbeiterzusammensetzung
§ plugin.team_total.employment.title: arbeitet / ausgeschieden
§ plugin.team_total.employment.description: Wenn ein Mitarbeiter innerhalb eines Monats keinen einzigen commit erstellt hat, gilt er als ausgeschieden
§ plugin.team_total.common.duration.title: gesamte Arbeitsdauer
§ plugin.team_total.common.duration.description: Gesamte Entwicklungszeit vom ersten bis zum letzten commit.
§ plugin.team_total.common.location.title: Hauptsitz
§ plugin.team_total.common.location.description: Beliebtester Standort für die aktuelle Kernzusammensetzung der Mitarbeiter.
§ plugin.team_total.common.employees.title: Personen in der Abteilung
§ plugin.team_total.common.employees.description: Auf Basis der Prognose der Gesamtmitarbeiterzahl anhand der Änderungsrate der Aufgaben-IDs.
§ plugin.team_total.release.title: Release-Informationen
§ plugin.team_total.release.total.title: Releases insgesamt
§ plugin.team_total.release.total.description: Ein Release ist ein branch mit dem Wort "release". In der Regel erscheinen sie in "auto-merge"-Ereignissen.
§ plugin.team_total.money.title: Schätzung der Entwicklungskosten
§ plugin.team_total.moneyAll.title: insgesamt
§ plugin.team_total.moneyAll.description: Gesamte Personalkosten einschließlich Urlaubsvergütung und Überzahlung für Wochenendarbeit.
§ plugin.team_total.moneyWorked.title: tatsächlich
§ plugin.team_total.moneyWorked.description: Tatsächlich gearbeitete Tage multipliziert mit dem Durchschnittsgehalt.
§ plugin.team_total.moneyLosses.title: mögliche Überzahlung
§ plugin.team_total.moneyLosses.description: Bezahlte Arbeitstage, an denen es keine commits gab.
§ plugin.team_total.weekendPayment.title: Wochenendarbeit
§ plugin.team_total.weekendPayment.description: Gesamte Überzahlung für Wochenendarbeit.
§ plugin.team_total.moneySpeed.title: pro Monat
§ plugin.team_total.moneySpeed.description: Prognostizierte Gehaltssumme bei der aktuellen Mitarbeiterzusammensetzung, ohne Steuern, Geräteabschreibung und Nebenkosten.
§ plugin.team_total.forecastingMoneyAll.title: Projektkosten im Zeitverlauf
§ plugin.team_total.forecastingMoneyAll.description: Mögliche Gehaltssumme im Zeitverlauf für alle potenziellen Mitarbeiter der Abteilung, die in den Logs nicht vorkommen, aber vorhanden gewesen sein könnten (anhand der Aufgaben-ID-Nummerierung im Task-Tracker).    
§ plugin.team_total.description1: *Personentage* sind die Arbeit eines Mitarbeiters während eines Arbeitstags. Zum Beispiel liefert ein Team aus drei Mitarbeitern an einem Kalendertag ein Arbeitsvolumen von drei Personentagen.
§ plugin.team_total.description2: *Abwesenheitstage* umfassen nur Arbeitstage, an denen commits hätten erstellt werden können. Wochenenden, gesetzliche Feiertage und Urlaub werden nicht in die Berechnung einbezogen.
§ plugin.team_total.description3: Die Karte *arbeitet / ausgeschieden* zeigt die tatsächlichen Mitarbeiter, die durchgängig an der Arbeit beteiligt sind. Darüber hinaus gibt es „Helfer“ — in der Regel Personen einer anderen Spezialisierung, die gelegentlich commits im Projekt erstellen.
§ plugin.team_total.description4: *Überzahlung* umfasst nur Arbeitstage, an denen commits hätten erstellt werden können. Wochenenden, gesetzliche Feiertage und Urlaub werden nicht in die Berechnung einbezogen. Deshalb gilt: Überzahlung + tatsächliche Kosten != Gesamtsumme. In den Gesamtkosten sind Zahlungen für Wochenenden, gesetzliche Feiertage und Urlaub enthalten.
§ plugin.team_total.description5: *Wochenendarbeit* wird mit einem Koeffizienten x2 gegenüber der Bezahlung eines normalen Tages berechnet. Oben wird nur die Überzahlung (x1) angezeigt, weil die Tatsache der Überstunden selbst in diesem Zusammenhang nicht relevant ist. Wir betrachten nicht die Geschwindigkeit der Budgetverbrennung. Wir betrachten die Überzahlung bei steigender Arbeitsgeschwindigkeit.
`;
