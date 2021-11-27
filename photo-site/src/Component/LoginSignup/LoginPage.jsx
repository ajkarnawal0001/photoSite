import React, { useEffect } from 'react'
import styled from 'styled-components'
import { GetData } from '../Utils/LocalStorage'
import { Form } from './Form'
import { SignUp } from './SignUp'

export const LoginPage = ({show,handleSign}) => {
    useEffect(() => {
        let key = GetData("key")
        console.log(key);
        if(!key){
            setTimeout(()=>{
                handleSign(true)
            },5000)
        }else{
            handleSign(false)
        }
    }, [])
    // Login Form
    

    return (
        <>
        {(show && (
            <div>
            <SignUp handleSign={handleSign}/>
            {/* <button onClick={()=>(handleSign(false))}>sojao 3 baje</button> */}
            </div>
        )
        )}
        </>
    )
}

const Heading = styled.div`
    font-size:50px;
    border:5px solid black;
`

