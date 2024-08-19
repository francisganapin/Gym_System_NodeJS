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
CREATE TABLE IF NOT EXISTS gym_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_card VARCHAR(255) UNIQUE,
  expiry DATE,
  membership VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  phone_number VARCHAR(255),
  address TEXT
);
''')

# Data to be inserted
members_data = [
    ('ID001', '2025-01-01', 'Gold', 'Juan', 'Dela Cruz', '0917123456789', '123 Mabini St'),
    ('ID002', '2025-02-01', 'Silver', 'Maria', 'Santos', '0918234567890', '456 Rizal St'),
    ('ID003', '2025-03-01', 'Platinum', 'Jose', 'Reyes', '0919345678901', '789 Bonifacio St'),
    ('ID004', '2025-04-01', 'Gold', 'Ana', 'Gonzales', '0910456789012', '321 Aguinaldo St'),
    ('ID005', '2025-05-01', 'Silver', 'Pedro', 'Martinez', '0911567890123', '654 Luna St'),
    ('ID006', '2025-06-01', 'Platinum', 'Luz', 'Garcia', '0912678901234', '987 Quezon St'),
    ('ID007', '2025-07-01', 'Gold', 'Nina', 'Torres', '0913789012345', '123 Tandang Sora St'),
    ('ID008', '2025-08-01', 'Silver', 'Ramon', 'Villanueva', '0914890123456', '456 Del Pilar St'),
    ('ID009', '2025-09-01', 'Platinum', 'Isabel', 'Cruz', '0915901234567', '789 Mabini St'),
    ('ID010', '2025-10-01', 'Gold', 'Carlos', 'Aquino', '0916012345678', '123 Rizal St'),
    ('ID011', '2025-11-01', 'Silver', 'Rosario', 'Bautista', '0917123456789', '456 Bonifacio St'),
    ('ID012', '2025-12-01', 'Platinum', 'Manuel', 'Pascual', '0918234567890', '789 Aguinaldo St'),
    ('ID013', '2026-01-01', 'Gold', 'Celia', 'Lopez', '0919345678901', '321 Luna St'),
    ('ID014', '2026-02-01', 'Silver', 'Vicente', 'Castillo', '0910456789012', '654 Quezon St'),
    ('ID015', '2026-03-01', 'Platinum', 'Teresa', 'Mendoza', '0911567890123', '987 Tandang Sora St'),
    ('ID016', '2026-04-01', 'Gold', 'Ricardo', 'Perez', '0912678901234', '123 Del Pilar St'),
    ('ID017', '2026-05-01', 'Silver', 'Angela', 'Fernandez', '0913789012345', '456 Mabini St'),
    ('ID018', '2026-06-01', 'Platinum', 'Enrique', 'Diaz', '0914890123456', '789 Rizal St'),
    ('ID019', '2026-07-01', 'Gold', 'Carmen', 'Morales', '0915901234567', '123 Bonifacio St'),
    ('ID020', '2026-08-01', 'Silver', 'Alfonso', 'Vega', '0916012345678', '456 Aguinaldo St')
]

# Execute the batch insert with correct placeholders
cursor.executemany('''
INSERT INTO gym_members (id_card, expiry, membership, first_name, last_name, phone_number, address)
VALUES (%s, %s, %s, %s, %s, %s, %s)
''', members_data)

# Commit the transaction
conn.commit()

# Close the connection
conn.close()

print("Database and table created, and records inserted.")
