import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: true,
  error: false,
  bookingData: []
};

const slice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = true;
      console.log(action.payload);
    },

    // GET CLIENT bookData
    getClientBookingData(state, action) {
      state.isLoading = false;
      console.log(action.payload);
      state.bookingData = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;

// ----------------------------------------------------------------------

export function getProfile() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/profile');
      dispatch(slice.actions.getProfileSuccess(response.data.profile));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ---------------------------------------------------------------------

export function setBookingData(bookData) {
  console.log('Here is redux');
  return async (dispatch) => {
    console.log('Here is redux');
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('http://localhost:7000/send-bookdata', bookData);
      console.log('Here is success section');
      console.log(response);
      dispatch(slice.actions.getClientBookingData(response.data));
    } catch (error) {
      console.log('Here is error section');
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
