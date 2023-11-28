import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "@/services/api";

const reducer = combineReducers({
    [api.reducerPath]: api.reducer,
});

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
