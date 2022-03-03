const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger');
const students = require('./Students')

const app = express();
const port = 5000;

// Run middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Homepage route
app.get('/', (req, res) => 
    res.render('index', {
        title: 'WebDev Students',
        students
    })
);

// API route
app.use('/api/students', require('./routes/api/students'));

// API route
app.use('/api/books', require('./routes/api/books'));

// Folder static
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log('Running express app!'));