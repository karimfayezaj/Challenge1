

import { createSlice, configureStore } from '@reduxjs/toolkit';

const authInitialState = { isAuth: false, token: "", password: "", errorMessage: "" };
const articlesInitialState = { numberOfArticles: 0, listArticles: [] };

const authSlice = createSlice({
    name: 'authenticated',
    initialState: authInitialState,
    reducers: {
        logInUser(state) {
            state.isAuth = true;
        },
        saveCredentials(state, action) {
            state.token = action.payload;
        },
        savePassword(state, action) {
            state.password = action.payload;
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
