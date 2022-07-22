const jwt = require('jsonwebtoken')
const { join } = require('path')
const { ValidationError, UserInputError, ForbiddenError, ApolloError } = require('apollo-server-core');
const cloudinary = require('cloudinary')



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})




const Mutation = {
    // addUser: async (_, { content }, { dataSources}) => {

    addUser: async (_, { content }, { User, res }) => {
        // console.log(content);
        // console.log(User);

        const { email } = content
        try {
            let user = await User.findOne({ email })
            if (user) return new ValidationError("email already exist")

            user = await User.create(content)
            // console.log({ user });


            let userPayload = {
                fullName: user.fullName,
                email: user.email,
                id: user._id,
                role: user.role
            }

            let accessToken = jwt.sign(userPayload, process.env.ACCESS, { expiresIn: "40m" })
            accessToken = `Bearer ${accessToken}`
            let refreshToken = jwt.sign(userPayload, process.env.REFRESH, { expiresIn: "2h" })
            user = await User.findOne({ email }).select('-password')

            // console.log('accessToken', accessToken);
            res.cookie('refreshToken', refreshToken)
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: "none",
                // secure: it must be false for postman to be able to store it but true for browser to store it
                // secure: false
                secure: true,

            })
            return {
                success: true,
                message: "User successfully added",
                user
            }

        } catch (error) {
            // console.log("message", error.message);
            // console.log(error._message);
            return new ApolloError(error.message)

        }

    },

    updateUser: async (_, { id, content }, { user, User }) => {
        // console.log(user);
        // console.log('content', content);
        const { fullName, file } = content
        // console.log('id', id);
        // console.log(file);

        try {
            if (!user) return new AuthenticationError("you are not authenticated")

            if (!fullName && !file) return new UserInputError("field are empty")
            if (user.id !== id || !user) return new ForbiddenError("you are not authorized")

            let userProfile = await User.findOne({ _id: id })

            if (!userProfile) return new Error("user profile not found")

            if (file && fullName) {
                const { createReadStream } = await file
                const result = await new Promise((resolve, reject) => {
                    createReadStream().pipe(
                        cloudinary.v2.uploader.upload_stream(
                            {
                                allowed_formats: ['jpg', 'png', 'jpeg', "webp"],
                                public_id: "TodoApp",
                                folder: "TodoApp"
                            }
                            , (error, result) => {
                                if (error) {
                                    reject(error)
                                }

                                resolve(result)
                            })
                    )
                })

                if (!result) return new ApolloError(" image uplaod failed")
                // console.log({ result });

                userProfile.fullName = fullName
                userProfile.avatar = result.url
                userProfile.isAvatar = true

                // console.log({userProfile});

                userProfile = await User.findOneAndUpdate({ _id: user.id }, { $set: userProfile }, { new: true })
                // console.log(user);
                const data = await User.findOne({ _id: user.id }).select('-password')
                // console.log({data});

                return {
                    success: true,
                    message: "profile picture and fullName added",
                    user: data
                }


            } else if (file) {
                const { createReadStream } = await file
                const result = await new Promise((resolve, reject) => {
                    createReadStream().pipe(
                        cloudinary.v2.uploader.upload_stream(
                            {
                                allowed_formats: ['jpg', 'png', 'jpeg', "webp"],
                                public_id: "TodoApp",
                                folder: "TodoApp"
                            }
                            , (error, result) => {
                                if (error) {
                                    reject(error)
                                }

                                resolve(result)
                            })
                    )
                })

                if (!result) return new ApolloError(" image uplaod failed")
                // console.log({ result });

                userProfile.avatar = result.url
                userProfile.isAvatar = true

                userProfile = await User.findOneAndUpdate({ _id: user.id }, { $set: userProfile }, { new: true })
                // console.log(user);
                const data = await User.findOne({ _id: user.id }).select('-password')

                return {
                    success: true,
                    message: "profile picture added",
                    user: data
                }


            } else {
                userProfile = await User.findByIdAndUpdate({_id:user.id}, { fullName }, { new: true }).select('-password')
                return {
                    success: true,
                    message: "Successfully Updated user",
                    user: userProfile
                }

            }

        } catch (error) {
            return new ApolloError(error.message)

        }

    },

    makeAdmin: async (_, { id }, { user, User }) => {

        try {

            if (!user) return new AuthenticationError("you are not authenticated")

            let existingUser = await User.findOne({ _id: id })
            if (!existingUser) return new ValidationError("incorrect credentials")

            let role = await User.findOne({ _id: existingUser._id })
            if (role.role !== "ADMIN") return new ForbiddenError("Unauthorised only Admin can change roles")

            existingUser = await User.findByIdAndUpdate(id, { role: "ADMIN" }, { new: true })
            return {
                success: true,
                message: "Successfully Updated user role",
                user: existingUser
            }

        } catch (error) {
            return new ApolloError(error.message)

        }





    },

    //posts

    addPost: async (_, { content }, { user, Post }) => {
        // console.log({ user });

        try {
            if (!user) return new AuthenticationError("you are not authenticated")

            let post = await Post.create({ ...content, user: user.id })
            // let posts =  await Post.find({user : id}).sort({createdAt: -1})
            // let posts = await Post.find({ user: user.id })
            // console.log(posts);

            return {
                success: true,
                message: "successfully posted",
                post
            }
        } catch (error) {
            return new ApolloError(error.message)

        }

    },

    updatePost: async (_, { id, content }, { user, Post }) => {
        // console.log(args);
        // console.log(content);
        // console.log(id);
        // console.log('userid', userid);
        try {
            if (!user) return new AuthenticationError("you are not authenticated")


            let post = await Post.findOne({ _id: id })
            if (!post) return new Error("post not found")
            post = await Post.findByIdAndUpdate({ _id: id }, { ...content }, { new: true })
            // let posts = await Post.find({ user: user.id })

            return {
                success: true,
                message: "post successfully updated",
                post
            }



        } catch (error) {
            return new ApolloError(error.message)

        }

    },

    deletePost: async (_, { id }, { user, Post, User }) => {
        // console.log(content);
        // console.log(id);
        // console.log(user);
        try {
            if (!user) return new AuthenticationError("you are not authenticated")

            let post = await Post.findOne({ _id: id })


            if (!post) return new Error("post not found")
            // console.log("post id" , post.user);
            // console.log("user id" , user.id);
            // console.log(user.id !== post.user.toString() );
            // console.log(((user.role !== "ADMIN")));
            // console.log(((user.id !== post.user.toString()) || (user.role !== "ADMIN")));

            if (user.id !== post.user.toString()) return new ForbiddenError("Unauthorised to delete this post")


            post = await Post.findByIdAndRemove({ _id: id }, { new: true })

            return {
                success: true,
                message: "successfully deleted",
                post
            }
        } catch (error) {
            return new ApolloError(error.message)

        }

    },

    deleteAllPost: async (_, __, { user, Post }) => {
        try {
            if (!user) return new AuthenticationError("you are not authenticated")
            // console.log(user);
            let posts = await Post.find({ user: user.id })
            // console.log({ posts });
            // console.log(posts.length);

            if (posts.length === 0) return new Error("no post found")
            if (user.id !== posts[0].user.toString()) return new ForbiddenError("Unauthorised to delete this post")
            posts = await Post.deleteMany({ user: user.id })
            return true


        } catch (error) {
            return new ApolloError(error.message)

        }
    },

    deleteUser: async (_, { id }, { user, User, Post }) => {
        // console.log(user);
        // console.log(content);
        try {
            if (!user) return new AuthenticationError("you are not authenticated")

            let existingUser = await User.findOne({ _id: id })
            if (!existingUser) return new Error("user profile not found")
            // console.log(user);
            // console.log(existingUser.id);
            // console.log();
            if (user.id !== existingUser.id) return new ForbiddenError("Unauthorised to delete user")

            existingUser = await User.findByIdAndRemove(user.id, { new: true })
            await Post.deleteMany({ user: user.id })

            return true


        } catch (error) {
            return new ApolloError(error.message)

        }





    }
}

module.exports = Mutation