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
 

   // Show gym member available data in your gym member
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


   //register member
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
     return; // Indicate that the request was handled
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
     return true; // Indicate that the request was handled
 }

    // show login  member data
    if (req.url === "login/gym_member" && req.method === 'POST') {
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
      return
    }
  

/// show  item on gym
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


  // Insert new item into the database
  if (req.url === '/insert/item' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const {item_name,stock,description,supplier,phone_number} = JSON.parse(body);

      try {
        const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'memberdb',
        });

        const sql = 'INSERT INTO gym_item (item_name, stock, description, supplier, phone_number) VALUES  (?, ?, ?, ?, ?)';
        const values = [item_name,stock,description,supplier,phone_number];

        await connection.query(sql, values);
        await connection.end();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'item was sucessfully inserted' }));
      } catch (error) {
        console.error('Error inserting data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'An error occurred while registering the member.' }));
      }
    });
    return;
  }


  // update item stock
  if (req.url === "/update/item" && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { item_name, stock } = JSON.parse(body);

      try {
        const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'memberdb',
        });

        const sql = 'UPDATE gym_item SET stock = ? WHERE item_name = ?';
        const values = [stock, item_name];
  
        await connection.query(sql, values);
        await connection.end();
  
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'item stock updated successfully.' }));
      } catch (error) {
        console.error('Error updating data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'An error occurred while updating the item.' }));
      }
    });
    return;
  }
  
  // delete item database
  if (req.url === "/delete/item" && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
  
    req.on('end', async () => {
      const { id } = JSON.parse(body);  // Use `id` instead of `item_name`
  
      try {
        const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'memberdb',
        });
  
        const sql = 'DELETE FROM gym_item WHERE id = ?';
        const values = [id];
    
        await connection.query(sql, values);
        await connection.end();
    
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Item was deleted successfully.' }));
      } catch (error) {
        console.error('Error deleting item:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'An error occurred while deleting the item.' }));
      }
    });
    return;
  }
  
  

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

    // Insert new trainor into the database
    if (req.url === '/insert/trainor' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
  
      req.on('end', async () => {
        const {trainor_id,first_name, last_name, specialty, phone_number} = JSON.parse(body);
  
        try {
          const connection = await mysql.createConnection({
            host: 'localhost',

            
            user: 'root',
            password: 'root',
            database: 'memberdb',
          });
  
          const sql = 'INSERT INTO gym_trainor (trainor_id,first_name, last_name, specialty, phone_number) VALUES  (?, ?, ?, ?, ?)';
          const values = [trainor_id,first_name, last_name, specialty, phone_number];
  
          await connection.query(sql, values);
          await connection.end();
  
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'item was sucessfully inserted' }));
        } catch (error) {
          console.error('Error inserting data:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'An error occurred while registering the trainor.' }));
        }
      });
      return;
    }

    // delete trainor database
    if (req.url === "/delete/trainor" && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
  
      req.on('end', async () => {
        const { trainor_id} = JSON.parse(body);
  
        try {
          const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'memberdb',
          });
  
          const sql = 'DELETE FROM  gym_trainor  WHERE trainor_id = ?';
          const values = [trainor_id];
    
          await connection.query(sql, values);
          await connection.end();
    
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'trainor was delete  successfully.' }));
        } catch (error) {
          console.error('Error updating data:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'An error occurred while deleting the trainor.' }));
        }
      });
      return;
    }

      // delete trainor database
    if (req.url === "/option/trainor/class" && req.method === 'GET') {
   
          try {
            const connection = await mysql.createConnection({
              host: 'localhost',
              user: 'root',
              password: 'root',
              database: 'memberdb',
            });
    
            const [rows] = await connection.execute('SELECT * FROM gym_trainor');
            await connection.end();
    
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
          } catch (error) {
            
          }
        
        return;
      }
  
    // Insert new trainor into the database
    if (req.url === '/insert/trainor' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
  
      req.on('end', async () => {
        const {trainor_id,first_name, last_name, specialty, phone_number} = JSON.parse(body);
  
        try {
          const connection = await mysql.createConnection({
            host: 'localhost',

            
            user: 'root',
            password: 'root',
            database: 'memberdb',
          });
  
          const sql = 'INSERT INTO gym_trainor (trainor_id,first_name, last_name, specialty, phone_number) VALUES  (?, ?, ?, ?, ?)';
          const values = [trainor_id,first_name, last_name, specialty, phone_number];
  
          await connection.query(sql, values);
          await connection.end();
  
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'item was sucessfully inserted trainor' }));
        } catch (error) {
          console.error('Error inserting data:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'An error occurred while registering the trainor.' }));
        }
      });
      return;
    }

    // Insert new class into the database
if (req.url === '/insert/class' && req.method === 'POST') {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const { class_name, class_type, class_day, class_hour, trainor_name } = JSON.parse(body);

    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'memberdb',
      });

      const sql = 'INSERT INTO gym_classes (class_name, class_type, class_day, class_hour, trainor_name) VALUES (?, ?, ?, ?, ?)';
      const values = [class_name, class_type, class_day, class_hour, trainor_name];

      await connection.query(sql, values);
      await connection.end();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Class was successfully inserted.' }));
    } catch (error) {
      console.error('Error inserting data:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'An error occurred while registering the class.' }));
    }
  });
  return;
}

    // show class on our gym
if (req.url === '/post/gym_class') {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'memberdb',
      });

      const [rows] = await connection.query('SELECT * FROM gym_classes');
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

  if (req.url === '/count/gym/member') { // Corrected URL with leading slash
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'memberdb',
      });

      const [rows] = await connection.query('SELECT COUNT(*) AS total_members FROM gym_members');
      await connection.end();

      console.log(rows);  // Add this to see what the server is sending
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: rows}));
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Error connecting to the database' }));
    }
    return;
  }

  
    // Show number  gym member available data in your gym member
    if (req.url === '/count/gym/member/membership') {
      try {
        const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'memberdb',
        });
  
        const [rows] = await connection.query('SELECT membership, COUNT(*) AS count FROM gym_members GROUP BY membership');
        await connection.end();


        console.log(rows)

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: rows }));
      } catch (error) {
        console.error('Error connecting to the database:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Error connecting to the database' }));
      }
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
  else if (req.url === '/stats') {
    filePath = join(process.cwd(), 'public/stats.html');
  }
   else if (req.url === '/navbar') {
      filePath = join(process.cwd(), 'navbar.html');
  } else if(req.url ==='/login'){
      filePath = join(process.cwd(),'public/login.html')
  } else if(req.url ==='/gymclass'){
    filePath = join(process.cwd(),'public/class.html')
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