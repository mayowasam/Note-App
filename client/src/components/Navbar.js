import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Logo, Moon, Sun, useStateVal } from "../import"
import { motion } from 'framer-motion'
import image from '../assets/user.png'
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../endpoints"
import { useLazyQuery } from "@apollo/client"
import {  Loader,  removeUser, removeAllPost, removeAuth } from "../import";

const NavContainer = styled.nav`
position: fixed;
padding: .5rem 2rem;
top:0;
width: 100%;
background: ${({ theme }) => theme.body};
color: ${({ theme }) => theme.text};
z-index:5;

@media (max-width: 700px){
    padding: 1rem 0.5rem;
}


`
const Nav = styled.ul`
display: flex;
align-items: center;
padding:0;
margin:0;
list-style-type: none;
gap: 1rem;

    .logo{
        display: flex;
        align-items: center;
        gap: .5rem;
    }

    &>:nth-child(2){
        margin-left: auto;
    }

    .logout{
        padding: .5rem;
    }


    @media (max-width: 700px){}


`

const DropDown = styled.button`

    font-size: 1rem;    
    border: none;
    outline: none;
    padding: .5rem 1rem;
    font-family: inherit;
    margin: 0;
    background:${({ theme }) => theme.body};
    color:${({ theme }) => theme.text};
    // border: .5px solid  ${({ theme }) => theme.text};
    display:flex;
    flex-direction:column;
    align-items: center;
    position:relative;
    cursor: pointer;

    .name{
        display:flex;
        align-items: center;
        gap: .5rem;

    }

    


    .dropdown__content{
    
        display: none;
        position: absolute;
        top:100%;
        background:${({ theme }) => theme.body};
        width: 12rem;
        padding: .5rem 1rem;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        
         a{
            float: none;
            color:${({ theme }) => theme.text};
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            text-align: center;
            // border: 2px solid red;
          }
        }

    }


    &:hover{ 
        .dropdown__content {
            display: block;
        }
    } 

    @media (max-width: 700px){
        .name{
            font-size: .8rem;
    
        }
    }

`

export const NavList = styled(motion.li)`
cursor: pointer;
text-transform: uppercase;
font-size: .8rem;
a{
    text-decoration: none;
    color:${({ theme }) => theme.text};
    font-size: .8rem;
}

.active{
    border-bottom: 2px solid ${({ theme }) => theme.main};;
}

`

const Avatar = styled.div`
width: 2.5rem;
height:2.5rem;

@media (max-width: 700px){
    width: 2rem;
    height:2rem;
    border: none;
}

img{
    width:100%;
    height:100%;
    object-fit: cover;
    border-radius: 100%;
}



`


// const Hamburger = styled.div`
// width: 1.5rem;
// height: 1.5rem;
// display: flex;
// flex-direction: column;
// justify-content: center;
// gap: .2rem;

// .line{
//     width: 100%;
//     height: 3px;
//     background:${({ theme }) => theme.text};

// }




// `


// &>:last-child{}


export default function Navbar() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const { Toggle, theme } = useStateVal()

    const { user } = useSelector(state => state.user)
    const { isAuthenticated } = useSelector(state => state.auth)

    const [logout, { loading, error, data }] = useLazyQuery(LOGOUT,{
        onCompleted(data){
            if(data){
                this.client.clearStore().then(() =>{
                    dispatch(removeUser()) 
                    dispatch(removeAllPost())
                    dispatch(removeAuth())
                    navigate("/")

                })
                // window.location.assign('/')
            }
        }
    })


    // if (error) console.log({ error });
    // if (data) console.log({ data });

    // if (error) alert(error.message) ;

// console.log({user});

    return <>
            {loading && <Loader />}
        <NavContainer>
            <Nav>
                <div className="logo">
                    <NavList
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: .9 }}>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "active" : undefined}>
                            <Logo fill="#FEAD01" />
                        </NavLink>
                    </NavList>
                </div>



                {!isAuthenticated && <NavList
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: .9 }} >
                    <NavLink to="register"
                        className={({ isActive }) => isActive ? "active" : undefined}>
                        register
                    </NavLink>
                </NavList>}


                {isAuthenticated && <NavList
                    className="home"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: .9 }} >
                    <NavLink to="home"
                        className={({ isActive }) => isActive ? "active" : undefined}>
                        Home
                    </NavLink>
                </NavList>}








                {isAuthenticated && <DropDown>
                    <div className="name">
                        <span>{user?.fullName?.split(" ")[0]}</span>

                        <Avatar>
                            <img src={user.avatar ? user.avatar : image} alt="avatar" />

                        </Avatar>

                    </div>
                    <div className="dropdown__content">
                        {user && <NavList
                            className="dropdown__chat"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: .9 }} >
                            <NavLink to="home"
                                className={({ isActive }) => isActive ? "active" : undefined}>
                                Home
                            </NavLink>
                        </NavList>}

                        {user && <NavList
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: .9 }} >
                            <NavLink to="about"
                                className={({ isActive }) => isActive ? "active" : undefined}>
                                about
                            </NavLink>
                        </NavList>}

                        {user && <NavList
                            className="logout"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: .9 }}
                            onClick={() => logout()}
                        >
                            logout
                        </NavList>}



                    </div>

                </DropDown>


                }

                <NavList className="toggle"
                    onClick={Toggle}>
                    {theme === "dark" ?
                        <Moon width="30" height="30" fill="currentColor" style={{ padding: 0 }} />
                        :
                        <Sun style={{ padding: 0 }} width="30" height="30" fill="currentColor" />}
                </NavList>



            </Nav>
        </NavContainer>
    </>
}