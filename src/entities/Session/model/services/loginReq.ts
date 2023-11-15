import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { SessionSchema } from '../types/sessionTypes';
import { ThunkConfig } from '@/app/providers/StorProvider';
import { getEmail, getPassword } from '../selectors/getState';

export const loginReq = createAsyncThunk<
  {accessToken: string, refreshToken: string,role: string},
  void,
  ThunkConfig<string>
>(
  'user/login',
  async (_, { extra, rejectWithValue, getState }) => {
    const email = getEmail(getState())?.trim();
    const password = getPassword(getState())?.trim();
    const regEmail = RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const regPassword = RegExp('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}');
    const errorMsgEmail = localStorage.getItem("i18nextLng") === "ru"?
      'неправильный адрес электронной почты, пример: example@gmail.com':
        'incorrect email address, example: example@gmail.com';
    const errorMsgPwd = localStorage.getItem("i18nextLng") === "ru"?
      'неверный пароль, пример: BIj0X0e048YleJL':
        'incorrect password, example: BIj0X0e048YleJL';
    const fillAll = localStorage.getItem("i18nextLng") === "ru"?
      'Необходимо заполнить все поля!':
        'All fields must be filled in!';

    if(!password || !email) return rejectWithValue(fillAll);
    if(!regEmail.test(email)) return rejectWithValue(errorMsgEmail);
    if(!regPassword.test(password)) return rejectWithValue(errorMsgPwd);
    
    try {
      const response = await extra.api.post<{accessToken: string, refreshToken: string,role: string}>('/auth/local/signin', {
        email, password
      });
      return response.data;
    } catch (e) {
      const errorSomeThingWrong = localStorage.getItem("i18nextLng") === "ru"?
      'Что-то пошло не так, попробуйте чуть позже!':
        'Something went wrong, try again later!';
      return rejectWithValue(errorSomeThingWrong);
    }
  },
);

export const casesLoginReq = (builder:ActionReducerMapBuilder<SessionSchema>) => {
  builder.addCase(loginReq.pending, (state) => {
      state.isLoading = true;
      state.isAuth = false;
  });
  builder.addCase(loginReq.fulfilled, (state, {payload}) => {
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
    state.isAuth = true;
    state.isLoading = false;
    localStorage.setItem("accessToken",payload.accessToken.toString());
    localStorage.setItem("refreshToken",payload.refreshToken.toString());
    localStorage.setItem('isAuth', "true");
  });
      builder.addCase(loginReq.rejected, (state,{payload}) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = payload;
      localStorage.setItem('isAuth', state.isAuth.toString());
  });
}