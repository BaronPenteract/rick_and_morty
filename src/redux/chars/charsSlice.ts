import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CharType, ResponseType } from "../../@types/chars";
import { BASE_URL } from "../../utils/constants";
import { getPageFromURL } from "../../utils/getPageFromURL";

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
  prevPage: number | null;
  nextPage: number | null;
  status: Status;
}

const initialState: CharsSlice = {
  chars: [],
  charsCount: 0,
  currentPage: 0,
  pages: 0,
  prevPage: null,
  nextPage: null,
  status: Status.LOADING,
};

export const fetchChars = createAsyncThunk(
  "chars/fetchChars",
  async ({ page, name }: { page?: number; name?: string }) => {
    const url = `${BASE_URL}/character/?${
      page !== null ? `page=${page}&` : ""
    }`;

    const response = await axios.get<ResponseType>(url);

    return response.data;
  }
);

export const charsSlice = createSlice({
  name: "chars",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      const page = action.payload;

      if (page > 0 || page <= state.pages) {
        state.currentPage = page;
      } else {
        state.currentPage = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChars.pending, (state) => {
      state.status = Status.LOADING;
      state.chars = [];
    });

    builder.addCase(fetchChars.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.chars = action.payload.results;
      state.charsCount = action.payload.info.count;
      state.prevPage = getPageFromURL(action.payload.info.prev) || null;
      state.nextPage = getPageFromURL(action.payload.info.next) || null;
      state.pages = action.payload.info.pages;
    });

    builder.addCase(fetchChars.rejected, (state) => {
      state.status = Status.ERROR;
      state.chars = [];
    });
  },
});

export const { setCurrentPage } = charsSlice.actions;

export default charsSlice.reducer;
