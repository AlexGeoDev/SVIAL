import { createSlice } from "@reduxjs/toolkit";

const tabsSlice = createSlice({
  name: 'Tabs',
  initialState: {showTabs: true},
  reducers: {
    toggleTabsVisibility: (state) => {
      state.showTabs = !state.showTabs;
    }
  }
})

export const {toggleTabsVisibility} = tabsSlice.actions;
export default tabsSlice.reducer;