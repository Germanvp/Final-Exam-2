const {TOKEN} = require('../config')

function validateToken(req, res, next) {
    console.log(req.headers)

    let token = req.headers['session-exam-token']

    console.log(token)

    if( !token ) {
        res.status(401)
        res.statusMessage = "You need to send the session-exam-token"
        res.send().end()
    }

    if (token != TOKEN) {
        res.status(401)
        res.statusMessage = "The session-exam-token is invalid."
        res.send().end()
    } 

    next()

}

module.exports = validateToken;
