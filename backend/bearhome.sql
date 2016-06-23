DROP TABLE `account`;
CREATE TABLE IF NOT EXISTS `account` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`password` varchar(40) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

INSERT INTO `account`(name,password) VALUES('admin', SHA1('123456'));

DROP TABLE `article`;
CREATE TABLE IF NOT EXISTS `article` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`content` text,
	`imgPath` varchar(255) DEFAULT NULL,
	`publishTime` bigint(20) DEFAULT NULL,
	`classId` int(11) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `articleClass`;
CREATE TABLE IF NOT EXISTS `articleClass` (
	`classId` int(11) NOT NULL AUTO_INCREMENT,
	`className` varchar(255) NOT NULL,
	PRIMARY KEY (`classId`),
	UNIQUE (`className`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `gallery`;
CREATE TABLE IF NOT EXISTS `gallery` (
	`galleryId` int(11) NOT NULL AUTO_INCREMENT,
	`galleryName` varchar(255) NOT NULL,
	`galleryPath` varchar(255) NOT NULL,
	`coverPath` varchar(255) DEFAULT NULL,
	`coverFile` varchar(255) DEFAULT NULL,
	PRIMARY KEY (`galleryId`),
	UNIQUE (`galleryName`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `images`;
CREATE TABLE IF NOT EXISTS `images` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`galleryId` int(11) NOT NULL,
	`file` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;