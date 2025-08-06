import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const productAppSlice = createSlice({
  name: 'productApp',
  initialState,
  reducers: {},
});

export const {} = productAppSlice.actions;

export default productAppSlice.reducer;
