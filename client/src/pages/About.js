import { useMemo, useRef, useState } from "react"
import {useNavigate} from 'react-router-dom'
import styled from "styled-components"
import { Loader,  removeUser, removeAllPost, removeAuth  } from '../import'
import avatar from '../assets/user.png'
import { useSelector, useDispatch} from "react-redux"
import { useMutation } from "@apollo/client"
import { GETUSERBYTOKEN, UPDATEUSER, DELETEUSER } from "../endpoints"
// import { FiEdit2 } from 'react-icons/fi'
import  {useApolloClient} from '@apollo/client'


const Container = styled.div`
width: 100%;
height:100vh;
background: ${({ theme }) => theme.body};
display: flex;

@media(max-width: 700px){
    padding-top: 6rem;
    flex-direction: column;
    overflow: auto;

}

`

const Box = styled.div`
width: 50%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
// border: 2px solid red;

@media(max-width: 700px){
    width: 100%;

}


.main{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

  

    .image{
        width: 15rem;
        height: 15rem;
    
    
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }


        @media(max-width: 700px){
            width: 10rem;
            height: 10rem; 
        
        }
    }




    .name{
        // border: 2px solid red;
        display: flex;
        justify-content: space-between;



        h1{
            text-transform: capitalize;
            color: ${({ theme }) => theme.grey};
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            gap: .5rem;
    

            span{
                font-size: 1rem;
                text-transform: uppercase;
                color: ${({ theme }) => theme.text};

                @media(max-width: 700px){
                    font-size: .6rem;
        
                }
        
            }

            @media(max-width: 700px){
                align-items: center;    
                font-size: .8rem;
    
            }
        

        }

        .icon{
            color: ${({ theme }) => theme.grey};
            cursor: pointer;
 
        }
    }

    button{
        color: ${({ theme }) => theme.text};
        padding: 1rem 2rem;
        background: red;
        font-weight: bold;
        cursor: pointer;
        text-transform:uppercase;
        border: 0.1rem solid  ${({ theme }) => theme.body};
        border-radius: .4rem;
        font-size:1rem; 
        outline: none;
        transition: .4s ease-in-out;

        &:hover{
            color: ${({ theme }) => theme.body};
            background: ${({ theme }) => theme.text};
           
    
        }
    }

    @media(max-width: 700px){
        align-items: center; 
        border: 1px solid ${({ theme }) => theme.grey};
        z-index: 3;
        padding: 1rem;
   
    }
}





form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    border-radius: 2rem;
    background: ${({ theme }) => theme.block};
    padding: 3rem 5rem;



    input{
        background: transparent;
        padding: 1rem;
        border: 0.1rem solid  ${({ theme }) => theme.text};
        border-radius: .4rem;
        color: white;
        width:100%;
        font-size:1rem; 

    }

    button{
        color: ${({ theme }) => theme.body};
        padding: 1rem 2rem;
        background: ${({ theme }) => theme.text};
        font-weight: bold;
        cursor: pointer;
        text-transform:uppercase;
        border: 0.1rem solid  ${({ theme }) => theme.body};
        border-radius: .4rem;
        font-size:1rem; 
        outline: none;
        transition: .4s ease-in-out;
        &:hover{
            color: ${({ theme }) => theme.main};
           
    
        }
    }

    .upload{
        height:12rem;
        width:12rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding:.3rem;
        border: 0.4rem solid white;
        margin: 0 auto;
        background: white;
        overflow:hidden;
        
        img{
            width:100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            border: 0.1rem solid transparent;
            padding:.1rem;

        }
    }


    .title{
        display: flex;
        align-items:center;
        justify-content: center;
        color: ${({ theme }) => theme.regular};
        h1{
            text-transform: capitalize;
            color: ${({ theme }) => theme.text};
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            gap: .5rem;
        }

    }
    
}

    

`


export default function About() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const client = useApolloClient()

    const { user } = useSelector(state => state.user)
    const [fullName, setFullName] = useState(user.fullName)
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    // const Toggle  = () => setShow(!show)

    //update user
    const [updateProfile, { loading, error, data }] = useMutation(UPDATEUSER, {
        onCompleted({ updateUser }) {
            // console.log(updateUser);
            if (updateUser) {
                setImage("")
                inputRef.current.value = ""
                setPreview("")
            }
        },
        onError(error) {
            alert(error.message)
        },
        refetchQueries: [{ query: GETUSERBYTOKEN }]
    })

    //delete Account
    const [deleteProfile, {loading: deletionLoading, error: deletionError, data: deletionData}] = useMutation(DELETEUSER, {
        onCompleted(data) {
            if (data) {
                console.log(data);
                // client.cache.evict()
                // client.cache.gc()
                client.clearStore().then(() =>{
                    dispatch(removeUser()) 
                    dispatch(removeAllPost())
                    dispatch(removeAuth())
                    navigate("/")

                })
            }
        },
        onError(error) {
            alert(error.message)
        }
    })

    let inputRef = useRef()


    //image preview
    useMemo(() => {
        if (!image) return
        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)

    }, [image])



    const handleSubmit = (e) => {
        e.preventDefault()
        if (!image) {
            alert("image not picked")
            return;
        }
        // console.log(image);
        updateProfile({
            variables: {
                updateUserId: user._id,
                updateUserContent2: {
                    file: image,
                    fullName
                }
            }
        })

    }
    const handleChange = e => {
        setImage(e.target.files[0])
    }

    const deleteuser = () => {
        let value = window.confirm("Are you sure you want to delete your account?. This process is irreversible")
        if (value) {
            deleteProfile({
                variables:{
                    deleteUserId2: user._id
                }
            })
        }
    }

    // if (error) alert(error.message) ;

    return <Container>
        {(loading || deletionLoading) && <Loader />}

        <Box>
            <div className="main">
                <div className="image">
                    <img src={user.avatar ? user.avatar : avatar} alt="avatar" />
                </div>
                <div className="name">
                    <h1>name <span>{user.fullName} </span></h1>
                    {/* <FiEdit2 className="icon" onClick={Toggle}/> */}

                </div>

                <div className="name">
                    <h1>status <span>available</span> </h1>

                </div>
                <div className="name">
                    <h1>email <span>{user?.email}</span> </h1>
                </div>

                <button onClick={deleteuser}>Delete Account</button>

            </div>

        </Box>
        <Box>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="title">
                    <h1>Upload an avatar</h1>
                </div>
                {/* {show && <input type="text" placeholder="fullName" value={fullName} onChange={e => setFullName(e.target.value)}/> } */}
                <input ref={inputRef} type="file" name="avatar" placeholder="avatar" onChange={e => handleChange(e)} />
                {preview && <div className="upload">
                    <img src={preview} alt="avatar" />
                </div>
                }
                <button>Upload</button>


            </form>

        </Box>



    </Container>
}