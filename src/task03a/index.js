/** ****************************************************
 * Урок 3: Express.js & MongoDB
 * Задача 3A: API 80286
 ******************************************************/
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import fetch from 'node-fetch';
import _ from 'lodash';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pc = '{"board":{"vendor":"IBM","model":"IBM-PC S-100","cpu":{"model":"80286","hz":12000},"image":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/Picture%20of%2080286%20V2%20BoardJPG.jpg","video":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/80286-Demo3.mp4"},"ram":{"vendor":"CTS","volume":1048576,"pins":30},"os":"MS-DOS 1.25","floppy":0,"hdd":[{"vendor":"Samsung","size":33554432,"volume":"C:"},{"vendor":"Maxtor","size":16777216,"volume":"D:"},{"vendor":"Maxtor","size":8388608,"volume":"C:"}],"monitor":null,"length":42,"height":21,"width":54}';
const pcObj = JSON.parse(pc);

app.get('/:level1', async (req, res) => {
  const level1 = req.params.level1;
  if (_.has(pcObj, [level1])) {
    return res.json(_.get(pcObj, [level1]));
  }

  return res.status(404).send('Not Found');
});

app.get('/:level1/:level2', async (req, res) => {
  const level1 = req.params.level1;
  const level2 = req.params.level2;
  if (_.has(pcObj, [level1, level2])) {
    return res.json(_.get(pcObj, [level1, level2]));
  }

  return res.status(404).send('Not Found');
});

app.get('/', async (req, res) => {

  return res.json(pcObj);
});

/** ****************************************************
 * Express Listener
 ******************************************************/
app.listen(3000, () => {
  console.log('Task-03-A READY on 3000');
});
