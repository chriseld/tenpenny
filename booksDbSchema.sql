CREATE TABLE `books`
  `idbooks` int NOT NULL AUTO_INCREMENT,
  `idauthor` int NOT NULL,
  `title` varchar(256) NOT NULL,
  `blurb` varchar(2048) DEFAULT NULL,
  `cover` longblob,
  `datecreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastupdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idbooks`),
  UNIQUE KEY `idbooks_UNIQUE` (`idbooks`),
  UNIQUE KEY `title_UNIQUE` (`title`)