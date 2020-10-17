drop DATABASE if EXISTS employees;
CREATE DATABASE employees;
use employees;
create table employee_info
(
	id int
    auto_increment not null,
first_name varchar
	(15) null,
last_name varchar
	(15) null,
role_id int,
manager_name varchar
	(15),
    primary key
    (id)
);

create table roles
(
	id int
    auto_increment not null,
title varchar
	(15) null,
salary decimal, 
department_id int,
primary key
	(id)
);

