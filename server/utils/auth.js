const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    // console.log('req.cookies', req.cookies);
    // console.log('req.cookies.accessToken', req.cookies.accessToken);
    const token =  req.cookies.accessToken ? req.cookies.accessToken.split(" ")[1] : ""
    // const token =  req.cookies.accessToken ? req.cookies.accessToken : ""
    // console.log('auth token', token);
    try {
        if (!token) {
            req.isAuth = false
            return next()
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS)
        // console.log('decodedToken', decodedToken);

        if (!decodedToken) {
            req.isAuth = false
            return next()
        }
        // console.log('decodedToken.user', decodedToken.user);
        // req.user = decodedToken.user
        req.user = decodedToken
        req.isAuth = true

        // console.log('req.user',req.user);
        return next()
    } catch (error) {
        req.isAuth = false
        return next()
    }
}

module.exports = auth