CREATE DATABASE IF NOT EXISTS `freelancehub`
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `freelancehub`;


CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_admin` varchar(100) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `username` (`username`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `date_envoi` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(60) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `specialite` varchar(100) DEFAULT NULL,
  `date_inscription` date DEFAULT NULL,
  `profil` enum('freelance','client') NOT NULL DEFAULT 'freelance',
  `cv_pdf` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `username_email` (`username`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `projet_sub` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_client` varchar(255) NOT NULL,
  `email_client` varchar(255) NOT NULL,
  `telephone_client` varchar(20) DEFAULT NULL,
  `titre_projet` varchar(200) NOT NULL,
  `description_projet` text DEFAULT NULL,
  `budget` decimal(10,2) DEFAULT NULL,
  `date_soumission` timestamp NULL DEFAULT current_timestamp(),
  `est_signale` tinyint(4) DEFAULT 0,
  `id_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_projet_user` (`id_user`),
  CONSTRAINT `fk_projet_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `interet_projet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_projet` int(11) NOT NULL,
  `id_freelance` int(11) NOT NULL,
  `date_interet` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_projet` (`id_projet`),
  KEY `id_freelance` (`id_freelance`),
  CONSTRAINT `interet_projet_ibfk_1` FOREIGN KEY (`id_projet`) REFERENCES `projet_sub` (`id`),
  CONSTRAINT `interet_projet_ibfk_2` FOREIGN KEY (`id_freelance`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
