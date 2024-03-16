CREATE DATABASE IF NOT EXISTS `edusogno-esercizio`;
CREATE TABLE IF NOT EXISTS user (
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    email varchar(45) NOT NULL UNIQUE,
    password varchar(500) NOT NULL,
    is_admin BOOL DEFAULT false NOT NULL,
    temp_reset_password_code varchar(45),
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS event (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description varchar(255),
    event_date datetime NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS user_event (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    event_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);
INSERT INTO `event` (`title`, `description`, `event_date`) VALUES 
('Test Edusogno 1', 'Description test 1', '2022-10-13 14:00'), 
('Test Edusogno 2', 'Description test 2', '2022-10-15 19:00'), 
('Test Edusogno 3', 'Description test 3', '2022-10-17 21:00'), 
('Test Edusogno 4', 'Description test 4', '2022-10-19 08:00');
INSERT INTO `user` (`first_name`, `last_name`, `email`, `password`, `is_admin`) VALUES 
('Marco', 'Rossi', 'ulysses200915@varen8.com', '25f10b033ae4155ebf7b464e23a14531db9757e1e3a7c861c0c2657e31bf2f41a84a0412e4c99554bd0041a027e5791c9177bbd546e8709e5b9b48278d1619b2', 1), 
('Filippo', 'D’Amelio', 'qmonkey14@falixiao.com', '914ba7d820c5e9b0a75cf926a94e24cf97207a5ac752177185f53f0b032a2eeafc45f2695dd3a64c6959da8b115b797f68c0e0c5b73bad63d84f0ef8401652a7', 1), 
('Gian Luca', 'Carta', 'mavbafpcmq@hitbase.net', '4d160232449a44ae98d1a1aa4ec8cb69abe8446a6cbf9b3c15f89b3dcb478972d5b85a4a9eadd8175865ac23f86bc6815aa4959443ceb66e36028ae9d722a5e2', 1), 
('Stella', 'De Grandis', 'dgipolga@edume.me', 'a81619fa1fb0e6460abffc0b3f6d7f96cb41d9879f5d215f62c93d00839fba1461e5d341f5c2902bb77ed116d315d89d6496541895501c455516c045d7854e9f', 1);