import styled from "styled-components"
import {Link} from 'react-router-dom'
import Error from '../assets/404.jpg'

const Container = styled.div`
position: absolute;
top:0;
width: 100%;
height: 100vh;
background-image: url(${Error});
background-position: center ;
background-size: contain;
background-repeat: no-repeat;
overflow: hidden;




`

const Back = styled(Link)`
position: absolute;
top:20%;
left: 10%;
text-transform: uppercase;
text-decoration: none;
color: ${({theme}) => theme.main};
width: 5rem;
height:5rem;
display: flex;
align-items:center;
justify-content: center;
border: .5px solid ${({theme}) => theme.body};
border-radius: 100%;
box-shadow: 3px 3px 3px ${({theme}) => theme.body};



`

export default function NotFound() {
    return (
        <Container>
            <Back to="/">
                go back
            </Back>
        </Container>
    )

}