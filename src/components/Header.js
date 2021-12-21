import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { selectUserName, selectUserPhoto, setUserLogin, setSignOut } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux';
import { auth, provider } from '../firebase'



function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
// to ensure users is still login even after refreshing the browser;
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                navigate('/')
            }
        })
    }, [])


    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            let user = result.user
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
            navigate('/')
        })
    }
    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(setSignOut());
            navigate.pushState('/login')
        })
    }
    return (
        <Nav>
            <Logo src='/images/logo.svg' />
            {
                !userName ? (
                    <LoginContainer>
                        <Login onClick={signIn}>Login</Login>
                    </LoginContainer>

                ) :
                    <>

                        <NavMenu>
                            <a>
                                <img src='/images/home-icon.svg' alt="" />
                                <span>HOME</span>
                            </a>
                            <a>
                                <img src='/images/search-icon.svg' alt="" />
                                <span>SEARCH</span>
                            </a>
                            <a>
                                <img src='/images/watchlist-icon.svg' alt="" />
                                <span>WATCHLIST</span>
                            </a>
                            <a>
                                <img src='/images/original-icon.svg' alt="" />
                                <span>ORIGINALS</span>
                            </a>
                            <a>
                                <img src='/images/movie-icon.svg' alt="" />
                                <span>MOVIES</span>
                            </a>
                            <a>
                                <img src='/images/series-icon.svg' alt="" />
                                <span>SERIES</span>
                            </a>
                        </NavMenu>
                        <UserImg onClick={signOut} src='/images/profile.jpg' />

                    </>

            }

        </Nav>
    )
}

export default Header



const Nav = styled.nav
    `
height:70px;
background:#090b13;
display:flex;
align-items:center;
padding:0 36px;
oveflow-x:hidden;


`

const Logo = styled.img
    `
width:80px;

`

const NavMenu = styled.div
    `
display:flex;
flex:1;
a{
    display:flex;
    align-items:center;
    padding:0 12px;
    margin-left:25px;
    cursor:pointer;
    align-items:center;
   
    img{
        width:12px;
    }
    span{
        font-size:13px;
        letter-spacing:1.42px;
        position:relative;

        &:after{
            content:"";
            height:2px;
            background:white;
            position:absolute;
            left:0;
            right:0;
            bottom:-6px;
            opacity:0;
            transition:all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
            transform:scaleX(0);
            
        }
    }

    &:hover{
        span:after{
            transform:scaleX(1);
            opacity:1;
        }
    }

}
`

const UserImg = styled.img
    `
width:48px;
height:48px;
border-radius:50%;
cursor:pointer;
`

const Login = styled.div`

border:1px solid #f9f9f9;
padding:8px 16px;
border-radius:4px;
letter-spacing:1.5px;
text-transform:uppercase;
background-color:rgba(0,0,0,0.6);
transistion:all 0.2s ease 0s;


&:hover{
    background-color:#f9f9f9;
    color:#000;
    border-color:transparent;
}

`
const LoginContainer = styled.div`
flex:1;
display:flex;
justify-content:flex-end;

`