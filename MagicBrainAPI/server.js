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
    const hash = bcrypt.hashSync(password);
    postgreSQL.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0].email,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
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
    postgreSQL('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(error => res.status(400).json('Error'))
});

app.listen(3001, () => {
    console.log('App is working on port 3001.');
});