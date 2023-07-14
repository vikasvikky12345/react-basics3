import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app} from './firebase';

const auth = getAuth(app);
const initialState = {
  user: null,
  error: null,
};

export const signup = createAsyncThunk('auth/signup', async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { email };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { uid, email } = action.payload;
        state.user = { uid, email };
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { email } = action.payload;
        state.user = { email };
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
      })
      
  },
});

export const { clearError, signupFailure, loginFailure } = authSlice.actions;

export default authSlice.reducer;
