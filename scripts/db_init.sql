CREATE SCHEMA IF NOT EXISTS surveyhub DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

USE surveyhub;

CREATE USER 'surveyhub_api'@'%' IDENTIFIED BY '[API_PASSWORD]';
GRANT SELECT, INSERT, UPDATE, DELETE ON surveyhub.* TO 'surveyhub_api'@'%';

CREATE USER 'surveyhub_desktop'@'localhost' IDENTIFIED BY '[DESKTOP_PASSWORD]';
GRANT SELECT, INSERT, UPDATE ON surveyhub.* TO 'surveyhub_desktop'@'localhost';

FLUSH PRIVILEGES;

CREATE TABLE `surveystatus` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `status` (`status`),
  UNIQUE KEY `AK_SurveyStatus_Status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `survey` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `minResponses` int unsigned DEFAULT NULL,
  `maxResponses` int unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `surveyStatusId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `AK_Survey_Name` (`name`),
  KEY `surveyStatusId` (`surveyStatusId`),
  CONSTRAINT `survey_ibfk_1` FOREIGN KEY (`surveyStatusId`) REFERENCES `surveystatus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `questiontype` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`),
  UNIQUE KEY `AK_QuestionType_Type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `question` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order` int unsigned NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `isMandatory` varchar(3) COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `surveyId` int unsigned NOT NULL,
  `questionTypeId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AK_Question_SurveyId_Order` (`surveyId`,`order`),
  UNIQUE KEY `AK_Question_SurveyId_Text` (`surveyId`,`text`),
  KEY `questionTypeId` (`questionTypeId`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`surveyId`) REFERENCES `survey` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `question_ibfk_2` FOREIGN KEY (`questionTypeId`) REFERENCES `questiontype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `questionoption` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order` int unsigned NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `questionId` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AK_QuestionOption_QuestionId_Order` (`questionId`,`order`),
  UNIQUE KEY `AK_QuestionOption_QuestionId_Value` (`questionId`,`value`),
  CONSTRAINT `questionoption_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `question` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `systemuser` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `loginName` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `firstName` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `lastName` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `emailAddress` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `phoneNumber` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `passwordHash` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT 'Active',
  `tokenVersion` int unsigned NOT NULL DEFAULT '1',
  `profilePicture` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `lastLoginAt` datetime DEFAULT NULL,
  `lastPasswordChangeAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `loginName` (`loginName`),
  UNIQUE KEY `emailAddress` (`emailAddress`),
  UNIQUE KEY `phoneNumber` (`phoneNumber`),
  UNIQUE KEY `AK_SystemUser_LoginName` (`loginName`),
  UNIQUE KEY `AK_SystemUser_EmailAddress` (`emailAddress`),
  UNIQUE KEY `AK_SystemUser_PhoneNumber` (`phoneNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `role` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `AK_Role_Name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `systemuserrole` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `roleId` int unsigned DEFAULT NULL,
  `systemUserId` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SystemUserRole_systemUserId_roleId_unique` (`roleId`,`systemUserId`),
  UNIQUE KEY `AK_SystemUserRole_SystemUserId_RoleId` (`systemUserId`,`roleId`),
  CONSTRAINT `systemuserrole_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `systemuserrole_ibfk_2` FOREIGN KEY (`systemUserId`) REFERENCES `systemuser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `response` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `beginDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `surveyId` int unsigned NOT NULL,
  `systemUserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AK_Response_SurveyId_SystemUserId` (`surveyId`,`systemUserId`),
  KEY `systemUserId` (`systemUserId`),
  CONSTRAINT `response_ibfk_1` FOREIGN KEY (`surveyId`) REFERENCES `survey` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `response_ibfk_2` FOREIGN KEY (`systemUserId`) REFERENCES `systemuser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `answer` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `questionId` int unsigned NOT NULL,
  `responseId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AK_Answer_ResponseId_QuestionId` (`responseId`,`questionId`),
  KEY `questionId` (`questionId`),
  CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`responseId`) REFERENCES `response` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

CREATE TABLE `answeroption` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `answerId` int unsigned DEFAULT NULL,
  `questionOptionId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AK_AnswerOption_AnswerId_QuestionOptionId` (`answerId`,`questionOptionId`),
  KEY `questionOptionId` (`questionOptionId`),
  CONSTRAINT `answeroption_ibfk_1` FOREIGN KEY (`answerId`) REFERENCES `answer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `answeroption_ibfk_2` FOREIGN KEY (`questionOptionId`) REFERENCES `questionoption` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
