INSERT INTO department (name)
VALUES 
("General Management"),
("Marketing"),
("Operations"),
("Finance"),
("Sales"),
("Human Resource"),
("Purchase");

INSERT INTO role (title, salary, department_id)
VALUES
("Salesman", 25.3, 5), 
("Product Distributor", 30.75, 2),
("Accountant", 25.4, 4),
("Quality Assurance", 30.75, 7),
("Training", 25.6, 6),
("Booking", 30.65, 3),
("Manager", 20.1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Michael", "Kumar", 5, 1),
("Cecilia", "Sobol", 1, 2),
("Emilia", "Paulsen", 3, 3), 
("Kaitlin", "Van", 4, 4), 
("Maria", "Cary", 6, 5), 
("George", "Sanchez", 2, 6),
("Kyle", "Tran", 7, 7);



