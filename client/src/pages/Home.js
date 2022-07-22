import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import { Loader, addPost, addUser, removePost, removeAllPost, AddNote, useStateVal } from "../import";
import styled from "styled-components"
import { AiTwotoneDelete, AiFillFolderAdd } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { DELETEPOST, DELETEALLPOST, GETUSERBYTOKEN } from '../endpoints'


const Container = styled.div`
position: absolute;
top:0;
width: 100%;
height: 100vh;
// border: 2px solid red;
padding: 5rem 2rem 0;
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 1fr 1fr 4fr 1fr;
overflow: hidden;
gap: 1rem;

@media (max-width: 700px){
    padding: 6rem 1rem 0;

}

`

const Filter = styled.section`
// border: 2px solid red;
width: 100%;
height: 100%;
display: grid;
grid-template-columns: repeat( 2, 1fr);
align-items: center;

.input{

    input{
        width: 50%;
        border-bottom: 1px solid ${({ theme }) => theme.body};
        padding: 1rem;
        border-radius: 10px;
        outline:none;
    }

    button{
        width: 10rem;
        height: 3.5rem;
        border-radius: 10px;
        border: 1px solid ${({ theme }) => theme.text};
        color: ${({ theme }) => theme.text};
        background: ${({ theme }) => theme.body};
        cursor: pointer;

    }
}

.select{
    display: grid;
    justify-items: end;

    select{
        width: 50%;
        border: 1px solid ${({ theme }) => theme.body};
        padding: 1rem;
        border-radius: 10px;
        outline:none;
    }

}

@media (max-width: 700px){
    grid-template-columns: 1fr;
    gap: .5rem;

    .input{
        width: 100%;

        input{
            height: 100%;
            width: 70%;

        }
        button{
            font-size: .8rem;
            width: 30%;
            height: 3rem;
        }
    }

    .select{
        justify-items: center;

        select{
            padding: .5rem
 
        }
    }

}

`
const AddList = styled.section`
width: 100%;
// border: 2px solid blue;
display: flex;
align-items: center;
justify-content: end;

button{
    width: 10rem;
    height: 3rem;
    padding: .5rem;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.body};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    svg{
        font-size: 1rem;
    }

    .delete{
        color: red;
    }
}

@media (max-width: 700px){
    justify-content: center;
    button{
        width: 7rem;
        font-size: .7rem;
        gap: unset;

    }
}

`
const List = styled.section`
// border: 2px solid yellow;
width: 100%;
height: 100%;
overflow: scroll;

.placeholder{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
  }
  
  
  th, td {
    text-align: left;
    padding: 16px;
    font-size: .8rem;
  }
  
  th, tr:nth-child(even) {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }


.post__btn{
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        button{
            outline: none;
            border: none;
            background: inherit;
            cursor: pointer;


            .delete{
                color: red;
            }
        }
}
    &::-webkit-scrollbar{
      //   display: none;
        width: .5rem;
        
        &-thumb{
            background: ${({ theme }) => theme.body};
        }
    }


    @media (max-width: 700px){
        .hide-sm{
            display: none;
        }
    }


`
const Footer = styled.section`
// border: 2px solid green;
width: 100%;
height: 100%;
display: grid;
grid-template-columns: repeat(2, 1fr);

.total{
    // border: 2px solid blue;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    button{
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        width: 5rem;
        padding: .5rem;
        cursor: pointer;

    }



    p{
        font-size: .8rem;
        color: ${({ theme }) => theme.default};
        font-weight: 600;

        span{
            color: ${({ theme }) => theme.body};
            font-size: 1.1rem;
            font-weight: 700;

        }
    }
 
}

.status{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    gap: 1rem;
    // border: 2px solid yellow;


    div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        font-size: .8rem;

        p{
            color: ${({ theme }) => theme.default};
            font-weight: 600;
        }
        span{
            color: ${({ theme }) => theme.body};
            font-size: 1.3rem;
            font-weight: 700;

        }
        
    }
}

@media( max-width: 700px){
    grid-template-columns: 1.5fr 1fr;
    font-size: .8rem;
   
    .status{
        flex-direction: column;
        align-items: start;

        gap: unset;

        div{
            width: 100%;
            // border: 2px solid red;
            span{
                font-size: .9rem;
    
            }
        }
        
    }

}

`

export default function Home() {
    let dispatch = useDispatch()
    const { setEdit, setPost, setPostId, initialState } = useStateVal()
    const [modal, setModal] = useState(false)

    //getting the users post from redux
    const { posts } = useSelector(state => state.post)
    const { user } = useSelector(state => state.user)
    const [allPosts, setAllPosts] = useState(posts)

    //getting user from the server
    const { data: userData, loading: userLoading, error: userError } = useQuery(GETUSERBYTOKEN, {
        onCompleted({ getUserByToken }) {
            // console.log(getUserByToken);
            if (getUserByToken) {
                dispatch(addUser(getUserByToken.user))
                if (getUserByToken.user?.posts.length > 0) {
                    dispatch(addPost(getUserByToken.user?.posts))

                }
            }
        }
    })

    // deleting a post
    const [deleteNote, { loading, error, data: deleteData }] = useMutation(DELETEPOST, {
        onCompleted({ deletePost }) {
            if (deletePost) {
                dispatch(removePost(deletePost.post))
            }

        },
        onError(error) {
            alert(error.message)
        },
        // update(cache, { data: { deletePost } }) { //the repsonse of deleteNote = data.deletePost
        //     const { getUserByToken } = cache.readQuery({ query: GETUSERBYTOKEN }) //read the already cached response of GETUSERBYTOKEN = data.getUserByToken
        //     console.log({ getUserByToken });

        //     // let newData = getUserByToken.user.posts.filter(post => post._id !== deletePost.post._id)


        //     cache.writeQuery({//write and update the cached response of GETUSERBYTOKEN with the result of the filter
        //         query: GETUSERBYTOKEN,
        //         // data: {
        //         //     getUserByToken: {
        //         //         ...getUserByToken,
        //         //         user: {
        //         //             ...getUserByToken.user,
        //         //             posts: newData
        //         //         }
        //         //     }
        //         // }

        //         data: { getUserByToken: getUserByToken.user.posts.filter(post => post._id !== deletePost.post._id) }
        //     })
        // },
        refetchQueries: [{ query: GETUSERBYTOKEN }]

    })

    //deleting all posts
    const [deleteAllNote, { loading: allLoading, error: allError, data: allData }] = useMutation(DELETEALLPOST, {
        onCompleted(data) {
            console.log(data);
            dispatch(removeAllPost())

        },
        onError(error) {
            alert(error.message)
        },
        refetchQueries: [{ query: GETUSERBYTOKEN }]

    })


    const ToggleForm = () => {
        setModal(!modal)
        if (!modal) {
            setPost(initialState)
        }
    }




    //filter the note
    const CompletedPosts = posts && posts.length > 0 && posts.filter(post => post.completed)
    const PendingPosts = posts && posts.length > 0 && posts.filter(post => !post.completed)


    //filter input and select
    const keys = ["description", "title"]
    const handleSearch = (e) => {
        const filteredPost = posts.filter(post => {
            return keys.some((key => post[key].toLowerCase().includes(e.target.value.toLowerCase())))
        })
        setAllPosts(filteredPost)

    }

    const filterByStatus = (e) => {
        if (e.target.value === "completed") {
            setAllPosts(posts.filter(post => post.completed))
        } else if (e.target.value === "pending") {
            setAllPosts(posts.filter(post => !post.completed))

        } else {
            return setAllPosts(posts)
        }

    }

    //update allpost when post changes
    useMemo(() => {
        setAllPosts(posts)

    }, [posts])

    // console.log({allPosts});
    // console.log({posts});

    //eventsHandlers

    //update a note
    const handleChange = (id) => {
        setEdit(true)
        setPostId(id)
        let post = posts.find(post => post._id === id)
        setPost(
            {
                title: post.title,
                description: post.description,
                completed: post.completed,
                date: new Date(post.date).toISOString().slice(0, 10)
            }
        )
        setModal(true)

    }
    //delete a note
    const deletePost = (id) => {
        let value = window.confirm("Are you sure you want to delete this note?")
        if (value) {
            // console.log({ id });
            deleteNote({
                variables: {
                    deletePostId: id
                }

            })

        }
    }

    //delete all note
    const deleteAll = () => {
        let value = window.confirm("Are you sure you want to delete all?")
        if (value) {
            deleteAllNote()

        }
    }

    // if (userData) console.log({ userData });
    // if (deleteData) console.log({ deleteData });
    // if(allData) console.log({allData});
    // if (userError) console.log({ userError });
    // if (error) console.log({ error });
    // if (allError) console.log({ allError });

    // if (error) alert(error.message) ;
    // if (userError) alert(userError.message) ;
    // if (allError) alert(allError.message) ;


    return (
        <>
            {(loading || userLoading || allLoading || !user) && <Loader />}
            <Container>
                <Filter>
                    <div className="input">
                        <input type="text" placeholder="search note" onChange={e => handleSearch(e)} />
                        <button>Search</button>
                    </div>

                    <div className="select">
                        <select name="" id="" onChange={(e) => filterByStatus(e)}>
                            <option value="">all</option>
                            <option value="completed">completed</option>
                            <option value="pending">pending</option>
                        </select>

                    </div>


                </Filter>

                <AddList>
                    <button onClick={ToggleForm}>Add Note<AiFillFolderAdd /></button>
                    <button onClick={deleteAll}>Delete all Note <AiTwotoneDelete className="delete" /></button>
                    <AddNote modal={modal} setModal={setModal} ToggleForm={ToggleForm} />

                </AddList>
                <List>
                    {
                        // posts && posts.length > 0 ?
                        allPosts && allPosts.length > 0 ?


                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th className="hide-sm">Description</th>
                                        <th >Status</th>
                                        <th className="hide-sm">Time Added</th>
                                        <th className="hide-sm">Time Completed</th>
                                        <th >Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {/* {posts && posts.length > 0 && posts.map(post => ( */}
                                    {allPosts && allPosts.length > 0 && allPosts.map(post => (


                                        <tr key={post._id} className={post.completed ? "done" : ""}>
                                            <td>{post.title}</td>
                                            <td className="hide-sm">{post.description}</td>
                                            <td >{`${post.completed ? "done" : "pending"}`}</td>
                                            <td className="hide-sm">{new Date(post.date).toLocaleTimeString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', })}</td>
                                            <td className="hide-sm">  {post.completed ? new Date(post.updatedAt).toLocaleTimeString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', }) : ""}</td>
                                            <td className='post__btn'>
                                                <button className='btn btn-dark' onClick={() => handleChange(post._id)}><FiEdit2 /></button>
                                                <button className='btn btn-danger' onClick={() => deletePost(post._id)}><AiTwotoneDelete className="delete" /></button>

                                            </td>
                                            {/* <td>
                                 
                                </td> */}

                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                            :
                            <div className="placeholder">
                                <h3>Add a Note</h3>
                            </div>
                    }
                </List>


                <Footer>
                    {posts && posts.length > 0 && <>
                        <div className="total">

                            <p>I have <span>{posts.length}</span> items in my note</p>


                        </div>
                        <div className="status">
                            <div>
                                <p>Completed</p>
                                <span>{CompletedPosts.length}</span>

                            </div>

                            <div>
                                <p>Pending</p>
                                <span>{PendingPosts.length}</span>

                            </div>
                        </div>
                    </>
                    }
                </Footer>



            </Container>
        </>
    )
}