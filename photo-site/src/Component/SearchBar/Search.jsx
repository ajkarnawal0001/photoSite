import React, { useState } from "react";
import styled from "styled-components";
import {Button} from '@material-ui/core'
export const Search = ({ handleSearch ,handleLogout}) => {
  let [timer, setTimer] = useState(undefined);

  // debouncing for search bar using callback handleSearch function
  const handleChange = (e) => {
    const { value } = e.target;
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        handleSearch(value);
      }, 500)
    );
  };

// logout by callback function handleLogout put true
  const handleLogoutClick = ()=>{
    handleLogout(true)
  }
  return (
    <>
      <Container>
        <div className="inputBox">

        <input
          placeholder="Type here you like...!"
          type="text"
          onChange={handleChange}
          />
        <I className="fa fa-search"></I>
          </div>
        <ButtonBox>
        <Button onClick={handleLogoutClick} variant="contained" color="primary">Logout</Button>
        </ButtonBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & input[type="text"] {
    position: relative;
    padding: 15px 40px 15px 20px;
    width: 170px;
    color: #525252;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 2px;
    border: none;
    border-radius: 5px;
    background: linear-gradient(to right, #ffffff 0%, #464747 #f9f9f9 100%);
    transition: width 0.4s ease;
    outline: none;

    &:focus {
      width: 300px;
    }
  }
  & .inputBox{
    /* border:2px solid red; */
    width:55%;
    align-items:right;
    text-align:right;
  }
`;

const I = styled.i`
  color: #050407;
  font-size: 30px;
  font-weight: bold;
  margin:1rem 2rem;
`;

const ButtonBox = styled.div`
  align-items:right;
  text-align:right;
  /* border:1px solid black; */
  /* width:50%; */
  margin-left:30%
`