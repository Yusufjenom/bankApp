import React, { useReducer } from 'react';
import useLoginUser from '../../hooks/useLoginUser';
import { loginReducer } from '../../utils';
import {useNavigate} from 'react-router-dom'


function LoginUser() {
    const [state, dispatch] = useReducer(loginReducer, { email: "", password: "" });
    const { loginResponse, handleLogin } = useLoginUser();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(state)
        const response = await handleLogin(state)
        console.log(loginResponse)
        if(loginResponse.data.success){
            localStorage.setItem('userToken', JSON.stringify(loginResponse.data.token));
            console.log("hello world")
            navigate('/dashboard')
        }
        
        
    };
    
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" onChange={(e) => dispatch({ type: 'EMAIL', payload: e.target.value })} />
                <input type="password" onChange={(e) => dispatch({ type: 'PASSWORD', payload: e.target.value })} />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default LoginUser