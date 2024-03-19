import React, { useReducer } from 'react';
import useLoginUser from '../../hooks/useLoginUser';
import { loginReducer } from '../../utils';


function LoginUser() {
    const [state, dispatch] = useReducer(loginReducer, { email: "", password: "" });
    const { loginResponse, handleLogin } = useLoginUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(state)
        await handleLogin(state)
        console.log(loginResponse)
        localStorage.setItem('userToken', JSON.stringify(loginResponse.data.token));
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