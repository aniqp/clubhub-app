create DATABASE clubhouse;

DROP TABLE `users`;


CREATE TABLE `users` (
	`uid` VARCHAR(255),
	`first_name` VARCHAR(255),
	`last_name` VARCHAR(255),
	`email` VARCHAR(255),
	PRIMARY KEY (`uid`)
);


CREATE TABLE `clubs` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255),
	`description` TEXT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `memberships` (
	`uid` VARCHAR(255) NOT NULL,
	`club_id` INT NOT NULL,
	`role` ENUM("pending", "user", "admin", "owner"),
	`title` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`uid`,`club_id`),
	FOREIGN KEY (`uid`) REFERENCES users(uid),
	FOREIGN KEY (`club_id`) REFERENCES clubs(id)
);


-- DESCRIBE `users`;
-- DESCRIBE `clubs`;
-- DESCRIBE `memberships`;

