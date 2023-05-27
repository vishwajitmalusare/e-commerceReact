import { ORDER } from "../action/action.type"

const initialState = {
    name:'',
    email:'',
    mobile:'',
    address:'',
    orderitem:[],
    orderlist:[]
}

const orderReducer=(state = initialState, {type,payload}) => {

    switch(type) {
        
        case ORDER.UPDATE_NAME:
            return {...state, name:payload}

        case ORDER.UPDATE_EMAIL:
            return{...state, email:payload}
        
        case ORDER.UPDATE_MOBILE:
            return{...state, mobile:payload}

        case ORDER.UPDATE_ADRESS:
            return{...state, address:payload}

        case ORDER.UPDATE_ORDER_ITEMS:
            return{...state, orderitem:payload}
        
        case ORDER.UPDATE_ORDER_INFO:
            return{...state, orderlist:payload}
        
            default:
            return state;
    }
}

export default orderReducer