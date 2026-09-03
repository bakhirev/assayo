export default `
§ plugin.team_total.sidebar: Informations générales
§ plugin.team_total.common.title: À propos du projet
§ plugin.team_total.workSpeed.title: tâches par jour
§ plugin.team_total.workSpeed.description: Débit moyen de l’équipe avec la composition actuelle des salariés
§ plugin.team_total.employment.title: travaille / parti
§ plugin.team_total.employment.description: Si un salarié n’a effectué aucun commit pendant un mois, il est considéré comme parti
§ plugin.team_total.common.duration.title: durée totale du travail
§ plugin.team_total.common.duration.description: Temps total de développement du premier au dernier commit.
§ plugin.team_total.common.location.title: siège
§ plugin.team_total.common.location.description: Localisation la plus fréquente pour la composition principale actuelle des salariés.
§ plugin.team_total.common.employees.title: personnes dans le service
§ plugin.team_total.common.employees.description: D’après la prévision de l’effectif total selon le rythme de changement des identifiants de tâches.
§ plugin.team_total.release.title: Informations sur les versions
§ plugin.team_total.release.total.title: versions au total
§ plugin.team_total.release.total.description: Une version est un branch contenant le mot "release". En règle générale, elles apparaissent dans les événements "auto-merge".
§ plugin.team_total.money.title: Estimation du coût de développement
§ plugin.team_total.moneyAll.title: total
§ plugin.team_total.moneyAll.description: Coûts salariaux totaux, y compris les congés payés et le surpaiement pour le travail le week-end.
§ plugin.team_total.moneyWorked.title: réel
§ plugin.team_total.moneyWorked.description: Jours réellement travaillés multipliés par le salaire moyen.
§ plugin.team_total.moneyLosses.title: surpaiement possible
§ plugin.team_total.moneyLosses.description: Jours ouvrés payés sans aucun commit.
§ plugin.team_total.weekendPayment.title: travail le week-end
§ plugin.team_total.weekendPayment.description: Surpaiement total pour le travail le week-end.
§ plugin.team_total.moneySpeed.title: par mois
§ plugin.team_total.moneySpeed.description: Masse salariale prévisionnelle avec la composition actuelle des salariés, hors impôts, amortissement du matériel et coûts associés.
§ plugin.team_total.forecastingMoneyAll.title: coûts du projet dans le temps
§ plugin.team_total.forecastingMoneyAll.description: Masse salariale possible dans le temps pour tous les salariés potentiels du service absents des logs mais qui auraient pu exister (d’après la numérotation des identifiants de tâches dans le gestionnaire de tâches).    
§ plugin.team_total.description1: Les *jours-personne* correspondent au travail d’un salarié pendant une journée ouvrée. Par exemple, en un jour calendaire, une équipe de trois salariés produit un volume de travail de trois jours-personne.
§ plugin.team_total.description2: Les *jours d’absence* n’incluent que les jours ouvrés où des commits auraient pu être effectués. Les week-ends, jours fériés et congés ne sont pas inclus dans le calcul.
§ plugin.team_total.description3: La carte *travaille / parti* montre les salariés réellement impliqués de façon continue dans le travail. En outre, il existe des « assistants » — généralement des personnes d’une autre spécialité qui peuvent parfois effectuer des commits dans le projet.
§ plugin.team_total.description4: Le *surpaiement* n’inclut que les jours ouvrés où des commits auraient pu être effectués. Les week-ends, jours fériés et congés ne sont pas inclus dans le calcul. C’est pourquoi surpaiement + coût réel != total. Le coût total inclut les paiements pour les week-ends, jours fériés et congés.
§ plugin.team_total.description5: Le *travail le week-end* est calculé avec un coefficient x2 par rapport à la rémunération d’une journée normale. Seul le surpaiement (x1) est affiché ci-dessus, car le fait même des heures supplémentaires n’est pas pertinent dans ce contexte. Nous ne regardons pas la vitesse de consommation du budget. Nous regardons le surpaiement lorsque la vitesse de travail augmente.
`;
