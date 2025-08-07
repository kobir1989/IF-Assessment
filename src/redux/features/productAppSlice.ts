import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface FilterState {
  category: number[];
}

interface ProductAppState {
  products: Product[];
  searchKey: string;
  filters: FilterState;
}

const initialState: ProductAppState = {
  products: [],
  searchKey: '',
  filters: {
    category: [],
  },
};

const productAppSlice = createSlice({
  name: 'productApp',
  initialState,
  reducers: {
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },

    toggleCategoryFilter: (state, action: PayloadAction<number>) => {
      const categoryId = action.payload;
      const categoryIndex = state.filters.category.indexOf(categoryId);

      if (categoryIndex > -1) {
        state.filters.category.splice(categoryIndex, 1);
      } else {
        state.filters.category.push(categoryId);
      }
    },

    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = {
        category: [],
      };
    },

    clearSearch: (state) => {
      state.searchKey = '';
    },
  },
});

export const { setSearchKey, toggleCategoryFilter, setFilters, clearFilters, clearSearch } =
  productAppSlice.actions;

export default productAppSlice.reducer;
