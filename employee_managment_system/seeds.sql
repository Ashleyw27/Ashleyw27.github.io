USE employeeDB;

INSERT INTO department (name)
VALUES ('Sales'), ('Product'), ('Engineering'), ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Divisional Sales Manager', 100000, 1),
    ('Sales Assistant', 40000, 1),
    ('Product Manager', 90000, 2),
    ('Associate Product Manager', 70000, 2),
    ('Design Engineer', 80000, 3),
    ('Associate Engineer', 60000, 3),
    ('Marketing Manager', 85000, 4),
    ('Associate Marketing Manager', 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Dave', 'Mayer', 1, NULL),
    ('Lori', 'Lockwood', 2, NULL),
    ('Kaitlin', 'Reese', 3, NULL),
    ('Colin', 'Wieber', 4, NULL),
    ('Nick', 'Stanek', 5, NULL),
    ('Jake', 'Nelson', 6, NULL),
    ('Carrie', 'Eidem', 7, NULL),
    ('Allison', 'McHale', 8, NULL);
