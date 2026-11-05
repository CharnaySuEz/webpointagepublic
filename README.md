# Web Pointage

Application web interne de saisie et de transmission des feuilles de temps.

Cette application permet aux collaborateurs de renseigner leur semaine de travail, gérer les exceptions (astreintes, heures supplémentaires, indemnités repas, grands déplacements, etc.) et transmettre automatiquement les informations vers Power Automate. Basée sur les fichiers index.html, app.js, constants.js, date.js et collaborateurs.js. 【1-e8c743】【2-7d88c8】【3-00508e】【4-3d3625】【5-1868a1】

---

## 🎯 Objectif

Simplifier la saisie des feuilles de temps hebdomadaires 

## ✨ Fonctionnalités

### Informations générales

- Sélection du site
- Sélection du collaborateur
- Calcul automatique de la semaine ISO
- Renseignement automatique :
  - matricule
  - nom
  - adresse mail

### Gestion des horaires

- Pré-remplissage de la semaine type
- Modification libre des horaires
- Gestion des plages horaires multiples
- Calcul automatique du temps travaillé
- Affichage du cumul journalier
- Affichage du cumul hebdomadaire

### Types d'horaires supportés

#### Horaire standard

Lundi à Jeudi :

- 08:00 → 12:00
- 13:30 → 17:00

Vendredi :

- 08:00 → 12:00
- 13:30 → 16:30

#### Horaire pause 45 minutes

Lundi à Jeudi :

- 08:00 → 12:00
- 13:15 → 16:45

Vendredi :

- 08:00 → 12:00
- 13:15 → 16:15

#### Semaine de 4 jours

Lundi à Jeudi :

- 07:30 → 12:00
- 13:15 → 18:00

Vendredi :

- Non travaillé

Ces modèles sont pilotés par constants.js. 

---

## 🚨 Contrôles réglementaires

### Contrôle journalier

Détection automatique :

- des journées supérieures à 10 heures ;
- obligation de saisir un motif justificatif.

### Contrôle hebdomadaire

Détection automatique :

- des semaines supérieures à 48 heures ;
- obligation de saisir un motif justificatif.

---

## 🔧 Gestion des exceptions

### Horaires exceptionnels

Ajout rapide de créneaux :

- Matin
- Midi
- Soir

### Motifs

Gestion des codes :

- AUTO
- CPAY
- MEMO
- RTTQ
- RTTA
- RTTJ
- AMAL
- AUTRE

### Types

Gestion des typologies :

- X
- HIA

---

## 📞 Gestion des astreintes

Possibilité de déclarer :

- Date de début
- Heure de début
- Date de fin
- Heure de fin

Suivi des catégories :

- OET JT
- OET JNT
- TSM JT
- TSM JNT

Pour :

- Encadrement
- Intervention

---

## 🍽 Gestion des indemnités

Suivi des éléments variables :

- Indemnités repas chantier
- Paniers jours
- Tickets restaurant
- Grands déplacements

Valeur par défaut :

- 5 tickets restaurant par semaine normale

---

## 📊 Calcul automatique

L'application calcule en temps réel :

- Temps travaillé par jour
- Temps travaillé par semaine
- Écart par rapport à l'objectif
- Dépassements réglementaires

Affichage dynamique :

- Temps incomplet
- Semaine normale
- Temps supplémentaire

---

## 📤 Génération et transmission

L'application :

1. Contrôle les données saisies ;
2. Construit un objet JSON normalisé ;
3. Ajoute les informations :
   - générales ;
   - horaires ;
   - astreintes ;
   - indemnités ;
   - dépassements ;
4. Transmet les données vers Power Automate.

Le moteur principal est implémenté dans app.js. 【2-7d88c8】

---

## 📁 Structure du projet

```text
webPointage/
│
├── index.html
│
├── css/
│   └── style.css
│
└── js/
    ├── app.js
    ├── constants.js
    ├── collaborateurs.js
    ├── date.js
    ├── options.js
    └── usersConstant.js
```

### Description des principaux fichiers

| Fichier | Description |
|----------|-------------|
| app.js | Logique principale de l'application |
| constants.js | Constantes métier et modèles horaires |
| collaborateurs.js | Gestion des collaborateurs |
| date.js | Calcul des semaines ISO et gestion des dates |
| options.js | Génération des listes déroulantes |
| usersConstant.js | Données des collaborateurs et paramètres |
| style.css | Présentation graphique |

Ces éléments sont utilisés par index.html. 【1-e8c743】【3-00508e】【4-3d3625】【5-1868a1】

---

## 🛠 Développement

### Lancement local

Ouvrir simplement :

```text
index.html
```

dans un navigateur moderne.


## ⚙️ Version

Version actuelle :

```text
V5.0
```

Définie dans constants.js. 

---

## 🔐 Sécurité

### État actuel

L'application est destinée à un usage interne.

Les points d'amélioration identifiés :

- externalisation des données collaborateurs ;
- suppression des secrets exposés côté client ;
- sécurisation des appels Power Automate ;
---

## 🚀 Évolutions en cours

- Externalisation des utilisateurs 'RGPD ?'
- Historisation des saisies
- Sécurisation des flux Power Automate 'fait coté PWA'

--



## 👨‍💻 Auteur

Julien Lardant

Responsable d'exploitation

SUEZ Eau France

---

## 📄 Licence

Projet interne.

Utilisation réservée au périmètre professionnel autorisé.