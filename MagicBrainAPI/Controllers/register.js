export const handelRegister = (req, res, postgreSQL, bcrypt) => {
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
};