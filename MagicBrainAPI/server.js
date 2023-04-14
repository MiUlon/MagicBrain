import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

const postgreSQL = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'MagicBrain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '1',
            name: 'Mindaugas',
            email: 'Mindaugas@gmail.com',
            password: 'Mindaugas',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Mindaugas2',
            email: 'Mindaugas2@gmail.com',
            password: 'Mindaugas2',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: "01",
            hash: '',
            email: 'Mindaugas@gmail.com'
        }
    ]
};

app.get('/', (req, res) => {
    res.json(database.users);
});

app.post('/signin', (req, res) => {
    bcrypt.compare("Mindaugas3", "$2a$10$55IqoFErCnOWFLXAZAHcM.bmxuNtJw5CWfcLnLGGC2L7OVO3JAYyG", function(err, res) {
        console.log('First guess: ', res);
    });
    bcrypt.compare("veggies", "$2a$10$55IqoFErCnOWFLXAZAHcM.bmxuNtJw5CWfcLnLGGC2L7OVO3JAYyG", function(err, res) {
        console.log('Second guess: ', res);
    });
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('Success');
    } else {
        res.status(400).json('Error logging in.');
    };
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    postgreSQL('users')
        .returning('*')
        .insert({
            name: name,
            email: email,
            joined: new Date()
        })
        .then(user => {
            res.json(user[0]);
        })
        .catch(err => res.status(400).json('Cannot register.'));
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    postgreSQL.select('*').from('users').where({
        id: id
    })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('User not found');
            };
        })
        .catch(error => res.status(400).json('Error'));
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(404).json('User not found');
    };
});

app.listen(3001, () => {
    console.log('App is working on port 3001.');
});