import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice"
import cartReducer from "./slice/cartSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'state',
    storage,
  }
  
const rootReducer = combineReducers({ 
    product: productReducer, 
    cart: cartReducer, 
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  

  const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
  })

  export default store
  export const persistor = persistStore(store)
// export default configureStore({
//     reducer:{
//         product: productReducer, 
//         cart: cartReducer, 
//     }
// })