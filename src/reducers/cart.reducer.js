import { CART } from "../action/action.type"

const initialState ={
    cartlist:[]
}

const cartReducer=(state = initialState, {type, payload}) => {
    
    switch(type) {

        case CART.UPDATE_CART_INFO:
            return {...state, cartlist:payload }

        default:
            return state
    }
}

export default cartReducer