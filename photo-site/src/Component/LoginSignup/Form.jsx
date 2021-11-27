import React, { useState } from 'react'
import { GetData, SetData } from '../Utils/LocalStorage';

export const Form = () => {
    const [password,setPassword] = useState("")
    const [name, setName] = useState("");

    const handleSignIn=(e)=>{
        e.preventDefault()
        const payload = {
            name,
            password
        }
        let data = GetData("signupData")
        if(data.name===name&&data.password===password){
            SetData("key","123")
        }
    }
    return (
      <form>
        <label>Enter your name:
          <input
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>Enter your name:
          <input
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleSignIn}>signUp</button>
      </form>
    )
  }
