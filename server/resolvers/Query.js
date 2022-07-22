const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { ValidationError, ApolloError,UserInputError, AuthenticationError } = require('apollo-server-core');


const Query = {
    
    loginUser: async (_, { content }, { User, res }) => {
        // console.log(content);
        const { email, password } = content
        try {
            let user = await User.findOne({ email })
            if (!user) return new ValidationError( "incorrect credentials")
            // console.log({user});


            const validPassword = await bcrypt.compare(password, user.password)
            // console.log({validPassword});

            if (!validPassword) return new ValidationError( "incorrect credentials")

            let userPayload = {
                fullName: user.fullName,
                email: user.email,
                id: user._id,
                role: user.role
            }

            let accessToken = jwt.sign(userPayload, process.env.ACCESS, { expiresIn: "40m" })
            accessToken = `Bearer ${accessToken}`
            let refreshToken = jwt.sign(userPayload, process.env.REFRESH, { expiresIn: "2h" })

            // console.log(accessToken);
            // console.log(refreshToken);
            user = await User.findOne({ email }).select('-password')
            // console.log(user);

            res.cookie('refreshToken', refreshToken)
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: "none",
                // secure: it must be false for postman to be able to store it but true for browser/apollo sandbox to store it
                // secure: false
                secure: true
            })
            //   res.cookie('accessToken', accessToken)

            return {
                success: true,
                message: "Successfully logged In",
                user
            }
        } catch (error) {
            return new ApolloError(error.message)

        }

    },

    users: async (_, __, { user, User }) => {
        // console.log(ctx);
        // console.log(id);
        try {
            if (!user) return new AuthenticationError( "you are not authenticated")
            
            let users = await User.find().select('-password')
            return {
                success: true,
                message: "successfully gotten",
                users
            }
        } catch (error) {
            return new ApolloError(error.message)

        }
    },

    getUserById: async (_, args, { user, User }) => {
        let { id } = args
        try {
            if (!user) return new AuthenticationError( "you are not authenticated")

            let existingUser = await User.findOne({ _id: id }).select('-password')

            if (!existingUser) return new ValidationError( "user does not exist")

            return {
                success: true,
                message: "successfully gotten",
                user: existingUser
            }
        } catch (error) {
            return new ApolloError(error.message)

        }

    },

    getUserByToken: async (_, __, { user, User }) => {

        try {
            if (!user) return new AuthenticationError( "you are not authenticated")

            let existingUser = await User.findById(user.id).select('-password')
            if (!existingUser) return new ValidationError( "user does not exist")

            return {
                success: true,
                message: "successfully gotten",
                user: existingUser
            }
        } catch (error) {
            return new ApolloError(error.message)

        }

    },
   
    getAllUserPost: async (_, __, { user, Post }) => {
        // console.log(content);
        // console.log(id);
        try {
            if (!user) return new AuthenticationError( "you are not authenticated")

            let posts = await Post.find({ user: user.id }).populate("user", ["fullName"])

            return {
                success: true,
                message: "posts successfully gotten",
                posts
            }
        } catch (error) {
            return new ApolloError(error.message)

        }

    },
    getPost: async (_, { id }, { user, Post }) => {
        // console.log(content);
        // console.log(id);
        try {
            if (!user) return new AuthenticationError( "you are not authenticated")
            let post = await Post.findOne({ _id: id }).populate("user", ["fullName"])
            // console.log(posts);
            if (!post) return new UserInputError( `post ${id} does not exist`)
            return {
                success: true,
                message: "post successfully gotten",
                post
            }

        } catch (error) {
            return new ApolloError(error.message)
 
        }

    },
    refreshToken: async (_, __, { req, res }) => {
        // let refreshToken = req.headers['x-refresh-token'] ? req.headers['x-refresh-token'] : "" 
        let refreshToken = req.cookies.refreshToken
        // console.log('refreshToken', refreshToken);
        try {
            if (!refreshToken) throw new Error("no refreshToken sent")
            const verifyToken = jwt.verify(refreshToken, process.env.REFRESH)
            if (!verifyToken) throw new Error("refreshToken invalid")
            // console.log('verifyToken', verifyToken);
            let userPayload = {
                fullName: verifyToken.fullName,
                email: verifyToken.email,
                id: verifyToken.id,
                role: verifyToken.role
            }
            let accessToken = jwt.sign(userPayload, process.env.ACCESS, { expiresIn: "60m" })

            accessToken = `Bearer ${accessToken}`
            // console.log("accestoken from refresh", accessToken);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: "none",
                // secure: it must be false for postman to be able to store it but true for browser to store it
                // secure: false
                secure: true,
            })

            return true

        } catch (error) {
            throw new Error(error.message)
        }


    },
    logOut: async (_, __, { res }) => {
        //   console.log("i am logging out");
        try {

            res.cookie('accessToken', "", {
                expiresIn: new Date(Date.now() + 5 * 1000),
                httpOnly: true,
                sameSite: true,
                secure: true

            })
            // console.log('accessToken', accessToken);

            return true

        } catch (error) {
            throw new Error(error.message)
        }


    },
    important: async (_, __, { User }) => {
        let users = await User.find().select('-password')
        return {
            success: true,
            message: "successfully gotten",
            users
        }
    },

   




}

module.exports = Query