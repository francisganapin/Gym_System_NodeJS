import mysql.connector
from datetime import datetime, timedelta

# Connect to MySQL server
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root"
)

# Create a cursor object
cursor = conn.cursor()

# Create a database
cursor.execute("CREATE DATABASE IF NOT EXISTS memberdb")

# Select the database
cursor.execute("USE memberdb")

# Create the table
cursor.execute('''
CREATE TABLE login_record (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_card VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  login DATE,
  FOREIGN KEY (id_card) REFERENCES gym_members(id_card)
);
''')

conn.commit()
conn.close()