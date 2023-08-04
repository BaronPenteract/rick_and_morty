import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CharType,
  IFilterParamsChars,
  TFetchCharResponse,
  TFetchCharsResponse,
} from "../../@types/chars";
import { BASE_URL, Status } from "../../utils/constants";
import { getPageFromURL } from "../../utils/getPageFromURL";
import { setFavCharsToLS } from "../../utils/localStorage";

interface CharsSlice {
  chars: CharType[];
  favChars: CharType[];
  filterParams: IFilterParamsChars;
  charsCount: number;
  currentPage: number;
  pages: number;
  prevPage: number | null;
  nextPage: number | null;
  status: Status;
}

const initialState: CharsSlice = {
  chars: [],
  favChars: [],
  filterParams: {},
  charsCount: 0,
  currentPage: 1,
  pages: 1,
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
      const response = await axios.get<TFetchCharsResponse>(url.toString());

      return response.data;
      // тут чет хз
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCharsByIds = createAsyncThunk(
  "chars/fetchCharsByIds",
  async (
    {
      ids,
    }: {
      ids: number[];
    },
    { rejectWithValue }
  ) => {
    const url = new URL(BASE_URL + "/character/" + ids.toString());

    try {
      const response = await axios.get<TFetchCharResponse[]>(url.toString());

      return response.data;
      // тут чет хз
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchChar = createAsyncThunk(
  "chars/fetchChar",
  async (
    {
      id,
    }: {
      id: number;
    },
    { rejectWithValue }
  ) => {
    const url = new URL(BASE_URL + "/character/" + id);

    try {
      const response = await axios.get<TFetchCharResponse>(url.toString());

      return response.data;
      // тут чет хз
    } catch (err: any) {
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
    setFavChars(state, action) {
      state.favChars = action.payload;
      setFavCharsToLS(state.favChars);
    },
    like(state, action: PayloadAction<CharType>) {
      const likedChar = action.payload;

      state.favChars.push({ ...likedChar, isLiked: true });

      state.chars = state.chars.map((char) => {
        if (char.id === likedChar.id) {
          return { ...likedChar, isLiked: true };
        } else {
          return char;
        }
      });
      setFavCharsToLS(state.favChars);
    },
    dislike(state, action: PayloadAction<CharType>) {
      const dislikedChar = action.payload;

      state.favChars = state.favChars.filter(
        (char) => char.id !== dislikedChar.id
      );

      state.chars = state.chars.map((char) => {
        if (char.id === dislikedChar.id) {
          return { ...dislikedChar, isLiked: false };
        } else {
          return char;
        }
      });
      setFavCharsToLS(state.favChars);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChars.pending, (state) => {
      state.status = Status.LOADING;
      state.chars = [];
    });

    builder.addCase(fetchChars.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.charsCount = action.payload.info.count;
      state.prevPage = getPageFromURL(action.payload.info.prev) || null;
      state.nextPage = getPageFromURL(action.payload.info.next) || null;
      state.pages = action.payload.info.pages;

      // Проверяем пришедший с АПИ массив на то, содержатся ли в нем лайкнутые Чары (favChars),
      // если да, то меняем пришедший Чар лайкнутым
      state.chars = action.payload.results.map((fetchedChar) => {
        return (
          state.favChars.find((favChar) => {
            return favChar.id === fetchedChar.id;
          }) || fetchedChar
        );
      });
    });

    builder.addCase(fetchChars.rejected, (state) => {
      state.status = Status.ERROR;
      state.chars = [];
    });

    builder.addCase(fetchCharsByIds.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchCharsByIds.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;

      // Проверяем пришедший с АПИ массив на то, содержатся ли в нем лайкнутые Чары (favChars),
      // если да, то меняем пришедший Чар лайкнутым
      state.chars = action.payload.map((fetchedChar) => {
        return (
          state.favChars.find((favChar) => {
            return favChar.id === fetchedChar.id;
          }) || fetchedChar
        );
      });
    });

    builder.addCase(fetchCharsByIds.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchChar.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchChar.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchChar.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setCurrentPage, setFilterParams, setFavChars, like, dislike } =
  charsSlice.actions;

export default charsSlice.reducer;
