import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import db from '../firebase'



function Detail() {
    const { id } = useParams();
    const [movie,setMovie] = useState()
    useEffect(() => {
        db.collection('movies').doc(id).get.then((doc) => {
            if(doc.exists){
                setMovie(doc.data());
            }
        })
    }, [])
    return (
        <Container>
            {movie && (
                <>
               <Background>
                <img src={movie.backgroundImg}  />
            </Background>
            <ImageTitle>
                <img src={movie.titleImg}  />
            </ImageTitle>
            <Controls>
                <PlayButton>
                    <img src="/images/play-icon-black.png"  />
                    <span>Play</span>

                </PlayButton>

                <TrailerButton><img src="/images/play-icon-white.png"  />
                    <span>Trailer</span>

                </TrailerButton>
                <AddButton>
                    <span>+</span>
                </AddButton>
                <GroupWatch>
                    <img src="images/group-icon.png"  />
                </GroupWatch>

            </Controls>
            <SubTitle>
                {movie.SubTitle}
    </SubTitle>
            <Description>
               {movie.description}
    </Description> 
                
                
                </>
            )}
            
        </Container>
    )
}

export default Detail


const Container = styled.div`
min-height = calc(100vh - 70px);
padding : calc(3.5vw + 5px);
position:relative;


`

const Background = styled.div`
position:fixed;
top:0;
left:0;
bottom:0;
right:0;
z-index:-1;
opacity:0.8;


img{
    width:100%;
    height:100%;
    object-fit:cover;

}


`

const ImageTitle = styled.div`
height:30vh;
width:35vw;
min-height:170px;
min-width:200px;
margin-top:40px;

img{
    width:100%;
    height:100%;
    object-fit:contain;
}

`

const Controls = styled.div`
display:flex;
align-items:center;
margin-top:30px;


`

const PlayButton = styled.button`
border-radius:4px;
fonnt-size:15px;
display:flex;
align-items:center;
height:56px;
background-color:rgb(249,249,249);
border:none;
padding:0px 24px;
margin-right:22px;
letter-spacing:1.8px;
cursor:pointer;
text-transform:uppercase;
&:hover{
    background:rgb(190,190,190);
}
`

const TrailerButton = styled(PlayButton)`
background:rgba(0,0,0,0.3);
border:1px solid rgb(249,249,249);
color:rgb(249,249,249);


`

const AddButton = styled.button`
width:44px;
height:44px;
display:flex;
align-items:center;
justify-content:center;
border-radius:50%;
background:rgba(0,0,0,0.6);
border:2px solid white;
cursor:pointer;
margin-right:16px;

span{
    font-size:30px;
color:white;
}

`

const GroupWatch = styled(AddButton)`
background:rgb(0,0,0);
`

const SubTitle = styled.div`
color:rgb(249,249,249);
font-size:15px;
min-height:20px;
margin-top:26px;

`
const Description = styled.div`
line-height:1.4;
font-size:16px;
margin-top:16px;
color:rgb(249,249,249);
max-width:760px;


`