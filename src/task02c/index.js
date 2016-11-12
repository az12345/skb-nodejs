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
const __DEV__ = true;
const app = express();
if (__DEV__) {
  app.use(cors());
}

/** ****************************************************
 * Canonize
 * @param url
 ******************************************************/
function canonize(url) {
  const urlSafe = _.toString(url);
  const re = new RegExp('@?(https?:)?(//)?(www.)?((telegram|vk|vkontakte|twitter|github|instagram)[^/]*/)?([a-zA-Z0-9.]*)', 'i');
  const username = urlSafe.match(re)[6];

  return `@${username}`;
}

/** ****************************************************
 * Route - /
 ******************************************************/
app.get('/task02c', async (req, res) => {
  try {
    // const fullnameStr = _.toString(req.query.fullname);
    let urlStr = _.trim(req.query.username);
    urlStr = _.replace(urlStr, /\s+/g, '');

    if (__DEV__) console.log(`->${urlStr}`);

    const UrlCanon = canonize(urlStr);
    if (__DEV__) console.log(`->${UrlCanon}`);
    if (__DEV__) console.log('------------------');

    // const searchSymbols = new RegExp('[0-9_.-\/]');
    // const foundSymbols = fullnameStr.match(searchSymbols);

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
