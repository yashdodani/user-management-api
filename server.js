const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connection successfull'));

const app = require('./app');

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
