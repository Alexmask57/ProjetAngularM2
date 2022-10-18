# ProjetAngularM2

Bienvenue sur notre projet de gestion de tournoi Smash Bros

Ce projet a été réalisé pour le cours Angular de Master 2 Option Génie Informatique

Membres du groupe:
  - Dartevelle Jimmy
  - Maskio Alexis
  - Sid Nassym


## Comment lancer le projet
Le projet est entièrement "conteneurisé", pour lancer l'ensemble des contenneurs : `docker-compose up`

- Lien vers le site : `http://localhost:4200/`

- Lien vers le backend : `http://localhost:3000/`

- Lien vers phpMyAdmin (gestion bdd) : `http://localhost:8080/`

## Structure du docker-compose
Le projet est décomposé en 3 conteneurs:
- `nodejs-server`: serveur back-end NodeJS avec express
- `angular-ui`: serveur front-end avec angular
- `db`: base de données MySQL

Un dernier conteneur est présent pour pouvoir accéder à la bdd de manière graphique: `myadmin`

## Un problème avec docker-compose ?
Si jamais un problème se présente avec le container d'angular ou du back-end, 
il est possible de lancer le projet sans de la manière suivante:

Dans le fichier `_server/config.js` ligne 3, remplacer `db_mysql` par `localhost`, pour que le serveur puisse se connecter à la base de données

Dans le fichier `_server/url.js` ligne 8, remplacer `data/picture` par `_server/data/picture`, pour que le serveur puisse accèder aux images

On peut ensuite lancer le projet:
- Lancer la bdd et phpMyAdmin : `docker-compose up db myadmin`
- Lancer le back : `npm run server`
- Lancer le front : `npm start`

***Remarque: pour le premier lancement, lancer la commande `npm install` à la racine et dans le dossier `_server`***


## Enjoy :)


---
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.
