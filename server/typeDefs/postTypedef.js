const { gql } = require('apollo-server-express');

const postTypeDefs = gql`

type Post @auth{
    user:UserFieldInPost
    title: String
    description: String
    date: Date
    completed: Boolean
    _id: ID
    createdAt: Date
    updatedAt: Date
}





type PostResponse{
    success: Boolean!
    message: String!
    post:Post
    posts:[Post]
}



input PostInput {
    title:String
    description:String
    date:Date
    completed:Boolean

}
extend type Query {
    getPost(id:ID!):GeneralResponse  @auth
    getAllUserPost:GeneralResponse  @auth

}

extend type Mutation{
    addPost(content: PostInput): GeneralResponse @auth
    updatePost(id: ID!, content: PostInput!): GeneralResponse @auth
    deletePost(id: ID!): GeneralResponse @auth
    deleteAllPost: Boolean @auth

}

`





module.exports = postTypeDefs