import { gql } from "@apollo/client";

export const LOGIN = gql`
query LoginUser($content: LoginInput!) {
  loginUser(content: $content) {
    success
    message
    user {
      _id
      fullName
      email
      createdAt
      updatedAt
      role
      avatar
      posts {
        title
        description
        date
        completed
        _id
        createdAt
        updatedAt
      }
    }
  }
}
`

export const REGISTER = gql`
mutation Mutation($addUserContent: UserInput!) {
  addUser(content: $addUserContent) {
    success
    message
    user {
      _id
      fullName
      email
      createdAt
      updatedAt
      role
      avatar
      posts {
        title
        description
        date
        completed
        _id
        createdAt
        updatedAt
      }
    }
  }
}
` 

export const GETUSERS = gql`
query Users {
  users {
    success
    message
    users {
      _id
      fullName
      email
      createdAt
      updatedAt
      role
      avatar
      posts {
        title
        description
        date
        completed
        _id
        createdAt
        updatedAt
      }
    }
    posts {
      user {
        fullName
        id
      }
      title
      description
      date
      completed
      _id
      createdAt
      updatedAt
    }
  }
}
`

export const GETUSERBYTOKEN = gql`
query GetUserByToken {
  getUserByToken {
    success
    message
    user {
      _id
      fullName
      email
      createdAt
      updatedAt
      role
      avatar
      posts {
        title
        description
        completed
        date
        _id
        createdAt
        updatedAt
      }
    }
  }
}
`


export const GETUSERBYID = gql`
query GetUserById($getUserByIdId: ID!) {
  getUserById(id: $getUserByIdId) {
    success
    message
    user {
      fullName
      email
      _id
      createdAt
      updatedAt
      role
      avatar
      posts {
        title
        description
        date
        completed
        _id
        createdAt
        updatedAt
      }
    }
  }
}
`




export const GETALLUSERPOST =gql`
query GetAllUserPost {
  getAllUserPost {
    success
    message
    posts {
      title
      description
      date
      completed
      _id
      createdAt
      updatedAt
      user {
        id
        fullName
      }
    }
  }
}
`

export const GETAPOST = gql`
query GetPost($getPostId: ID!) {
  getPost(id: $getPostId) {
    success
    message
    post {
      title
      description
      date
      completed
      _id
      createdAt
      updatedAt
    }
  }
}

`


export const REFRESHTOKEN = gql`
query Query {
  refreshToken
}

`

export const LOGOUT = gql`
query Logout {
  logOut
}
`


export const MAKEADMIN = gql`
mutation MakeAdmin($makeAdminId: ID!) {
  makeAdmin(id: $makeAdminId) {
    success
    message
    user {
      _id
      fullName
      email
      createdAt
      updatedAt
      role
      avatar
      posts {
        title
        description
        date
        completed
        _id
        createdAt
        updatedAt
      }
    }
  }
}
`




export const UPDATEUSER =  gql`
mutation UpdateUser($updateUserId: ID!, $updateUserContent2: UpdateInput) {
  updateUser(id: $updateUserId, content: $updateUserContent2) {
    success
    message
    user {
        _id
      fullName
      email
      createdAt
      updatedAt
      role
      avatar
      posts {
        title
        description
        date
        completed
        _id
        createdAt
        updatedAt
      }
    }
  }
}
`

export const ADDPOST = gql`
mutation AddPost($addPostContent2: PostInput) {
  addPost(content: $addPostContent2) {
    post {
      title
      description
      date
      completed
      _id
      createdAt
      updatedAt
    }
  }
}
`
export const UPDATEPOST = gql`
mutation UpdatePost($updatePostId: ID!, $updatePostContent2: PostInput!) {
  updatePost(id: $updatePostId, content: $updatePostContent2) {
    success
    message
    post {
      updatedAt
      title
      description
      date
      createdAt
      completed
      _id
    }
 
  }
}
`
export const DELETEPOST = gql`
mutation DeletePost($deletePostId: ID!) {
  deletePost(id: $deletePostId) {
    message
    success
    post {
      updatedAt
      title
      description
      date
      createdAt
      completed
      _id
    }
  }
}
`

export const DELETEALLPOST = gql`
mutation Mutation {
  deleteAllPost
}
`















export const DELETEUSER =gql`
mutation DeleteUser($deleteUserId2: ID!) {
  deleteUser(id: $deleteUserId2)
}

`




