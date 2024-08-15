import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root"
)

cursor = conn.cursor()

cursor.execute('USE memberdb')

cursor.execute('''
               
CREATE TABLE gym_classes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(255) ,
    class_type VARCHAR(255),
    class_day VARCHAR(50),
    class_hour VARCHAR(50),
    trainor_name VARCHAR(255)
               );
''')


conn.commit()
conn.close()