/** ****************************************************
 * Урок 2: Hello JS World
 * Задача 2A: A + B
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
 * Route - /
 ******************************************************/
app.get('/task02a', async (req, res) => {
  try {
    const numberA = _.toSafeInteger(req.query.a);
    const numberB = _.toSafeInteger(req.query.b);
    const sum = numberA + numberB;
    return res.send(`${sum}`);
  } catch (err) {
    return res.json({ err });
  }
});

/** ****************************************************
 * Express Listener
 ******************************************************/
app.listen(3000, () => {
  console.log('task-02-a READY on 3000');
});
