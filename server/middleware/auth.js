const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authentication')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401)

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        res.locals.decoded = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }
}

module.exports = verifyToken