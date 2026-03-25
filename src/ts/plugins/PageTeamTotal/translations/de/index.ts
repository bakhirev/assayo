export default `
§ plugin.team_total.sidebar: Allgemeine Informationen
§ plugin.team_total.common.title: Allgemeine Informationen
§ plugin.team_total.common.duration.title: gesamte Arbeitsdauer
§ plugin.team_total.common.duration.description: Gesamte Entwicklungszeit vom ersten bis zum letzten Commit
§ plugin.team_total.common.location.title: Zentrale
§ plugin.team_total.common.employees.title: Personen in der Abteilung
§ plugin.team_total.release.title: Release-Informationen
§ plugin.team_total.release.total.title: Releases insgesamt
§ plugin.team_total.release.total.description: Release-Informationen
§ plugin.team_total.money.title: Entwicklungskosten
§ plugin.team_total.titleA: Arbeitsvolumen
§ plugin.team_total.titleB: Kosten
§ plugin.team_total.daysWorked.title: Personentage
§ plugin.team_total.daysWorked.description: Es werden nur Tage berücksichtigt, an denen Commits erstellt wurden
§ plugin.team_total.commits.title: Commits
§ plugin.team_total.commits.description: Gelöschte Branches werden nicht gezählt
§ plugin.team_total.daysLosses.title: Tage ohne Commits
§ plugin.team_total.daysLosses.description: Alle Tage minus: Feiertage, Wochenenden, Urlaub, Tage mit Commits
§ plugin.team_total.employment.title: aktiv / ausgeschieden
§ plugin.team_total.employment.description: Wenn ein Mitarbeiter innerhalb eines Monats keinen einzigen Commit macht, gilt er als ausgeschieden
§ plugin.team_total.moneyAll.title: Entwicklungskosten
§ plugin.team_total.moneyAll.description: Gesamtaufwand für Gehälter; inkl. Urlaubsvergütung und Mehrzahlung für Wochenendarbeit.
§ plugin.team_total.moneyWorked.title: tatsächlich
§ plugin.team_total.moneyWorked.description: Tatsächlich gearbeitete Tage multipliziert mit dem Durchschnittsgehalt
§ plugin.team_total.moneyLosses.title: mögliche Mehrzahlung
§ plugin.team_total.moneyLosses.description: Bezahlte Arbeitstage, an denen es keine Commits gab
§ plugin.team_total.weekendPayment.title: Wochenendarbeit
§ plugin.team_total.weekendPayment.description: Gesamte Mehrzahlung für Wochenendarbeit
§ plugin.team_total.workSpeed.title: Aufgaben pro Tag
§ plugin.team_total.workSpeed.description: Durchschnittliche Teamleistung bei aktueller Mitarbeiterzusammensetzung
§ plugin.team_total.moneySpeed.title: pro Monat
§ plugin.team_total.moneySpeed.description: Prognostizierte Auszahlungssumme für Gehälter bei aktueller Mitarbeiterzusammensetzung, ohne Steuern und Nebenkosten
§ plugin.team_total.description1: *Personentage* sind die Arbeit eines Mitarbeiters während eines Arbeitstags. Zum Beispiel liefert ein Team aus drei Mitarbeitern an einem Kalendertag ein Arbeitsvolumen von drei Personentagen.
§ plugin.team_total.description2: Als *Fehltage* gelten nur Arbeitstage, an denen Commits hätten gemacht werden können. Wochenenden, gesetzliche Feiertage und Urlaub werden nicht berücksichtigt.
§ plugin.team_total.description3: Die Karte *aktiv / ausgeschieden* zeigt die tatsächliche Zusammensetzung der Mitarbeiter, die kontinuierlich an der Arbeit beteiligt sind. Zusätzlich gibt es „Helfer“ — das sind in der Regel Mitarbeiter einer anderen Spezialisierung, die gelegentlich Commits ins Projekt bringen.
§ plugin.team_total.description4: Als *Mehrzahlung* gelten nur Arbeitstage, an denen Commits hätten gemacht werden können. Wochenenden, gesetzliche Feiertage und Urlaub werden nicht berücksichtigt. Deshalb gilt: Mehrzahlung + tatsächliche Kosten != Gesamt. In den Gesamtkosten sind Zahlungen für Wochenenden, gesetzliche Feiertage und Urlaub enthalten.
§ plugin.team_total.description5: Als *Wochenendarbeit* gilt ein Koeffizient von x2 im Vergleich zur Bezahlung eines normalen Tages. Oben wird nur die Mehrzahlung (x1) angezeigt, da der Fakt der Mehrarbeit in diesem Kontext nicht relevant ist. Wir betrachten nicht die Budget-Burn-Rate. Wir betrachten die Mehrzahlung bei steigender Arbeitsgeschwindigkeit.
`;
