import { createSlice } from '@reduxjs/toolkit';
import jwtService from 'app/services/jwtService';
import { setUserData } from './userSlice';

export const submitLogin =
  ({ username, password }) =>
  async (dispatch) => {
    return jwtService
      .signInWithEmailAndPassword(username, password)
      .then((user) => {
        dispatch(setUserData(user));

        return dispatch(loginSuccess());
      })
      .catch((error) => {
        console.log(error);
        return dispatch(loginError(error.message));
      });
  };

const initialState = {
  success: false,
  error: '',
};

const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.error = '';
    },
    loginError: (state, action) => {
      state.success = false;
      state.error = action.payload;
    },
  },
  extraReducers: {},
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
