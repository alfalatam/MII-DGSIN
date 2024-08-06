const express = require('express');
const app = express();

app.use(express.static('./dist/dgsin-champs-frontend'));

app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: './dist/dgsin-champs-frontend/'});
});

app.listen(process.env.PORT || 8080)