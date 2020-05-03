const path = require('path');
const express = require('express');

var port = process.env.PORT || 3000;
const app = express();

var pathPublic = path.join(__dirname, '../public');
app.use(express.static(pathPublic));

app.listen(port, () => {
    console.log(`Server run on port ${port}`);
})