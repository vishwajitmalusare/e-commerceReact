import { CART } from "./action.type"

export const updateCartList=(cartinfo)=>{
    return{
        type:CART.UPDATE_CART_INFO,
        payload:cartinfo
    }
}