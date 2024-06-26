const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
const dosenRoutes = require('./routes/dosenRoutes');
const pendaftaranRoutes = require('./routes/pendaftaranRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/', mahasiswaRoutes);
app.use('/api/', dosenRoutes);
app.use('/api/', pendaftaranRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
