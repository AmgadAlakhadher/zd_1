import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { SessionSchema} from "../types/sessionTypes";
import { casesLoginReq } from "../services/loginReq";

const initialState:SessionSchema = {
    isLoading: false,
    isAuth: false,
    accessToken: "",
    refreshToken: ""
}

export const sessionSlice = createSlice({
    name:'session',
    initialState,
    reducers: {
        setIsLoggedIn: (state,{payload}:PayloadAction<boolean>) => {
            state.isAuth = payload;
        },
        setToken: (state,{payload}:PayloadAction<string>) => {
            state.accessToken = payload;
        },
        setEmail: (state,{payload}:PayloadAction<string>) => {
            state.error = undefined;
            state.email = payload.trim();
        },
        setPassword: (state,{payload}:PayloadAction<string>) => {
            state.error = undefined;
            state.password = payload.trim();
        },
        resetError: (state) => {
            state.error = undefined;
        },
        logout: (state)=>{
            state.isAuth = false;
            state.email = undefined;
            state.password = undefined;
            state.accessToken = "";
            localStorage.clear();
        }
    },
    extraReducers: (builder)=>{
        casesLoginReq(builder);
    }
});

export const { actions: sessionActions } = sessionSlice;
export const { reducer: sessionReducer } = sessionSlice;
