const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if user exists
    if(!token) {
        return res.status(401).json({ msg: 'No token found! Authorisation denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('privateKey'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token!' });
    }
}