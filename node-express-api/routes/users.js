import express from 'express';

import { createUser, getUsers, getUser, deleteUser, updateUser } from '../controllers/users.js';

const router = express.Router();
// create a router object

let users = [];

// since we've specified app.use('/users', usersRoutes) in index.js
// all routes in here are starting with /users, so you don't need to add '/users' in get() anymore
router.get('/', getUsers);

router.post('/', createUser);

// /users/2 => req.params { id : 2 }
// get a specific user data
router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;