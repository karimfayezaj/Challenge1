

import { createSlice, configureStore } from '@reduxjs/toolkit';

const authInitialState = { isAuth: false, token: "", password: "", username: "", errorMessage: "" };
const articlesInitialState = { numberOfArticles: 0, listArticles: [], listFiltered: "", pageNumber: 0 };

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
        logOutUser(state) {
            state.isAuth = false;
        },
    }
})


const articleSlice = createSlice({
    name: "articles",
    initialState: articlesInitialState,
    reducers: {
        loadAllArticles(state, action) {
            state.listArticles = state.listArticles.concat(action.payload);
        },
        changePageNumber(state, action) {
            if (state.pageNumber === 0) {
                state.pageNumber = 1;
            }
            else if (state.pageNumber === 1) {
                state.pageNumber = 2;
            }
            else {
                state.pageNumber = 2;
            }
        },
        filterArticles(state, action) {
            state.listFiltered = action.payload;
        },
        emptyFiltered(state) {
            state.listFiltered = [];
        }
    }
})



const store = configureStore({ reducer: { auth: authSlice.reducer, articles: articleSlice.reducer } });

export const authActions = authSlice.actions;
export const articlesAction = articleSlice.actions;

export default store;
