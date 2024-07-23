import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postApi } from './services/client/post';

export const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([postApi.middleware]),
});

setupListeners(store.dispatch);
