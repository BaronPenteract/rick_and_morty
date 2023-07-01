import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
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
  filterParams: {
    page?: number | null;
    name?: string;
    status?: "alive" | "dead" | "unknown";
    gender?: "female" | "male" | "genderless" | "unknown";
  };
  charsCount: number;
  currentPage: number;
  pages: number;
  prevPage: number | null;
  nextPage: number | null;
  status: Status;
}

const initialState: CharsSlice = {
  chars: [],
  filterParams: {},
  charsCount: 0,
  currentPage: 1,
  pages: 0,
  prevPage: null,
  nextPage: null,
  status: Status.LOADING,
};

export const fetchChars = createAsyncThunk(
  "chars/fetchChars",
  async (
    {
      page,
      name,
      status,
      gender,
    }: {
      page?: number | null;
      name?: string;
      status?: string;
      gender?: string;
    },
    { rejectWithValue }
  ) => {
    const url = new URL(BASE_URL + "/character");

    if (page) {
      url.searchParams.set("page", page.toString());
    }

    if (name) {
      url.searchParams.set("name", name);
    }

    if (status) {
      url.searchParams.set("status", status);
    }

    if (gender) {
      url.searchParams.set("gender", gender);
    }

    try {
      const response = await axios.get<ResponseType>(url.toString());

      return response.data;
    } catch (err: any) {
      // тут чет хз

      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
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
    setFilterParams(state, action) {
      state.filterParams = action.payload;
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

export const { setCurrentPage, setFilterParams } = charsSlice.actions;

export default charsSlice.reducer;
