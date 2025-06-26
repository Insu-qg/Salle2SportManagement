### Objectif

Effectuer des tests d’intégration couvrant les **flux critiques** entre modules ou entre le client et le serveur.

### Backend : Scénarios d’intégration

| Fichier                            | Cas couverts                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| `booking.integration.test.ts`      | Réservation complète → mise à jour cours + pénalité en cas d’annulation tardive |
| `user.integration.test.ts`         | Mise à jour du profil → validation, persistence, droits                         |
| `subscription.integration.test.ts` | Création / expiration → effet sur accès aux cours ou actions limitées           |
| `dashboard.integration.test.ts`    | Données agrégées pour un utilisateur sur 1 mois (cours, stats)                  |
| `billing.integration.test.ts`        | Simulation de facturation → calculs, pénalités, génération d’un relevé          |

### Frontend : Scénarios d’intégration

| Fichier                         | Cas couverts                                                             |
| ------------------------------- | ------------------------------------------------------------------------ |
| `Login.integration.test.ts`     | Soumission du formulaire → redirection / message d’erreur backend        |
| `Dashboard.integration.test.ts` | Rendu avec réservations expirées / utilisateur sans abonnement           |
| `AdminView.integration.test.ts` | Création/suppression d’utilisateur, filtre par rôle, comportement erreur |
| `BookingFlow.integration.test.ts`  | Réservation + annulation tardive → gestion message d’erreur + retour UI   |
| `Register.integration.test.ts`     | Création de compte → soumission, champs invalides, message backend        |




---
