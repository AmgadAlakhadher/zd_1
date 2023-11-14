import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { SessionSchema, User } from '../types/sessionTypes';
import { ThunkConfig } from 'app/providers/StorProvider';
import { getEmail, getPassword } from '../selectors/getState';

export const loginReq = createAsyncThunk<
  {accessToken: string, refreshToken: string,role: string},
  void,
  ThunkConfig<string>
>(
  'user/login',
  async (_, { extra, rejectWithValue, getState, dispatch }) => {
    const email = getEmail(getState())?.trim();
    const password = getPassword(getState())?.trim();
    let regEmail = RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if(!password || !email) return rejectWithValue('Необходимо заполнить все поля!');
    if(!regEmail.test(email)) return rejectWithValue("неправильный адрес электронной почты, пример: example@gmail.com");
    
    try {
      const response = await extra.api.post<{accessToken: string, refreshToken: string,role: string}>('/auth/local/signin', {
        email, password
      });
      return response.data;
    } catch (e) {
      return rejectWithValue('Что-то пошло не так, попробуйте чуть позже!');
    }
  },
);

export const casesLoginReq = (builder:ActionReducerMapBuilder<SessionSchema>) => {
  builder.addCase(loginReq.pending, (state) => {
      state.isLoading = true;
      state.isAuth = false;
  });
  builder.addCase(loginReq.fulfilled, (state, {payload}) => {
      localStorage.setItem('userType', payload.role.toString());
      localStorage.setItem("accessToken",payload.accessToken.toString());
      localStorage.setItem("refreshToken",payload.refreshToken.toString());
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.userType = payload.role;
      state.isAuth = true;
      localStorage.setItem('isAuth', state.isAuth.toString());
      state.isLoading = false;
  });
      builder.addCase(loginReq.rejected, (state,{payload}) => {
      state.isLoading = false;
      state.isAuth = false;
      localStorage.setItem('isAuth', state.isAuth.toString());
      state.error = payload;
  });
}