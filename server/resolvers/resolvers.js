const Query = require('./Query')
const Mutation = require('./Mutation')
const User = require('./User')
const {dateScalar} = require('../typeDefs/typeDefs')
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');


const resolvers = {
    Date: dateScalar,
    Upload: GraphQLUpload,
    Query,
    User,
    Mutation,
}

module.exports = resolvers