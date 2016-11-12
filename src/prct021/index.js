/** ****************************************************
 * Урок 2: Hello JS World
 * Практическая задача 1: Канонизация @username
 ******************************************************/

import express from 'express';
import canonize from './canonize';

// Start App on port 3000
const app = express();

/** ****************************************************
 * APP Get. Route: /
 * @param url - get url, response canonized username
 ******************************************************/
app.get('/prct021', (req, res) => {
  const url = req.query.url;
  const username = canonize(url);
  return res.json({
    url,
    username,
  });
});

/** ****************************************************
 * Express Listener
 ******************************************************/
app.listen(3000, () => {
  console.log('Pract-02-1 READY on 3000');
});
