export const handelImage = (req, res, postgreSQL) => {
    const { id } = req.body;
    postgreSQL('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(error => res.status(400).json('Error'))
};