DROP DATABASE IF EXISTS bmsDB;
CREATE DATABASE bmsDB;

USE bmsDB;

CREATE TABLE checkInTable
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    purpose varchar(255) NOT NULL,
    datatime timestamp ,
    uId varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE membersTable
(
	id int NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
	username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    phoneNum int(255) NOT NULL,
    bday date NOT NULL,
    address varchar(255) NOT NULL,
    email  varchar(255) NOT NULL,
    emergName varchar(255) NOT NULL,
    emergNum int(255) NOT NULL,
    uId varchar(100) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE classesTable
(
	id int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
	className varchar(255) NOT NULL,
    classType varchar(255) NOT NULL,
	assignedTrainer varchar(255) NOT NULL,
    classSize int(50) NOT NULL
);