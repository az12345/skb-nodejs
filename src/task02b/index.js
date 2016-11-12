/** ****************************************************
 * Урок 2: Hello JS World
 * Задача 2B: Фамилия И. О.
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
app.get('/task02b', async (req, res) => {
  try {
    // const fullnameStr = _.toString(req.query.fullname);
    let fullnameStr = _.trim(req.query.fullname);
    fullnameStr = _.replace(fullnameStr, /\s+/g, ' ');

    if (__DEV__) console.log(`--Q ${fullnameStr}`);
    if (__DEV__) console.log(`--QR ${fullnameStr}`);
    const fullnameArray = _.reverse(_.split(fullnameStr, ' '));

    const searchSymbols = new RegExp('[0-9_.-\/]');
    const foundSymbols = fullnameStr.match(searchSymbols);

    // console.log(foundSymbols);
    // return res.send('err');

    if (fullnameArray.length > 3
      || _.isEmpty(fullnameStr)
      || !_.isEmpty(foundSymbols)) {
      if (__DEV__) console.log('Invalid fullname');
      if (__DEV__)console.log('-------------------');
      return res.send('Invalid fullname');
    }

    const nameF = _.upperFirst(_.toLower(fullnameArray[0]));
    const nameI = (!_.isEmpty(fullnameArray[1])) ? ` ${_.upperFirst(fullnameArray[1])[0]}.` : '';
    const nameO = (!_.isEmpty(fullnameArray[2])) ? ` ${_.upperFirst(fullnameArray[2])[0]}.` : '';

    if (__DEV__)console.log(`--R ${nameF} ${nameI} ${nameO}`);
    if (__DEV__)console.log('-------------------');

    if (fullnameArray.length === 3) return res.send(`${nameF}${nameO}${nameI}`);
    return res.send(`${nameF}${nameI}${nameO}`);
  } catch (err) {
    return res.json({ err });
  }
});

/** ****************************************************
 * Express Listener
 ******************************************************/
app.listen(3000, () => {
  console.log('task-02-b READY on 3000');
});
