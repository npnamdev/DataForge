const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connection = require('./src/config/database');
const apiRouter = require('./src/routes/index');

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

// Middleware
app.use(express.static(path.join('./src', 'public')));
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
apiRouter(app);

// Database Connection and Server Start
(async () => {
    try {
        await connection();
        app.listen(port, () => {
            console.log(`Server running http://localhost:${port}/`);
        });
    } catch (error) {
        console.log("Error connecting to DB: ", error);
    }
})();
