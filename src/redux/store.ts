import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import charsSlice from "./chars/charsSlice";
import episodesSlice from "./episodes/episodesSlice";

const store = configureStore({
  reducer: {
    chars: charsSlice,
    episodes: episodesSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
