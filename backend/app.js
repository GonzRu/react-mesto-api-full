require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const process = require('process');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes');

const { PORT = 3000 } = process.env;

process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана.`);
});

mongoose.connect('mongodb://localhost:27017/mesto');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(router);
app.listen(PORT);
