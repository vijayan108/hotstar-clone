import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../features/userSlice";
import movieReducer from "../features/movie/movieSlice";


const store = configureStore({
    
        reducer: {
        // add your reducers here
        user: userReducer,
        movie: movieReducer,
        },
        middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    })
        })
    ;

    export default store;