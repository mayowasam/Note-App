const jwt = require('jsonwebtoken')

const auth = async (req) => {
    // console.log(req.headers);
    // console.log('refreshToken', req.headers['x-refresh-token']);
    // console.log(req.cookies);
    let token = req.cookies.accessToken ? req.cookies.accessToken : ""
    // let token = req.headers['x-access-token'] ? req.headers['x-access-token'].split(" ")[1] : ""
    // console.log(token);
    let user = {}
    try {
        if (!token) throw new Error("Unauthorised")
        const verifyToken = jwt.verify(token, process.env.ACCESS)
        // console.log('verify', verifyToken);
        if (!verifyToken) throw new Error("token is invalid")
        // console.log('verifyToken' , verifyToken);

        //for browser
        user = verifyToken
        // console.log("auth user", user); 

        // for apollo studio and postman
        // user = verifyToken.user
        // console.log("auth user", user); 
        return user
    } catch (error) {
        throw new Error(error.message);
    }



}




module.exports = auth