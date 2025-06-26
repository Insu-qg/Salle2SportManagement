

### Objectif

Effectuer des tests unitaires sur les modules critiques du système en isolant leurs dépendances. Ces tests valident le bon fonctionnement des **services métiers** ou des **composants UI isolés**.

### Backend : Services testés

| Service concerné      | Pourquoi tester ?                                               |
| --------------------- | --------------------------------------------------------------- |
| `bookingService`      | Validation des capacités, empêchement de double réservation     |
| `classService`        | Vérification de la disponibilité et capacité des cours          |
| `dashboardService`    | Agrégation des données (stats, historique, filtres)             |
| `userService`         | Gestion des rôles, profils, logique de modification utilisateur |
| `subscriptionService` | Vérification de l’abonnement actif/inactif, date d’expiration   |


Chaque service sera testé sur :

* Cas standard (utilisation normale),
* Cas d’erreur ou données invalides,
* Cas limite (capacités max, seuils horaires, etc.).

### Frontend : Composants testés

| Vue             | Raison de test                                                   |
| --------------- | ---------------------------------------------------------------- |
| `LoginView`     | Gestion du formulaire, validation, erreurs d’authentification    |
| `DashboardView` | Affichage des stats utilisateur, comportement selon l’abonnement |
| `AdminView`     | Affichage CRUD, gestion des rôles, formulaire de création/modif  |


Ces tests se concentrent sur :

* La logique de validation,
* Les états d’interface (disabled, loading),
* Le rendu conditionnel (données manquantes ou extrêmes).

---

