// i am querying for userResponse because the userResponse is nested into the generl response
//if the userRespose was the general Response i will query for User instead to fill the post field inside it

const User = {
    posts: async (parent, args, {userData, Post}) => {
        // console.log(parent);
         return await Post.find({user: parent._id})  
        
    }
}

module.exports = User