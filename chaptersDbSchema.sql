CREATE TABLE `chapters`
  `idchapters` int NOT NULL AUTO_INCREMENT,
  `idbooks` int NOT NULL,
  `chapternumber` int NOT NULL,
  `chaptertitle` varchar(255) NOT NULL,
  `chaptertext` longblob,
  `datecreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastupdated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idchapters`),
  UNIQUE KEY `idchapters_UNIQUE` (`idchapters`)
