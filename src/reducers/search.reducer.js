import { SEARCH_BAR } from "../action/action.type";

const initialState = {
    searchquery:""
}

const searchReducer =(state = initialState, {type, payload}) => {
    switch (type) {
        case SEARCH_BAR.UPDATE_SEARCH_QUERY:
            return {...state, searchquery:payload};

        default:
            return state;
    }
}

export default searchReducer;