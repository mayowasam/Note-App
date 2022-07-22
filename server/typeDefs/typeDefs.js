const { gql } = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql')

const typeDefs = gql`
  directive @permit(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION
    directive @auth on OBJECT | FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE
    directive @deprecated(reason: String = "No longer supported") on FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE
    # directive @skip(if: Boolean) on FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE


scalar Date
scalar Upload


interface Important {
    email: String
}

enum Role {
  ADMIN
  REVIEWER
  USER
  UNKNOWN
}

type UserFieldInPost{
    id:ID
    fullName:String
}

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


type User implements Important {
    _id: ID
    fullName: String
    email: String
    createdAt:  Date
    updatedAt:Date
    role:Role
    isAvatar:Boolean
    avatar: String
    posts: [Post]
}



type GeneralResponse{
    success: Boolean!
    message: String!
    user: User
    users: [User!]
    post:Post
    posts:[Post]
}

type AuthResponse{
    success: Boolean!
    message: String!
    user: User
    # accessToken:String
    # refreshToken:String
}



input UserInput {
    fullName: String! 
    email: String!
    password: String!
}

input LoginInput {
    email: String!
    password: String!
}

input UpdateInput {
    fullName: String
    file:Upload
}

input PostInput {
    title:String
    description:String
    date:Date
    completed:Boolean

}
type Query {
    users: GeneralResponse @auth @permit(requires: ADMIN)
    getUserByToken: GeneralResponse @auth
    getUserById(id: ID!): GeneralResponse @auth
    important: Important @auth
    refreshToken:Boolean @auth
    logOut:Boolean
    loginUser(content: LoginInput!): AuthResponse 
}

type Mutation{
    addUser(content: UserInput!): AuthResponse
    updateUser(id:ID!, content: UpdateInput): GeneralResponse @auth
    deleteUser(id: ID!): Boolean @auth
    makeAdmin(id:ID!): GeneralResponse @auth @permit(requires: ADMIN)

}

`


const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        // console.log(value.getTime());
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});


module.exports = {
    typeDefs,
    dateScalar
}