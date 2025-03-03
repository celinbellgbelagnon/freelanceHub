Freelance Hub
Bienvenue sur Freelance Hub, une application dédiée à la gestion des freelances qui propoesent des services et des clients qui propposent des services. Cette application permet aux administrateurs de consulter les freelances inscrits, leurs informations personnelles, et plus encore.

Table des matières
Description
Prérequis
Installation
Usage
API Endpoints
Contributions
License

Description
Freelance Hub est une plateforme de gestion des freelances qui permet aux administrateurs de visualiser les freelances inscrits, leurs spécialités, leurs coordonnées, ainsi que la date d'inscription et les clients proposant des marchés.

L'application utilise React pour l'interface front-end et Node.js avec Express pour la gestion des requêtes backend. Les données des freelances sont stockées dans une base de données MySQL.

Prérequis
Avant de démarrer l'application, assurez-vous d'avoir les prérequis suivants :

Node.js installé sur votre machine
MySQL pour la gestion des données
Axios pour faire des appels API
Installation

1. Clonez le dépôt
Clonez le projet sur votre machine locale :

bash
Copier
Modifier
[git clone https://github.com/votre-utilisateur/freelance-hub.git](https://github.com/celinbellgbelagnon/freelanceHub)
cd free-lance
cd client/ cd admin/ cd server

2. Installer les dépendances pour le Backend
Allez dans le répertoire du serveur et installez les dépendances :(bcrypt, jsonwebtoken, express, cors, nodemon)

bash
Copier
Modifier
cd server
npm install

3. Configuration de la base de données
Créez une base de données MySQL et exécutez la requête suivante pour créer la table freelance :

sql
Copier
Modifier
CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_admin` varchar(100) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `username` (`username`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `freelance` (
  `id_freelance` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_freelance` varchar(60) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `specialite` varchar(100) DEFAULT NULL,
  `date_inscription` datetime DEFAULT NULL,
  PRIMARY KEY (`id_freelance`),
  UNIQUE KEY `username` (`username`,`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `projet_sub` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_client` varchar(255) NOT NULL,
  `email_client` varchar(255) NOT NULL,
  `telephone_client` varchar(20) DEFAULT NULL,
  `titre_projet` varchar(200) NOT NULL,
  `description_projet` text,
  `budget` decimal(10,2) DEFAULT NULL,
  `date_soumission` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

4. Installer les dépendances pour le Frontend
Allez dans le répertoire du client et installez les dépendances :(axios, react-router-dom,aos,framer-motion,react-icons)

bash
Copier
Modifier
cd client
npm install

5. Démarrer l'application
Backend :
Dans le répertoire server, lancez l'application Node.js :

bash
Copier
Modifier
nodemon
Le backend sera accessible sur http://localhost:5000.

Frontend :
Dans le répertoire client, lancez l'application React :

bash
Copier
Modifier
npm start
L'interface utilisateur sera accessible sur http://localhost:3000.

Usage
sur la page client, le client aura la possibilité de soumettres des projets tout en déposant ses coordonnées 
et le freealace aussi après être connecté, il pourra verra les projets desclient et pourras rentré en contact avec ces derniers

sur la page admin, après être conecté l'admin aura acces à tous les ifor,qtions de clients et des freelances

API Endpoints
Voici les principaux endpoints disponibles dans l'API de Freelance Hub :

