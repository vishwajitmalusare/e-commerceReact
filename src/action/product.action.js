import { PRODUCT, SEARCH_BAR } from "./action.type"

export const updateProductName=(productName)=>{
    return{
        type:PRODUCT.UPDATE_PODUCT_NAME,
        payload:productName
    }
}

export const updateDescription=(description)=>{
    return{
        type:PRODUCT.UPDATE_DESCRIPTION,
        payload:description
    }
}

export const updatePrice=(price)=>{
    return{
        type:PRODUCT.UPDATE_PRICE,
        payload:price
    }
}

export const updateProCategoryId=(catId)=>{
    return{
        type:PRODUCT.UPDATE_CATEGORY_ID,
        payload:catId
    }
}

export const updateProductList=(productList) => {
    return{
        type:PRODUCT.UPDATE_PRODUCT_LIST,
        payload:productList
    }
}

export const updateProductInfo=(productInfo) => {
    return{
        type:PRODUCT.UPDATE_PRODUCT_INFO,
        payload:productInfo
    }
}

export const updateSearchQuery = (searchquery) => {
    return{
        type:SEARCH_BAR.UPDATE_SEARCH_QUERY,
        payload:searchquery
    }
}