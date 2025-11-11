## Part 2 Commands
```sql
-- Step 1.
ALTER TABLE students
ADD COLUMN street VARCHAR(100) NOT NULL,
ADD COLUMN city VARCHAR(100) NOT NULL,
ADD COLUMN state VARCHAR(100) NOT NULL,
ADD COLUMN zip INT(5) NOT NULL;

-- Step 2.
ALTER TABLE courses 
ADD COLUMN section INT(3) NOT NULL, 
ADD COLUMN year YEAR NOT NULL;

-- Step 3.
CREATE TABLE grades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    crn INT,
    RIN INT,
    grade INT(3) NOT NULL,
	FOREIGN KEY (crn) REFERENCES courses(crn),
    FOREIGN KEY (RIN) REFERENCES students(RIN)
);

-- Step 4.
INSERT INTO courses (crn, prefix, number, title, section, year) VALUES
(72024, 'CSCI', 1200, 'Data Structures', 1, 2025),
(72433, 'CSCI', 4430, 'Programming Languages', 1, 2025),
(72742, 'ITWS', 1100, 'Intro to ITWS', 1, 2025),
(73048, 'ITWS', 2110, 'Web Systems Developement', 1, 2025);


-- Step 5.
INSERT INTO students (RIN, RCSID, first_name, last_name, alias, phone, street, city, state, zip) VALUES
(111222333, 'jacobs1', 'Sean', 'Jacob', 'BigSean', 987654, ' 4 Road Rd.', 'Troy', 'New York', 12180),
(123456789, 'fostee1', 'Emily', 'Foster', 'Emmy', 2221444, ' 25 Lake St.', 'Troy', 'New York', 12180),
(662662662, 'smithj1', 'John', 'Smith', 'jSmithy', 1234567, ' 12 Main St.', 'Troy', 'New York', 12180),
(943058743, 'willia2', 'Abigail', 'Williams', 'AbbyWill', 9987, ' 18 Hoosick.', 'Troy', 'New York', 12180);

-- Step 6.
INSERT INTO grades (id, crn, RIN, grade) VALUES
(1, 72024, 111222333, 90),
(2, 72433, 111222333, 80),
(3, 72742, 111222333, 87),
(4, 73048, 111222333, 92),
(5, 72024, 123456789, 99),
(6, 72024, 662662662, 82),
(7, 72433, 123456789, 77),
(8, 72433, 943058743, 98),
(9, 73048, 123456789, 100),
(10, 73048, 662662662, 85);

-- Step 7.
SELECT * FROM students ORDER BY RIN;
SELECT * FROM students ORDER BY last_name;
SELECT * FROM students ORDER BY RCSID;
SELECT * FROM students ORDER BY first_name;

-- Step 8.
SELECT DISTINCT s.RIN, s.first_name, s.last_name, s.street, s.city, s.state, s.zip
FROM students s
JOIN grades g ON s.RIN = g.RIN
WHERE g.grade > 90;

-- Step 9.
SELECT c.title, AVG(g.grade) AS average_grade
FROM courses c
JOIN grades g ON c.crn = g.crn
GROUP BY c.crn, c.title;

-- Step 10.
SELECT c.title, COUNT(DISTINCT g.RIN) AS student_count
FROM courses c
JOIN grades g ON c.crn = g.crn
GROUP BY c.crn, c.title;
```