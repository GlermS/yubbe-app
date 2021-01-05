const express = require('express');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('<h1>Ok</h1>')
})


app.listen(3030)