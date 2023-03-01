const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');

const app = express();

app.use(express.json());

app.use(cors());

// Routing all the requests
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);

module.exports = app;
