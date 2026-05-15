const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1]; 

    console.log("TOKEN:", token);

    if (!token) {
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'gameonsecretkey');

        console.log("DECODED TOKEN:", decodedToken);
   
        if (!decodedToken.userId) {
            req.isAuth = false;
            return next();
        }

        req.isAuth = true;
        req.userId = decodedToken.userId;
        next();
        
     } catch (err) {
        req.isAuth = false;
        return next();
    }
}