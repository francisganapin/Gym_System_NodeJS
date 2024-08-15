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
        trainor_id VARCHAR(10) PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        specialty VARCHAR(255),
        phone_number VARCHAR(255)
    );
''')








conn.commit()
conn.close()