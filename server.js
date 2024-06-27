const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors'); 
const cors_options = require('./config/cors_options')
const {logger}  = require('./middleware/log_events');
const errorHandler = require('./middleware/error_handler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');

const PORT = process.env.PORT || 3500;
app.use(logger);
app.use(credentials);
app.use(cors(cors_options));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh')); // refresh end point will receive the cookie that has a refresh token, and it will issue a new access token
app.use('/logout', require('./routes/logout'));
app.use(verifyJWT); // JWT will be applied after this
app.use('/employee', require('./routes/api/employee'));

app.all('*', (req, res) => {
    // Set the status to 404 (Not Found)
    res.status(404);

    // Check if the client accepts HTML
    if (req.accepts('html')) {
        // Send a custom 404 HTML page
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    // Check if the client accepts JSON
    else if (req.accepts('json')) {
        // Send a JSON response with an error message
        res.json({ error: "Not found" });
    }
    // If the client accepts neither HTML nor JSON
    else {
        // Send a plain text response
        res.type('txt').send("404 Not found");
    }
});
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


