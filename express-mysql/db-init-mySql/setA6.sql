CREATE USER IF NOT EXISTS 'ang6AppAdmin'@'localhost' IDENTIFIED BY 'ang6AppAdmin';
GRANT ALL PRIVILEGES ON a6users.* TO 'ang6AppAdmin'@'localhost';

FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS a6users;
USE a6users;

CREATE TABLE
IF NOT EXISTS users
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(40) NOT NULL, 
    email VARCHAR(100) NOT NULL,
    password BINARY(60) NOT NULL,
    roleId INT(10) DEFAULT 2,
    created BIGINT(14) NOT NULL DEFAULT 0,
    changed BIGINT(14) NOT NULL DEFAULT 0,
    active TINYINT(1) NOT NULL DEFAULT 1
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_IDX USING BTREE ON users(email);

CREATE TRIGGER insert_user BEFORE INSERT ON users FOR EACH ROW SET new.created=(UNIX_TIMESTAMP(NOW())*1000), new.changed=(UNIX_TIMESTAMP(NOW())*1000);
CREATE TRIGGER update_user BEFORE UPDATE ON users FOR EACH ROW SET new.changed=(UNIX_TIMESTAMP(NOW())*1000);

-- user: admin, password: ADMIN
INSERT INTO users
VALUES
    (NULL, 'admin', 'admin', '$2b$10$8j.2D.OMc7DmzLKXSUn0HeH35McEiVzFyYfzPCdIb5MpgmskXQJvG', 1, NULL, NULL, 1),
    (NULL, 'n1', 'e1', 'e1', 2, NULL, NULL, 1),
    (NULL, 'n2', 'e2', 'e2', 2, NULL, NULL, 1),
    (NULL, 'n4', 'n4', 'n4', 2, NULL, NULL, 1),
    (NULL, 'n40', 'n40', 'n40', 2, NULL, NULL, 1),
    (NULL, 'n41', 'n41', 'n41', 2, NULL, NULL, 1),
    (NULL, 'n42', 'n42', 'n42', 2, NULL, NULL, 1),
    (NULL, 'n43', 'n43', 'n43', 2, NULL, NULL, 1),
    (NULL, 'n44', 'n44', 'n44', 2, NULL, NULL, 1),
    (NULL, 'n45', 'n45', 'n45', 2, NULL, NULL, 1),
    (NULL, 'n46', 'n46', 'n46', 2, NULL, NULL, 1),
    (NULL, 'n47', 'n47', 'n47', 2, NULL, NULL, 1),
    (NULL, 'n48', 'n48', 'n48', 2, NULL, NULL, 1),
    (NULL, 'n49', 'n49', 'n49', 2, NULL, NULL, 1),
    (NULL, 'n50', 'n50', 'n50', 2, NULL, NULL, 1),
    (NULL, 'n51', 'n51', 'n51', 2, NULL, NULL, 1),
    (NULL, 'n52', 'n52', 'n52', 2, NULL, NULL, 1),
    (NULL, 'n53', 'n53', 'n53', 2, NULL, NULL, 1),
    (NULL, 'n54', 'n54', 'n54', 2, NULL, NULL, 1),
    (NULL, 'n55', 'n55', 'n55', 2, NULL, NULL, 1),
    (NULL, 'n56', 'n56', 'n56', 2, NULL, NULL, 1),
    (NULL, 'n57', 'n57', 'n57', 2, NULL, NULL, 1),
    (NULL, 'n58', 'n58', 'n58', 2, NULL, NULL, 1),
    (NULL, 'n59', 'n59', 'n59', 2, NULL, NULL, 1),
    (NULL, 'n3' ,  'e3', 'e3',  2, NULL, NULL, 1);

CREATE TABLE
IF NOT EXISTS roles
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(40) NOT NULL
);

-- CREATE UNIQUE INDEX IF NOT EXISTS users_roles_IDX USING BTREE ON roles(name);

INSERT INTO roles
VALUES
    (1, 'Admin'),
    (2, 'User'),
    (NULL, 'Sales'),
    (NULL, 'Management'),
    (NULL, 'Accounts'),
    (NULL, 'Finance');