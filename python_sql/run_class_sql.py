import mysql.connector

# Establishing the connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root"
)

# Creating a cursor object to interact with the database
cursor = conn.cursor()

# Selecting the database
cursor.execute('USE memberdb')

# Creating the gym_classes table if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS gym_classes(
        id INT AUTO_INCREMENT PRIMARY KEY,
        class_name VARCHAR(255),
        class_type VARCHAR(255),
        class_day VARCHAR(50),
        class_hour VARCHAR(50),
        trainor_name VARCHAR(255)
    );
''')

# Inserting data into the gym_classes table
gym_class = [
    ('Friday Cardio Day', 'Cardio', 'Thursday', '6:30-7:30 PM', 'Abad Miguel')
]

cursor.executemany('''
    INSERT INTO gym_classes (class_name, class_type, class_day, class_hour, trainor_name)
    VALUES (%s, %s, %s, %s, %s)
''', gym_class)

# Committing the transaction
conn.commit()

# Closing the connection
conn.close()
