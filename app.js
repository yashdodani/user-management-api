const express = require('express');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');

const app = express();

app.use(express.json());

// Routing all the requests
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);

module.exports = app;
