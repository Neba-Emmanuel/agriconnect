import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import storage from '../../utils/storage';
import {AuthApis} from '../../services/api/auth/AuthApis';

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async (_, {rejectWithValue}) => {
    try {
      const token = await storage.load('@token');
      if (!token) {
        return rejectWithValue('No token found');
      }
      const response = await axios.get(AuthApis.orders, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.orders;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch orders';
      return rejectWithValue(errorMessage);
    }
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ordersSlice.reducer;
