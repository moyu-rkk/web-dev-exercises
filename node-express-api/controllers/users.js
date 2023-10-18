import { v4 as uuidv4 } from 'uuid';

let users = [];
//下面明明只是定义function并没有调用，还是会报错提示users不存在
//为了消除错误加了一个这个，但是实际使用的还是router里面的users array啦

export const createUser =  (req, res) => {
    const newUser = req.body;
    users.push({ ... newUser, id: uuidv4()});
    res.send(`User with the name ${newUser.firstName} ${newUser.lastName} added to the database `);
}

export const getUsers = (req, res) => {
    res.send(users);
}

export const getUser = (req, res) => {
    const { id } = req.params; // object destruction
    const findUser = users.find((user) => user.id === id ); // find user with specific id in users array
    res.send(findUser);
}

export const deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id != id );
    res.send(`User with the id ${id} deleted from the database.`)
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const user = users.find((user) => user.id === id );

    // if certain value returned not Null, update new value to variable
    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(age) user.age = age;

    res.send(`User with the id ${id} has been updated.`)
}