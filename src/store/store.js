import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
import userApi from './services/userService';
import recipeApi from './services/recipeService';
export const store = configureStore({
    reducer: {
        'user':userSlice,
        [userApi.reducerPath]: userApi.reducer,
        [recipeApi.reducerPath]: recipeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, recipeApi.middleware),
    devTools : false,
    
            
})