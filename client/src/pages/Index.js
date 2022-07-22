import styled from "styled-components"
import note from '../assets/note.jpg'

const Container = styled.div`
position: absolute;
top:0;
width: 100%;
height: 100vh;
// border: 2px solid red;
background-image: url(${note});
background-position: center ;
background-size: cover;
background-repeat: no-repeat;
overflow: hidden;


`

const Text = styled.h1`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50% , -50%);
font-size: 5rem;
color: ${({theme}) => theme.text};


`

export default function Index(){
    return (
        <Container style>
            <Text>Notes</Text>
        </Container>
    )
}