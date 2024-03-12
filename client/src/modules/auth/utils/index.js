export const reducer = (state, action) => {
    switch (action.type) {
        case "FIRSTNAME":
            return { ...state, firstname: action.payload }
        case "LASTNAME":
            return { ...state, lastname: action.payload }
        case "EMAIL":
            return { ...state, email: action.payload }
        case "PASSWORD":
            return { ...state, password: action.payload }
        case "ADDRESS":
            return { ...state, address: action.payload }
        case "TELEPHONE":
            return { ...state, tel: action.payload }
        //  case "SUBMIT":
        //     return {...state, }
        default:
            return new Error("invalid input")
    }
};

export const loginReducer = (state, action) => {
    switch(action.type){
     case 'EMAIL' :
       return {...state, email: action.payload}
     case 'PASSWORD':
       return {...state, password: action.payload}
     default:
       throw new Error("invvalid input")
    }
   }