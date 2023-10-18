import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/users.js';
// usersRoutes is a conventional naming

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/users', usersRoutes)

app.get('/', (req, res) => res.send('Hola'));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));