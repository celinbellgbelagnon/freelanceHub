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
