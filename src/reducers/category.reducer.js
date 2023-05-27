import { CATEGORIES } from "../action/action.type"

const initialState = {
    categoryName:"",
    catId:"",
    catlist:[]
}

const categoryReducer=(state = initialState, {type, payload}) => {

    switch(type) {
        
        case CATEGORIES.UPDATE_CATEGORY_NAME:
            return {...state, categoryName:payload}

        case CATEGORIES.UPDATE_CATEGORY_ID:
                return {...state, catId:payload}
        
        case CATEGORIES.UPDATE_CATEGORY_INFO:
            return {...state, catlist:payload}

            default:
                return state
    }
}

export default categoryReducer;