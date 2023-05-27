import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import orderReducer from "./reducers/order.reducer";
import productReducer from "./reducers/product.reducer";
import searchReducer from "./reducers/search.reducer";
import categoryReducer from "./reducers/category.reducer";
import cartReducer from "./reducers/cart.reducer";
import logger from "redux-logger";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        order: orderReducer,
        product: productReducer,
        search: searchReducer,
        category: categoryReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

