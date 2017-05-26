const express = require('express'); // Import express
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json(req.headers);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});