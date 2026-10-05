import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MarketplaceUiState { notice: string | null }
const initialState: MarketplaceUiState = { notice: null };

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    noticeShown(state, action: PayloadAction<string>) {
      state.notice = action.payload;
    },
    noticeDismissed(state) {
      state.notice = null;
    },
  },
});

export const { noticeShown, noticeDismissed } = marketplaceSlice.actions;
export default marketplaceSlice.reducer;
