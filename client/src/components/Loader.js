import styled, { keyframes } from "styled-components"

const Container = styled.div`
width: 100%;
background: ${props => props.theme.body};
display: flex;
justify-content: center;
align-items: center;
position: absolute;
top: 0;
left:0;
right: 0;
bottom: 0;
z-index:10;


`

const music = keyframes`
from{
    height: 10px;
}
to{
    height: 100%
}

`

const Bars = styled.div`
display: flex;
justify-content: center;
align-items: flex-end;
// border: 2px solid green;
overflow: hidden;
width: 100px;
height: 50px;
margin: 0 auto;
z-index: 2;
position: relative;



`

const Bar = styled.div`
width: 10px;
height: 5px;
margin: 0 2px;
background:  ${props => props.theme.text}; ;
animation-name: ${music};
animation-duration: 400ms;
animation-play-state: running;
animation-direction: alternate;
animation-timing-function: linear;
animation-iteration-count: infinite;
animation-delay: ${props => props.delay || '0ms'}; 


`

function Loader(props) {
    const {height} = props
    return <Container height={height}>
        <Bars>
            <Bar delay="250ms"/>
            <Bar delay="715ms"/>
            <Bar delay="475ms"/>
            <Bar delay="25ms"/>
            <Bar delay="190ms"/>

        </Bars>

    </Container>
}

export default Loader