import { useMutation } from "@apollo/client"
import { useDispatch } from "react-redux"
import styled, { keyframes } from "styled-components"
import { ADDPOST, GETUSERBYTOKEN, UPDATEPOST} from '../endpoints'
import { addPost , updatePost} from "../import"
import {Loader, useStateVal} from "../import"

const animate = keyframes`
    from {
        width: 0%;
        height: 0%;

    }
  
    to {
    width: 50%;
    height: 70%;

    }

`

const Container = styled.div`
display: ${props => props.modal ? "block" : "none"};
position: fixed;
z-index: 50;
padding: 2rem;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
width: 50%;
height: 70%;
overflow: auto;
background-color: ${({ theme }) => theme.body};
color: ${({ theme }) => theme.text};
animation: ${animate} 0.6s;

form{
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    gap:2rem;

    .header{
        text-align: center;
        font-size: .8rem;
    }

    .container{
        display: flex;
        flex-direction: column;
        gap: 1rem;

        label{
            font-size: .8rem;
 
        }

        input::placeholder{
            font-size: .8rem;
            padding: 0.5rem 1rem;
 
        }
    }

    .completed{
        width: unset;
    }

    .submit{

    }
}


  .close {
    position: absolute;
    right: 25px;
    top: 10px;
    color: ${({ theme }) => theme.text};
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    border: none;
    font-size: 26px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;

  }

  
  @media (max-width: 700px){
      width: 80%;

    form{
        gap:1rem;
        .subbmit{
            
        }

    }
  }

`



export default function AddNote({ modal,setModal, ToggleForm }) {
    const { edit,setEdit, post, setPost, initialState, postId} = useStateVal()
    const { title, description, completed, date } = post

    const [addNote, { loading, error, data }] = useMutation(ADDPOST,{
        onCompleted({addPost:post}){
            if(post){
                dispatch(addPost(post.post))
                setPost(initialState)
                setModal(false)
            }

        },
        onError(error){
            alert(error.message)
        },
        update(cache,  {data:{addPost}} ) { //the repsonse of deleteNote = data.deletePost
            const { getUserByToken } = cache.readQuery({ query: GETUSERBYTOKEN }) //read the already cached response of GETUSERBYTOKEN = data.getUserByToken
            console.log({ getUserByToken });

            cache.writeQuery({//write and update the cached response of GETUSERBYTOKEN with the result of the filter
                query: GETUSERBYTOKEN,
                 data: {getUserByToken: {...getUserByToken.user.post, addPost}}
            })
        }
    })

    const [updateNote, { loading:updateLoading, error: updateError, data: updateData }] = useMutation(UPDATEPOST,{
        onCompleted({updatePost:post}){
            // console.log({post});
            if({post}){
                setEdit(false)
                setModal(false)
                setPost(initialState)
                dispatch(updatePost(post.post))
            }

        },
        onError(error){
            alert(error.message)
        },
        refetchQueries:[{query: GETUSERBYTOKEN}]

    })

    let dispatch = useDispatch()



    const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
            setPost({ ...post, [e.target.name]: e.target.checked })

        } else {
            setPost({ ...post, [e.target.name]: e.target.value })

        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(edit){
            console.log({postId});
            updateNote({
                variables:{
                    updatePostId: postId,
                    updatePostContent2: post
                }
            })
        }else{
            addNote({
                variables: {
                    addPostContent2: post
                }
            })

        }

    }

    // if (error) console.log({ error });
    // if(updateError) console.log({updateError});
    // if (data) console.log({ data });
    // if (updateData) console.log({ updateData });

    // if (error) alert(error.message) ;
    // if (updateError) alert(updateError.message) ;


  

    return (
        <>
            {(loading || updateLoading )&& <Loader />}
            <Container modal={modal}>

                <button className="close" onClick={ToggleForm}>&times;</button>

                <form onSubmit={handleSubmit}>
                    <div className="header">
                        <h3>Add Post</h3>
                    </div>

                    <div className="container">

                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            placeholder="title"
                            onChange={e => handleChange(e)} />

                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={description}
                            placeholder="Describe what needs to be done"
                            onChange={e => handleChange(e)} />

                        <label htmlFor="completed">
                            <input
                                className="completed"
                                type="checkbox"
                                name="completed"
                                value={completed}
                                checked={completed}
                                onChange={e => handleChange(e)} />
                            Completed
                        </label>

                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={date}
                            onChange={e => handleChange(e)} />
                    </div>

                    <div className="submit">
                        <button className="btn btn-dark">{edit ? "Update Post" : "Add Post"}</button>
                    </div>



                </form>
            </Container>
        </>

    )

}