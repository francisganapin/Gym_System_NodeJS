import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import mysql from 'mysql2/promise';


const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (req, res) => {


  // Show all available data in your database
  if (req.url === '/select/trainor') {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'memberdb',
      });

      const [rows] = await connection.query('SELECT * FROM gym_trainor');
      await connection.end();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: rows }));
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Error connecting to the database' }));
    }
    return;
  }



  if (req.url === '/post/item') {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'memberdb',
      });

      const [rows] = await connection.query('SELECT * FROM gym_item');
      await connection.end();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: rows }));
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Error connecting to the database' }));
    }
    return;
  }

 
  // Show all available data in your gym member
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
    }
    return;
  }

  // Insert new member into the database
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

        const sql = 'INSERT INTO gym_members (ID_CARD, Expiry, Membership, First_Name, Last_Name, Phone_Number, Address) VALUES (?, ?, ?, ?, ?, ?, ?)';
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
    return;
  }


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
    return;
  }

  // show login 
  if (req.url === "/login/gym_member" && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { id } = JSON.parse(body);

      try {
        const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'memberdb',
        });

        const sql = 'SELECT Expiry FROM gym_members WHERE TRIM(ID_CARD) = ?'
        const [rows] = await connection.query(sql, [id]);

        await connection.end();

        console.log('Fetched rows:', rows);
        if (rows.length > 0) {
          const expiry = rows[0].Expiry;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Member fetched successfully.', expiry: expiry }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Member not found.' }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'An error occurred while fetching the member.' }));
      }
    });
    return;
  }


    // show login 
    if (req.url === "/update/item" && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
  
      req.on('end', async () => {
        const { id } = JSON.parse(body);
  
        try {
          const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'memberdb',
          });
  
          const sql = 'SELECT Expiry FROM gym_members WHERE TRIM(ID_CARD) = ?'
          const [rows] = await connection.query(sql, [id]);
  
          await connection.end();
  
          console.log('Fetched rows:', rows);
          if (rows.length > 0) {
            const expiry = rows[0].Expiry;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Member fetched successfully.', expiry: expiry }));
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Member not found.' }));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'An error occurred while fetching the member.' }));
        }
      });
      return;
    }
  



  let filePath;
  if (req.url === '/' || req.url === '/homepage' || req.url === '/homepage.html') {
    filePath = join(process.cwd(), 'public/homepage.html');
  }  else if (req.url === '/add_member') {
    filePath = join(process.cwd(), 'public/add_member.html');
  } else if (req.url === '/debug') {
    filePath = join(process.cwd(), 'public/debug.html');
  } else if (req.url === '/trainor') {
    filePath = join(process.cwd(), 'public/trainor.html');
  } else if (req.url === '/inventory') {
    filePath = join(process.cwd(), 'public/inventory.html');
  }
   else if (req.url === '/navbar') {
      filePath = join(process.cwd(), 'navbar.html');
  } else if(req.url ==='/login'){
      filePath = join(process.cwd(),'public/login.html')
  }
    else {
    // For other requests, try to serve static files
    filePath = join(process.cwd(), req.url);
  }

  console.log(`Serving file: ${filePath}`);
  try {
    const content = await readFile(filePath);
    const ext = extname(filePath);
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(content);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File not found');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on \x1b[34mhttp://127.0.0.1:3000/homepage\x1b[0m');
});