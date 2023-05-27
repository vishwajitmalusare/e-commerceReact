import { PRODUCT } from "../action/action.type";

const initialState = {
    catId:'',
    price:'',
    description:'',
    productName:'',
    productList:[],
    productInfo:[]
}

const productReducer=(state = initialState, {type, payload}) => {

    switch(type) {
        
        case PRODUCT.UPDATE_PODUCT_NAME:
            return {...state, productName:payload}
        
        case PRODUCT.UPDATE_DESCRIPTION:
            return {...state, description:payload}
        
        case PRODUCT.UPDATE_PRICE:
            return {...state, price:payload}
        
        case PRODUCT.UPDATE_CATEGORY_ID:
            return {...state, catId:payload}
        
        case PRODUCT.UPDATE_PRODUCT_LIST:
            return {...state, productList:payload}
        
        case PRODUCT.UPDATE_PRODUCT_INFO:
            return {...state, productInfo:payload}

            default:
                return state
    }
}

export default productReducer;