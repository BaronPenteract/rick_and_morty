import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CharType, ResponseType } from "../../@types/chars";
import { BASE_URL } from "../../utils/constants";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface CharsSlice {
  chars: CharType[];
  charsCount: number;
  currentPage: number;
  pages: number;
  prevPage: string | null;
  nextPage: string | null;
  status: Status;
}

const initialState: CharsSlice = {
  chars: [],
  charsCount: 0,
  currentPage: 1,
  pages: 1,
  prevPage: null,
  nextPage: null,
  status: Status.LOADING,
};

export const fetchChars = createAsyncThunk(
  "chars/fetchChars",
  async (to: number | null) => {
    const url = `${BASE_URL}/character${to !== null ? `?page=${to}` : ""}`;
    const response = await axios.get<ResponseType>(url);

    return response.data;
  }
);

export const charsSlice = createSlice({
  name: "chars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChars.pending, (state) => {
      state.status = Status.LOADING;
      state.chars = [];
    });

    builder.addCase(fetchChars.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.chars = action.payload.results;
      state.charsCount = action.payload.info.count;
      state.prevPage = action.payload.info.prev;
      state.nextPage = action.payload.info.next;
      state.pages = action.payload.info.pages;
    });

    builder.addCase(fetchChars.rejected, (state) => {
      state.status = Status.ERROR;
      state.chars = [];
    });
  },
});

export const {} = charsSlice.actions;

export default charsSlice.reducer;
