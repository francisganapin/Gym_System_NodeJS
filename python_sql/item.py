import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root"
)

cursor = conn.cursor()

cursor.execute('USE memberdb')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS gym_item(
        ID INT AUTO_INCREMENT PRIMARY KEY,
        item_name VARCHAR(255),
        stock INT,
        description VARCHAR(255),
        supplier VARCHAR(255),
        phone_number VARCHAR(255)
    );
''')



cursor.execute('''
INSERT INTO gym_item (item_name, stock, description, supplier, phone_number) VALUES
('Bottled Water', 200, 'Purified bottled water for hydration', 'Aqua Best', '0917-123-4567'),
('Liquid Hand Soap', 50, 'Antibacterial liquid hand soap for hygiene', 'Clean Hands Co.', '0918-234-5678'),
('Disinfectant Spray', 30, 'Multi-surface disinfectant spray for equipment', 'Sanitize Solutions', '0919-345-6789'),
('Towels', 100, 'Absorbent gym towels for personal use', 'Towel Hub PH', '0920-456-7890');


''')

conn.commit()

# Close the connection
conn.close()

print("Database and table created, and records inserted.")
