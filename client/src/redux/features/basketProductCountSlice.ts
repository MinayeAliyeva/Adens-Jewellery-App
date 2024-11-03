import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasketProductCountState {
  count: number;
}

const initialState: BasketProductCountState = {
  count: 0,
};

export const basketCountSlice = createSlice({
  name: "basketCount",
  initialState,
  reducers: {
    increaseBasketProductCount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },

    decreaseBasketProductCount: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
      if (state.count < 0) {
        state.count = 0;
      }
    },

    setBasketProductCount: (state, action: PayloadAction<number>) => {
      console.log("action.payload", action.payload);
      
      state.count = action.payload;
    },

    resetBasketProductCount: (state) => {
      state.count = 0;
    },
  },
});

export const {
  increaseBasketProductCount,
  decreaseBasketProductCount,
  setBasketProductCount,
  resetBasketProductCount,
} = basketCountSlice.actions;
