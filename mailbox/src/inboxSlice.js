import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, update, get, remove } from 'firebase/database';
import { db } from './firebase';

const initialState = {
  emails: [],
  unreadCount: 0,
};

export const fetchEmails = createAsyncThunk('inbox/fetchEmails', async (userEmail, { rejectWithValue }) => {
  try {
    const emailsRef = ref(db, 'emails');
    const query = await get(ref(emailsRef, 'receiver', userEmail));

    if (query.exists()) {
      const emailData = query.val();
      const emails = Object.keys(emailData).map((key) => ({
        id: key,
        ...emailData[key],
      }));

      console.log('Fetched emails:', emails);
      return emails;
    }

    return [];
  } catch (error) {
    console.log('Fetch emails error:', error.message);
    return rejectWithValue(error.message);
  }
});

export const markAsRead = createAsyncThunk('inbox/markAsRead', async (emailId, { rejectWithValue }) => {
  try {
    await update(ref(db, `emails/${emailId}`), { read: true });

    console.log('Marked email as read:', emailId);
    return emailId;
  } catch (error) {
    console.log('Mark as read error:', error.message);
    return rejectWithValue(error.message);
  }
});

export const deleteEmail = createAsyncThunk('inbox/deleteEmail', async (emailId, { rejectWithValue }) => {
  try {
    await remove(ref(db, `emails/${emailId}`));

    console.log('Deleted email:', emailId);
    return emailId;
  } catch (error) {
    console.log('Delete email error:', error.message);
    return rejectWithValue(error.message);
  }
});

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.emails = action.payload;
        state.unreadCount = action.payload.filter((email) => !email.read).length;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const email = state.emails.find((email) => email.id === action.payload);
        if (email) {
          email.read = true;
          state.unreadCount = state.emails.filter((email) => !email.read).length;
        }
      })
      .addCase(deleteEmail.fulfilled, (state, action) => {
        state.emails = state.emails.filter((email) => email.id !== action.payload);
        state.unreadCount = state.emails.filter((email) => !email.read).length;
      });
  },
});

export const selectEmails = (state) => state.inbox.emails;
export const selectUnreadCount = (state) => state.inbox.unreadCount;

export default inboxSlice.reducer;
