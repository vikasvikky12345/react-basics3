import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { app } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';

const auth = getAuth(app);
const database = getDatabase(app);
const usersRef = ref(database, 'users');

const themeSlice = createSlice({
  name: 'theme',
  initialState: 'light',
  reducers: {
    toggleTheme: (state) => (state === 'light' ? 'dark' : 'light'),
  },
});

const premiumSlice = createSlice({
  name: 'premium',
  initialState: false,
  reducers: {
    activatePremium: (state) => true,
    disablePremium: (state) => false,
  },
});

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        password: password,
      };
      await set(usersRef, user);
      console.log('User has successfully signed up.');
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendVerificationEmail = createAsyncThunk(
  'auth/sendVerificationEmail',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().auth;
      if (user) {
        await sendEmailVerification(auth.currentUser);
        console.log('Verification email sent.');
      } else {
        throw new Error('User not found.');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        password: password,
      };

      console.log('User has successfully logged in.');
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await auth.signOut();
    console.log('User has successfully logged out.');
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://reduxproject-473ea-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile.');
      }

      console.log('User profile has been updated.');
      return { profileComplete: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { activatePremium, disablePremium } = premiumSlice.actions;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null,
    profileComplete: false,
    isPremiumActivated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileComplete = action.payload.profileComplete;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.profileComplete = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(activatePremium, (state) => {
        state.isPremiumActivated = true;
      })
      .addCase(disablePremium, (state) => {
        state.isPremiumActivated = false;
      });
  },
});

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    premium: premiumSlice.reducer,
  },
});

auth.onAuthStateChanged(async (user) => {
  if (user) {
    try {
      const snapshot = await get(ref(database, 'users/' + user.uid));
      const userData = snapshot.val();
      store.dispatch(loginUser.fulfilled(userData));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
});

export const { signupSuccess, signupFailure, loginSuccess, loginFailure } = authSlice.actions;
export const { toggleTheme } = themeSlice.actions;
store.subscribe(() => {
  const user = store.getState().auth.user;
  localStorage.setItem('user', JSON.stringify(user));
});

export default store;
