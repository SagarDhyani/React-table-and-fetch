import {configureStore} from "@reduxjs/toolkit"
import usersReducer from "./userSlice"


const store = configureStore({

    reducer: usersReducer

   
})

export default store