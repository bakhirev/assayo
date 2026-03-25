export default `
§ plugin.team_total.sidebar: Informations générales
§ plugin.team_total.common.title: Informations générales
§ plugin.team_total.common.duration.title: durée totale des travaux
§ plugin.team_total.common.duration.description: Toute la durée de développement, du premier au dernier commit
§ plugin.team_total.common.location.title: siège
§ plugin.team_total.common.employees.title: personnes dans le service
§ plugin.team_total.release.title: Informations sur les versions
§ plugin.team_total.release.total.title: versions au total
§ plugin.team_total.release.total.description: Informations sur les versions
§ plugin.team_total.money.title: Coût de développement
§ plugin.team_total.titleA: Volume de travaux
§ plugin.team_total.titleB: Coût
§ plugin.team_total.daysWorked.title: jours-homme
§ plugin.team_total.daysWorked.description: Seuls les jours où des commits ont été effectués sont pris en compte
§ plugin.team_total.commits.title: commits
§ plugin.team_total.commits.description: Les branches supprimées ne sont pas comptées
§ plugin.team_total.daysLosses.title: jours sans commits
§ plugin.team_total.daysLosses.description: Tous les jours moins : jours fériés, week-ends, congés, jours avec commits
§ plugin.team_total.employment.title: actifs / sortis
§ plugin.team_total.employment.description: Si un employé ne fait aucun commit pendant un mois, il est considéré comme sorti
§ plugin.team_total.moneyAll.title: coûts de développement
§ plugin.team_total.moneyAll.description: Coûts salariaux cumulés, incluant les congés payés et le surcoût du travail le week-end.
§ plugin.team_total.moneyWorked.title: réel
§ plugin.team_total.moneyWorked.description: Jours effectivement travaillés multipliés par le salaire moyen
§ plugin.team_total.moneyLosses.title: surcoût possible
§ plugin.team_total.moneyLosses.description: Jours ouvrés payés alors qu’il n’y a pas eu de commits
§ plugin.team_total.weekendPayment.title: travail le week-end
§ plugin.team_total.weekendPayment.description: Surcoût total du travail le week-end
§ plugin.team_total.workSpeed.title: tâches par jour
§ plugin.team_total.workSpeed.description: Vitesse moyenne de l’équipe avec la composition actuelle du personnel
§ plugin.team_total.moneySpeed.title: par mois
§ plugin.team_total.moneySpeed.description: Montant prévisionnel de la masse salariale avec la composition actuelle du personnel, hors taxes et coûts associés
§ plugin.team_total.description1: *Les jours-homme* correspondent au travail d’un employé pendant une journée ouvrée. Par exemple, en un jour calendaire, une équipe de trois employés produit un volume de travail de trois jours-homme.
§ plugin.team_total.description2: Les *jours d’absence* ne comptent que les jours ouvrés où des commits auraient pu être réalisés. Les week-ends, jours fériés et congés ne sont pas inclus dans le calcul.
§ plugin.team_total.description3: La carte *actifs / sortis* montre la composition réelle des collaborateurs qui participent en continu au travail. En plus, il existe des « assistants » — généralement des collaborateurs d’une autre spécialité — qui peuvent parfois faire des commits dans le projet.
§ plugin.team_total.description4: Le *surcoût* ne comprend que les jours ouvrés où des commits auraient pu être réalisés. Les week-ends, jours fériés et congés ne sont pas inclus dans le calcul. C’est pourquoi surcoût + coût réel != total. Le total inclut le paiement des week-ends, jours fériés et congés.
§ plugin.team_total.description5: Le *travail le week-end* est calculé avec un coefficient x2 par rapport à la rémunération d’une journée normale. Seul le surcoût (x1) est affiché ci-dessus, car le fait même des heures supplémentaires n’est pas pertinent dans ce contexte. Nous ne regardons pas la vitesse de consommation du budget. Nous regardons le surcoût lorsque la vitesse de travail augmente.
`;
