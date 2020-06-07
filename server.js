const express = require('express');
const connectDB = require('./config/database');


const app = express();

const port = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
    res.send('API running');
});

// Middleware for BodyParsing
app.use(express.json({ extended: false }));

// Endpoints
app.use('/api/users', require('./controller/routes/api/users'));
app.use('/api/todos', require('./controller/routes/api/todos'));

app.listen(port, () => {
    console.log(`Server up & running on port ${port}`);
});