import React, { useReducer, useState } from 'react';
import useLoginUser from '../../hooks/useLoginUser';
import { loginReducer } from '../../utils';
import {useNavigate} from 'react-router-dom'


function LoginUser() {
    const [state, dispatch] = useReducer(loginReducer, { email: "", password: "" });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { loginResponse, handleLogin } = useLoginUser();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(state)
        const response = await handleLogin(state)
        console.log(loginResponse)
        if(loginResponse.data.success){
            localStorage.setItem('userToken', JSON.stringify(loginResponse.data.token));
            navigate('/dashboard')
        }else{
            setEmailError(loginResponse?.data.error.email);
            setPasswordError(loginResponse?.data.error.password);
        }
        
        
    };
    console.log(emailError);
    console.log(passwordError);
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:".5rem", width:"100vw", justifyContent:"center", alignItems:"center"}}>
                <input type="email" onChange={(e) => dispatch({ type: 'EMAIL', payload: e.target.value })} style={{width:"35%"}} />
                <input type="password" onChange={(e) => dispatch({ type: 'PASSWORD', payload: e.target.value })} style={{width:"35%"}}/>
                <p style={{color:"red"}}>{passwordError}</p>
                <p style={{color:"red"}}>{emailError}</p>
                {/* <input type="submit" value="Login" style={{width:"35%"}}/> */}
                <button style={{width:"35%"}}>Login</button>
            </form>
        </div>
    )
}

export default LoginUser