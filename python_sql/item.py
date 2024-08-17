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
        id INT AUTO_INCREMENT PRIMARY KEY,
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
('Towels', 100, 'Absorbent gym towels for personal use', 'Towel Hub PH', '0920-456-7890'),
('Protein Bars', 150, 'High-protein bars for post-workout recovery', 'FitSnack Co.', '0921-567-8901'),
('Yoga Mats', 75, 'Non-slip yoga mats for personal use', 'YogaGear PH', '0922-678-9012'),
('Dumbbells (5kg)', 40, 'Set of two 5kg dumbbells', 'IronFit Supplies', '0923-789-0123'),
('Resistance Bands', 60, 'Set of resistance bands for strength training', 'FlexBand Co.', '0924-890-1234'),
('Energy Drinks', 120, 'Caffeinated energy drinks for a quick boost', 'Energize Inc.', '0925-901-2345'),
('Jump Ropes', 80, 'Adjustable jump ropes for cardio workouts', 'Cardio Essentials', '0926-012-3456'),
('Gym Shoes', 50, 'High-performance gym shoes for training', 'Athlete Footwear', '0927-123-4567'),
('Pre-Workout Supplements', 70, 'Powdered supplements for enhanced performance', 'PowerUp Nutrition', '0928-234-5678'),
('Foam Rollers', 30, 'High-density foam rollers for muscle recovery', 'Recovery Gear Co.', '0929-345-6789'),
('Water Bottles', 200, 'Reusable water bottles for hydration', 'EcoHydrate', '0930-456-7890'),
('Kettlebells (10kg)', 25, '10kg kettlebell for strength training', 'IronFit Supplies', '0931-567-8901'),
('Exercise Bikes', 15, 'Stationary exercise bikes for cardio workouts', 'Fitness Machines PH', '0932-678-9012'),
('Whey Protein', 90, 'High-quality whey protein for muscle gain', 'NutriBest', '0933-789-0123'),
('Medicine Balls (8kg)', 20, '8kg medicine ball for strength and conditioning', 'Core Fitness Co.', '0934-890-1234'),
('Sweatbands', 150, 'Absorbent sweatbands for wrist and head', 'Gym Accessories Hub', '0935-901-2345'),
('Bench Presses', 10, 'Adjustable bench presses for weight training', 'HeavyDuty Equipment', '0936-012-3456');



''')

conn.commit()

# Close the connection
conn.close()

print("Database and table created, and records inserted.")
