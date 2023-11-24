const jwt = require('jsonwebtoken');

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden'
            });
        }
        req.user = user;
        next();
    });
    
}

const authorization = (req, res, next) => {
    const { role } = req.user;
    if (role.name !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden'
        });
    }
    next();
}

module.exports = {
    authenticationToken,
    authorization
}