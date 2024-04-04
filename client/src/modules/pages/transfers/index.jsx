import React, { useReducer, useEffect, useState } from 'react';
import { getUserByAccount, transferFunds } from '../../auth/api';


const reducer = (state, action) => {
    switch (action.type) {
        case "ACCOUNT_NUM":
            return { ...state, accountNum: action.payload }
        case "AMOUNT":
            return { ...state, amount: action.payload }
        case "PIN":
            return { ...state, pin: action.payload }
        default:
            throw new Error("invalid input")
    }
}




function Transfers() {
    const [state, dispatch] = useReducer(reducer, { accountNum: "", amount: "", pin: "" });
    const [accountOwner, setAccountOwner] = useState("");
    const [accountOwner2, setAccountOwner2] = useState("");

    const handleSubmit = async () => {
       const res = await transferFunds(state)
       console.log(res)
    };

    useEffect(() => {
        const getUserDetailsFromAccountSubmitted = async () => {
            if (state.accountNum) {
                const user = await getUserByAccount({accountNum:state.accountNum})
                console.log(user)
                setAccountOwner(user.userDetails.firstname)
                setAccountOwner2(user.userDetails.lastname)
            }
        }
        getUserDetailsFromAccountSubmitted();
    }, [state.accountNum])
    //console.log(state.accountNum)
    console.log(accountOwner)
    console.log(accountOwner2)
    return (
        <div>
            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "3rem"
            }}>
                <h4>SEND MONEY</h4>
                <input type="text" placeholder='Enter Account Number' style={{ height: "3rem", width: "15rem" }}
                    onChange={(e) => dispatch({ type: "ACCOUNT_NUM", payload: e.target.value })}
                />
                   {accountOwner && accountOwner2 ? <p>{accountOwner} {accountOwner2}</p> : <p></p>} 
                <input type="text" placeholder='Enter Amount' style={{ height: "3rem", width: "15rem" }}
                    onChange={(e) => dispatch({ type: "AMOUNT", payload: e.target.value })}
                />

                <input type="text" placeholder='Enter Pin' style={{ height: "3rem", width: "15rem" }}
                    onChange={(e) => dispatch({ type: "PIN", payload: e.target.value })}
                />
                <input type="submit" value="SEND" style={{ height: "3rem", width: "15rem" }} />
            </form>
        </div>
    )
}

export default Transfers