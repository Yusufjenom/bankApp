import React from 'react';
import { useReducer } from 'react';
import useSignupUser from '../../hooks/useSignupUser';
import {useNavigate} from 'react-router-dom';
import { reducer } from '../../utils';
//firstname lastname email password address tel




function Signup() {
    const [state, dispatch] = useReducer(reducer, {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        address: "",
        tel: ""
    });
    const navigate = useNavigate();

  const { signUp, userResponse } = useSignupUser()

    const submitForm = async (e) => {
        e.preventDefault()
        const res = await signUp(state)
        console.log(res, "confirm");
        if(res.status === 201){
          navigate('/dashboard')
        }
    }
    
    return (
        <div style={{ width: "100vw" }}>
            <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: "column", gap: ".6rem", width: "50%" }}>
                <input type="text" placeholder='First Name'
                    onChange={(e) => dispatch({ type: "FIRSTNAME", payload: e.target.value })} />
                <br />
                <input type="text" placeholder='Last Name'
                    onChange={(e) => dispatch({ type: "LASTNAME", payload: e.target.value })} />
                <br />
                <input type="text" placeholder='Email'
                    onChange={(e) => dispatch({ type: "EMAIL", payload: e.target.value })} />
                <br />
                <input type="text" placeholder='Pasword'
                    onChange={(e) => dispatch({ type: "PASSWORD", payload: e.target.value })} />
                <br />
                <input type="text" placeholder='Address'
                    onChange={(e) => dispatch({ type: "ADDRESS", payload: e.target.value })} />
                <br />
                <input type="text" placeholder='Telephone Number'
                    onChange={(e) => dispatch({ type: "TELEPHONE", payload: e.target.value })} />
                <br />
                <input type="submit" value="SIGNUP" />
            </form>
            
        </div>
    )
}

export default Signup