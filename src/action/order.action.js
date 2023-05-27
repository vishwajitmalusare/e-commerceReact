import { ORDER } from "./action.type"

export const updateUsername=(username)=>{
    return{
        type:ORDER.UPDATE_NAME,
        payload:username
    }
}

export const updateOrderEmail=(email)=>{
    return{
        type:ORDER.UPDATE_EMAIL,
        payload:email
    }
}

export const updateOrderMobile=(mobile)=>{
    return{
        type:ORDER.UPDATE_MOBILE,
        payload:mobile
    }
}

export const updateOrderAddress=(address)=>{
    return{
        type:ORDER.UPDATE_ADRESS,
        payload:address
    }
}

export const updateOrderItems = (orderitem) => {
    return{
        type:ORDER.UPDATE_ORDER_ITEMS,
        payload:orderitem
    }
}


export const updateOrderInfo = (orderlist) => {
    return{
        type:ORDER.UPDATE_ORDER_INFO,
        payload:orderlist
    }
}
