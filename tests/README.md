# Stratégie de Test – Gym Management System

## 1. Introduction

Le *Gym Management System* est une application fullstack visant à digitaliser la gestion d’une salle de sport : abonnements, réservations de cours, gestion des utilisateurs, facturation, etc. Elle propose une interface utilisateur (membres) et une interface d’administration (staff).

**Objectifs de la stratégie de test** :
- Garantir la fiabilité des fonctionnalités critiques liées aux réservations, abonnements et facturation.
- Assurer la stabilité et la performance du système face à la montée en charge.
- Prévenir les régressions fonctionnelles lors des mises à jour.
- Protéger les données des utilisateurs (RGPD, accès non autorisé).

---

## 2. Identification des fonctionnalités critiques

| Fonctionnalité                  | Description                                               | Criticité |
|-------------------------------|-----------------------------------------------------------|-----------|
| Réservation de cours          | Gestion des inscriptions avec règles de capacité         | Forte     |
| Annulation & politique no-show | Annulations tardives facturées selon le type d’abonnement| Forte     |
| Gestion des abonnements       | Facturation mensuelle, pénalités, types variés           | Forte     |
| Authentification & rôles      | Accès sécurisé, séparation USER / ADMIN                  | Moyenne   |
| Gestion des utilisateurs      | CRUD Admin des comptes utilisateurs                      | Moyenne   |
| Dashboard (admin & user)      | Statistiques personnalisées                              | Faible    |

---

## 3. Couverture par typologie de test

### ✅ Tests Unitaires (TU)
- **Testés** : Services métier (réservation, facturation, pénalité), contrôleurs
- **Outils** : Jest (backend Node.js), Vitest ou Jest (Vue.js frontend)
- **Pourquoi** : Vérifier l’intégrité des règles métiers critiques.
- **Exclus** : Petits composants Vue sans logique, fonctions d’affichage.

### ✅ Tests d’Intégration (TI)
- **Testés** : API REST (ex: POST /bookings, PUT /subscriptions/:id)
- **Outils** : Jest + Docker pour environnement réaliste
- **Pourquoi** : Valider l’interaction entre la couche API, services et base de données.
- **Exclus** : Endpoints de test ou d'administration peu utilisés.

### ✅ Tests End-to-End (E2E)
- **Testés** : Scénarios complets utilisateur (réservation, annulation, abonnement)
- **Outils** : Playwright (multi-navigateur)
- **Pourquoi** : Reproduire le parcours d’un utilisateur réel (USER + ADMIN).
- **Exclus** : Fonctions peu critiques (ex: mise à jour du profil).

### ✅ Tests de Charge
- **Testés** : Résilience de l’API lors de pics (réservations simultanées)
- **Outils** : K6
- **Pourquoi** : Tester les limites de capacité (ex: 50 réservations en parallèle).
- **Exclus** : Frontend (chargé par CDN, impact moindre).

### ✅ Tests de Sécurité
- **Testés** : Authentification, accès non autorisé, injection SQL, rôles
- **Outils** : ZAP, es-lint plugin security
- **Pourquoi** : Garantir la conformité minimale aux bonnes pratiques de sécurité.
- **Exclus** : UI frontend.

---

## 4. Approche par couche (frontend / backend)

### 🖥 Frontend (Vue 3)
- **Tests** :
  - Composants critiques (ex: booking form)
  - Navigation guard (auth/rôle)
  - Flows utilisateur (réservation, annulation)
- **Outils** : Vitest ou Jest, Testing Library, Playwright

### 🔧 Backend (Node.js + Prisma)
- **Tests** :
  - Services métier (facturation, règles de réservation)
  - API endpoints
  - Contrôles d’accès
- **Outils** : Jest, Prisma test db

---

## 5. Planification et Priorisation

| Phase             | Tests                                   | Priorité  | Responsable |
|-------------------|------------------------------           |---------- |-------------|
| Phase 1           | TU services réservation & billing       | Haute     | Backend team |
| Phase 2           | TI endpoints /bookings, /subscriptions  | Haute     | Backend team |
| Phase 3           | E2E parcours USER & ADMIN               | Haute     | Binômes front/back |
| Phase 4           | Tests de charge sur `/bookings`         | Moyenne   | DevOps       |
| Phase 5           | TU frontend + guards + vues             | Moyenne   | Frontend team |
| Phase continue    | Tests de sécurité (analyse, patch)      | Moyenne   | Sécurité / QA |

---

## 6. Indicateurs de succès

| Indicateur                                       | Objectif |
|----------------------------                      | ----------|
| ✅ Couverture TU backend                        | > 80 %   |
| ✅ Couverture TI API                            | > 70 %   |
| ✅ Couverture E2E                               | > 90 % des scénarios critiques |
| ✅ Temps réponse API                            | < 300 ms (réservation / dashboard) |
| ✅ Résilience sous charge                       | 100 utilisateurs simultanés sans erreur |
| ✅ Aucune régression bloquante à chaque release |
| ✅ 0 fail aux tests d’accès sécurisé            |

---

## Carte de couverture prévisionnelle

| Couche      | TU | TI | E2E | Charge | Sécurité |
|-------------|----|----|-----|--------|----------|
| Réservation |✅ | ✅ | ✅  | ✅    | ✅       |
| Abonnements |✅ | ✅ | ✅  | ✅    | ✅       |
| Facturation |✅ | ✅ | ✅  |        | ✅      |
| Auth / Roles|✅ | ✅ | ✅  |        | ✅       |
| Dashboards  |   |     | ✅  |        |          |
| CRUD Admin  |   | ✅  | ✅ |        | ✅       |

---

