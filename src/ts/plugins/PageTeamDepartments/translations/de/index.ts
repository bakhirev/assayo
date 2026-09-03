export default `
§ plugin.team_departments.sidebar: Abteilungen
§ plugin.team_departments.employmentsChart.title: Aktuelle Teamgrößen
§ plugin.team_departments.employmentsChart.item: Teams
§ plugin.team_departments.employmentsChart.less1: ein Mitarbeiter
§ plugin.team_departments.employmentsChart.less2: zwei Mitarbeiter
§ plugin.team_departments.employmentsChart.less3: drei Mitarbeiter
§ plugin.team_departments.employmentsChart.less6: bis zu sechs Mitarbeitern
§ plugin.team_departments.employmentsChart.less9: bis zu neun Mitarbeitern
§ plugin.team_departments.employmentsChart.less12: bis zu 12 Mitarbeitern
§ plugin.team_departments.employmentsChart.less15: bis zu 15 Mitarbeitern
§ plugin.team_departments.employmentsChart.more: mehr als 15
§ plugin.team_departments.daysChart.title: Projektdauer
§ plugin.team_departments.daysChart.item: Projekte
§ plugin.team_departments.title: Projektliste
§ plugin.team_departments.status: Status
§ plugin.team_departments.active.yes: Entwicklung im Gange
§ plugin.team_departments.active.no: Keine neuen Aufgaben
§ plugin.team_departments.author.work: arbeitet
§ plugin.team_departments.author.dismissed: ausgeschieden
§ plugin.team_departments.author.staff: Hilfskraft
§ plugin.team_departments.code: Code
§ plugin.team_departments.from: Erster commit
§ plugin.team_departments.to: Letzter
§ plugin.team_departments.authors: Personen
§ plugin.team_departments.tasks: Aufgaben
§ plugin.team_departments.totalDays: Dauer
§ plugin.team_departments.totalAuthors: Mitarbeiter
§ plugin.team_departments.totalTasks: Aufgaben
§ plugin.team_departments.employments.author: Mitarbeiter
§ plugin.team_departments.employments.worked: Arbeit
§ plugin.team_departments.employments.losses: Tage ohne commits
§ plugin.team_departments.employments.totalDays: Tage in der Abteilung
§ plugin.team_departments.employments.totalTasks: Erledigte Aufgaben
§ plugin.team_departments.banner.title: detaillierte Abteilungsinformationen
§ plugin.team_departments.details.title: Tatsächliche Abteilungsdaten
§ plugin.team_departments.details.totalDays: Arbeitsdauer
§ plugin.team_departments.details.moneyInMonth: Entwicklungskosten pro Monat
§ plugin.team_departments.details.moneyAll: Entwicklungskosten im Zeitverlauf
§ plugin.team_departments.details.mainLocation: Hauptstandort
§ plugin.team_departments.details.activeAuthors.title: arbeitet / hat verlassen
§ plugin.team_departments.details.activeAuthors.description: Wenn ein Mitarbeiter innerhalb eines Monats keinen einzigen commit durchführt, gilt er als ausgeschieden. Der Status wird für Mitarbeiter unabhängig von dieser Abteilung angezeigt: Sie können in einer beliebigen Abteilung arbeiten oder das Unternehmen vollständig verlassen haben.
§ plugin.team_departments.details.linesInTask.title: Codezeilen pro Aufgabe
§ plugin.team_departments.details.linesInTask.description: Gewichtete durchschnittliche Anzahl von Codezeilen pro Aufgabe. Hilft bei der Einschätzung der Aufgabengranularität.
§ plugin.team_departments.details.totalTasks.title: Aufgaben waren in Bearbeitung
§ plugin.team_departments.details.totalTasks.description: Jede Erwähnung einer eindeutigen Aufgaben-ID wird gezählt. Die Aufgabe wurde möglicherweise nicht im Aufgabentracker geschlossen.
§ plugin.team_departments.months.title: Mögliche Anzahl der Mitarbeiter in der Abteilung
§ plugin.team_departments.months.description: Der Aufgabentracker vergibt fortlaufende Aufgaben-IDs. Anhand der maximalen Aufgaben-ID zu Beginn und am Ende des Monats lässt sich die Zahl der *neuen Aufgaben* ermitteln. Die Zahl der in diesem Monat *behobenen* Aufgaben ist in den Logs sichtbar. Wer sie behoben hat (*gearbeitet hat*), ebenfalls. Die Zahl der später behobenen Aufgaben (*Backlog*) wird aus den Logs der Folgemonate berechnet. Wir extrapolieren den Durchsatz der sichtbaren Programmierer auf die Gesamtzahl der Aufgaben, um zu schätzen, wie viele *Programmierer insgesamt* in der Abteilung sein sollten. Anhand der Zahl der „Programmierer“ schätzen wir die Zahl der QA-Ingenieure, Analysten und Manager.
§ plugin.team_departments.months.newTaskInMonth: Neue Aufgaben
§ plugin.team_departments.months.tasksFixedThisGroup: Behoben
§ plugin.team_departments.months.tasksInBacklog: Backlog
§ plugin.team_departments.months.programmistInThisGroup: Haben gearbeitet
§ plugin.team_departments.months.allProgrammistInDepartment: Sollten arbeiten
§ plugin.team_departments.months.allUsersInDepartment: Mitarbeiter insgesamt
§ plugin.team_departments.forecasting.title: Prognose der Gesamtkosten
§ plugin.team_departments.forecasting.moneyInMonth.title: Abteilungskosten pro Monat
§ plugin.team_departments.forecasting.moneyInMonth.description: Die Zahl aller potenziellen Mitarbeiter (Entwicklung, QA, Analytik, Management) des letzten Monats wird mit dem Durchschnittsgehalt multipliziert.
§ plugin.team_departments.forecasting.moneyAll.title: Abteilungskosten im Zeitverlauf
§ plugin.team_departments.forecasting.moneyAll.description: Die Zahl aller potenziellen Mitarbeiter (Entwicklung, QA, Analytik, Management) für jeden Monat wird mit dem Durchschnittsgehalt multipliziert.
`;
