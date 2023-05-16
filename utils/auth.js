const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {

    const  authHeader = req.headers.authorization;
    const token = authHeader.split('Bearer ')[1];

    try {
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        return res.status(401).json({errors:[{msg: error.message}]})
    }
    
};