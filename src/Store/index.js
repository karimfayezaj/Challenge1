

import { createSlice, configureStore } from '@reduxjs/toolkit';

const authInitialState = { isAuth: false, token: "", errorMessage: "" };
const articlesInitialState = { numberOfArticles: 0, listArticles: [] };

const authSlice = createSlice({
    name: 'authenticated',
    initialState: authInitialState,
    reducers: {
        logInUser(state, action) {
            state.isAuth = true;
            state.token = action.payload;
        },
        logOutUser(state) {
            state.isAuth = false;
        },
        loginFailed(state, action) {
            state.errorMessage = action.payload;
        }
    }
})


const articleSlice = createSlice({
    name: "articles",
    initialState: articlesInitialState,
    reducers: {
        loadNewArticles(state) {

        }
    }
})



const store = configureStore({ reducer: { auth: authSlice.reducer, articles: articleSlice.reducer } });

export const authActions = authSlice.actions;
export const articlesAction = articleSlice.actions;

export default store;
