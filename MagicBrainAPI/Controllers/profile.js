export const handelProfile = (req, res, postgreSQL) => {
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
};