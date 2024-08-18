import mysql from 'mysql2/promise';
 
 
 // Show gym member available data in your gym member
 export async function getMembers(req,res){
 if (req.url === '/post/customers') {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'memberdb',
      });

      const [rows] = await connection.query('SELECT * FROM gym_members');
      await connection.end();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: rows }));
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Error connecting to the database' }));
      return true; // Indicate that the request was handled
    }
  }
  return false; // Indicate that the request was not handled
}

export async function registerMember (req,res){
if (req.url === '/register/gym_member' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { id, expiry, membership, firstName, lastName, phoneNumber, address } = JSON.parse(body);

      try {
        const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'memberdb',
        });

        const sql = 'INSERT INTO gym_members (id_card, expiry, membership, first_name, last_name, phone_number, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [id, expiry, membership, firstName, lastName, phoneNumber, address];

        await connection.query(sql, values);
        await connection.end();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Member registered successfully.' }));
      } catch (error) {
        console.error('Error inserting data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'An error occurred while registering the member.' }));
      }
    });
    return true; // Indicate that the request was handled
}

return false; // Indicate that the request was not handled
}


export async function updateMember(req,res){
  // update member
  if (req.url === "/update/gym_member" && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { id, expiry, membership } = JSON.parse(body);

      try {
        const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'memberdb',
        });

        const sql = 'UPDATE gym_members SET Expiry = ?, Membership = ? WHERE ID_CARD = ?';
        const values = [expiry, membership, id];

        await connection.query(sql, values);
        await connection.end();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Member updated successfully.' }));
      } catch (error) {
        console.error('Error updating data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'An error occurred while updating the member.' }));
      }
    });
    return true; // Indicate that the request was handled
}

return false; // Indicate that the request was not handled
}




