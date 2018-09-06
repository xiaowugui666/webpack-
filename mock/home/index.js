module.exports = {
    'GET /api_home/public/packets/:id': function (req, res) {
        const {id} = req.params
        return res.send({
            status: 'error',
            code: 402,
            id: id
        });
    }
}