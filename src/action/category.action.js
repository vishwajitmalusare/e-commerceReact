import { getAllCategories } from "../services/services"
import { CATEGORIES } from "./action.type"

export const updateCategoryName=(categoryName)=>{
    return{
        type:CATEGORIES.UPDATE_CATEGORY_NAME,
        payload:categoryName
    }
}

export const updateCategoryId = (catId) => {
    return{
        type:CATEGORIES.UPDATE_CATEGORY_ID,
        payload:catId
    }
}
export const updateCategoryInfo=(catlist)=>{
    return{
        type:CATEGORIES.UPDATE_CATEGORY_INFO,
        payload:catlist
    }
}

export const getCategory = () => {
    return async(dispatch,getState) => {
        dispatch({type:CATEGORIES.GET_CATEGORY_REQ})
        const res = await getAllCategories()
        if(res.status == 200){
            dispatch({type:CATEGORIES.GET_CATEGORY_SUCCESS,payload:res})
        } else {
            dispatch({type:CATEGORIES.GET_CATEGORY_FAILURE})
        }
    }
}
