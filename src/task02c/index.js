/** ****************************************************
 * Урок 2: Hello JS World
 * Задача 2C: @username
 ******************************************************/

import express from 'express';
import cors from 'cors';
import _ from 'lodash';

/** ****************************************************
 * Init Globals
 ******************************************************/
const DEVMODE = true;
const app = express();
if (DEVMODE) {
  app.use(cors());
}

/** ****************************************************
 * Canonize
 * @param url
 ******************************************************/
function canonize(url) {
  const urlSafe = _.toString(url);
  const re = new RegExp('@?(https?:)?(//)?(([a-zA-Z_-])[^/]*/)?(@?)([a-zA-Z0-9_.]*)', 'i');
  const username = urlSafe.match(re);

  console.log(username);
  return `@${username[6]}`;
}

/** ****************************************************
 * Route - /
 ******************************************************/
app.get('/task02c', async (req, res) => {
  try {
    // const fullnameStr = _.toString(req.query.fullname);
    let urlStr = _.trim(req.query.username);
    urlStr = _.replace(urlStr, /\s+/g, '');

    const UrlCanon = canonize(urlStr);

    if (_.isEmpty(urlStr)) {
      return res.send('Invalid Url');
    }

    return res.send(`${UrlCanon}`);
  } catch (err) {
    return res.json({ err });
  }
});

/** ****************************************************
 * Express Listener
 ******************************************************/
app.listen(3000, () => {
  console.log('task-02-c READY on 3000');
  console.log('-----------------------');
});
