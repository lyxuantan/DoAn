import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import categorySlice from "./redux/categorySlice";
import userSlice from "./redux/userSlice";
import cartSlice from "./redux/cartSlice";

const persistConfig = {
    key: 'category',
    storage
};
const reducers = combineReducers({
    categorySlice: categorySlice,
    cartSlice: cartSlice,
    userSlice: persistReducer(persistConfig, userSlice),
});

const store = configureStore({
    reducer: reducers,
})

const customPersistStore = persistStore(store)

export  {store, customPersistStore};