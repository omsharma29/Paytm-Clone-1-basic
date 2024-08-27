

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Authorization failed' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Recieved token', token);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId; // Assuming your JWT payload has userId
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = {
    auth
};
