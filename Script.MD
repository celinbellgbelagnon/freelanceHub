SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `freelance`;
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

INSERT INTO `freelance` (`id_freelance`, `username`, `email`, `password_freelance`, `telephone`, `specialite`, `date_inscription`) VALUES
(1, 'koffi', 'koffi@gmail.com', '$2b$05$nx3hRz.Vn25UA0Xv/rZ8WeLB1jbqb.mwjqiBxfYLUFBTX5/bRY3aS', '6756345', 'dev web', '2025-02-26 20:21:00'),
(2, 'kodjo', 'kodjo@dd.fr', '$2b$05$4I90.8wCncB2cJdq8WO/YuN36ADh3uCOM3P4rdzWWpg1EoMXg3WWC', '364658', 'data', '2025-02-26 20:23:00');

DROP TABLE IF EXISTS `projet_sub`;
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

INSERT INTO `projet_sub` (`id`, `nom_client`, `email_client`, `telephone_client`, `titre_projet`, `description_projet`, `budget`, `date_soumission`) VALUES
(1, 'Antoine', 'celinbell@gmail.com', '89674523', 'e comm', 'Développement d’un site e-commerce', '2300.00', '2025-02-13 17:18:00'),
(2, 'koffi', 'koffi@gmail.com', '437698959', 'huck', 'Refonte d’un site vitrine', '346.00', '2025-02-13 17:25:00'),
(3, 'gerard', 'gerard@gmail.com', '78365242', 'app mobile', 'Développement d’une application mobile', '498.00', '2025-02-13 17:34:00'),
(4, 'celiny', 'celi@f.fr', '786766445', 'uiyyy', 'Rédaction de contenu SEO', '890.00', '2025-02-13 17:36:00');

COMMIT;
