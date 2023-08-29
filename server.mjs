import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const requestsFilePath = path.join(__dirname, 'requests.txt');

// Check if requests.txt exists, create it if not
try {
  fs.accessSync(requestsFilePath);
} catch (error) {
  fs.writeFileSync(requestsFilePath, '', 'utf-8');
  console.log('Created requests.txt');
}

// Middleware to log requests
app.use((req, res, next) => {
  const now = new Date();
  const requestInfo = `[${now.toISOString()}] ${req.method} ${req.url}\n`;

  fs.appendFile(requestsFilePath, requestInfo, (err) => {
    if (err) {
      console.error('Error appending request info to file:', err);
    }
  });

  next();
});

// Route handler
app.get('/', (req, res) => {
  res.send('Hello, this is the Node.js server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


