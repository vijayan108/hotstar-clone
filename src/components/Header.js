import React, { useEffect } from 'react'
import styled from 'styled-components';
import {useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState} from '../features/userSlice';
import { auth , provider  } from '../firebase'
import { signInWithPopup} from 'firebase/auth'


export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
              setUser(user);   
              navigate("/home");
                
                
            }
        })
    }, [userName]);

    const handleAuth = () => {
        if (!userName) {
          signInWithPopup(auth,provider).then((result) => {
            setUser(result.user);
        }).catch((error) => {
            alert(error.message);
        })
        } else if (userName) {
            auth.signOut().then(() => {
                dispatch(setSignOutState());
                navigate('/');
            }).catch((err) => alert(err.message));
        }
    }

    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        }))

    }

  return (
    <Nav>
      <Logo src="/images/logo.svg" alt="" />
      {!userName ? (
        <Login onClick={handleAuth}>LOGIN</Login>
      ) : (
        <>
      
        <NavMenu>
          <a href="/home">
            <img src="/images/home-icon.svg" alt="" />
            <span>HOME</span>
          </a>
          <a href="/search">
            <img src="/images/search-icon.svg" alt="" />
            <span>SEARCH</span>
          </a>
          <a href="/watchlist">
            <img src="/images/watchlist-icon.svg" alt="" />
            <span>WATCHLIST</span>
          </a>
          <a href="/originals">
            <img src="/images/original-icon.svg" alt="" />
            <span>ORIGINALS</span>
          </a>
          <a href="/movies">
            <img src="/images/movie-icon.svg" alt="" />
            <span>MOVIES</span>
          </a>
          <a href="/series">
            <img src="/images/series-icon.svg" alt="" />
            <span>SERIES</span>
          </a>
        </NavMenu>
        <SignOut>
        <UserImg src={userPhoto} alt={userName} />
        <DropDown>
          <span onClick={handleAuth}>Sign out</span>
        </DropDown>
      </SignOut>
        </>
      )}
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.img`
    width: 80px;
    `;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    img {
      height: 25px;
      width: 25px;
      padding-right: 5px;
      padding-bottom: 5px;
    }
    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;
      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
    
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;
    
const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;
    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;

    opacity: 0;
    &:hover {
        opacity: 1;
        background-color: #f9f9f9;
        color: #000;
    }
    `;

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    ${UserImg} {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
    `;

