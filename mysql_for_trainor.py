import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root"
)

cursor = conn.cursor()

cursor.execute('USE memberdb')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS gym_trainor(
        ID INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        specialty VARCHAR(255),
        phone_number VARCHAR(255)
    );
''')



cursor.execute('''
INSERT INTO gym_trainor (first_name, last_name, specialty, phone_number) VALUES
('Alex', 'Johnson', 'strength training', '09996431876'),
('Mia', 'Smith', 'yoga', '09996431877'),
('Ethan', 'Brown', 'HIIT', '09996431878'),
('Sophia', 'Davis', 'pilates', '09996431879'),
('Liam', 'Wilson', 'crossfit', '09996431880'),
('Olivia', 'Martinez', 'aerobics', '09996431881'),
('Noah', 'Garcia', 'boxing', '09996431882'),
('Ava', 'Rodriguez', 'dance fitness', '09996431883'),
('James', 'Lee', 'bodybuilding', '09996431884'),
('Isabella', 'Walker', 'nutrition coaching', '09996431885');

''')




conn.commit()
conn.close()