import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasketProductCountState {
  count: number;
}

const initialState: BasketProductCountState = {
  count: 0,
};

export const favoriteCountSlice = createSlice({
  name: "favoriteCount",
  initialState,
  reducers: {
    increaseFavoriteProductCount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },

    decreaseFavoriteProductCount: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
      if (state.count < 0) {
        state.count = 0;
      }
    },

    setFavoriteProductCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },

    resetFavoriteProductCount: (state) => {
      state.count = 0;
    },
  },
});

export const {
  increaseFavoriteProductCount,
  decreaseFavoriteProductCount,
  setFavoriteProductCount,
  resetFavoriteProductCount,
} = favoriteCountSlice.actions;
