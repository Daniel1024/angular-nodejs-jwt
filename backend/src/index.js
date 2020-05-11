const express = require('express');
const cors = require('cors');
const app = express();

require('./database');

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes'));

app.listen(3000, () => console.log('Server on port', 3000));
