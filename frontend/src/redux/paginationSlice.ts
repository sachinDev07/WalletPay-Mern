import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateDataTypes {
  page: number;
  totalPages: number;
}

const initialState: InitialStateDataTypes = {
  page: 1,
  totalPages: 0,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    getTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    onPageButton: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    prevButton: (state) => {
      if (state.page - 1 < 1) {
        return;
      }
      state.page = state.page - 1;
    },
    nextButton: (state) => {
      if (state.page < 1 || state.page + 1 > state.totalPages) {
        return;
      }
      state.page = state.page + 1;
    },
  },
});

export const { onPageButton, prevButton, nextButton, getTotalPages } =
  paginationSlice.actions;

export default paginationSlice.reducer;
