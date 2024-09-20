import {configureStore} from "@reduxjs/toolkit";
import authSlice from './userData.js'

export const store = configureStore({
    reducer :{
        auth : authSlice,
    }
})
