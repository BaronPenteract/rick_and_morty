import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, Status } from "../../utils/constants";
import { getPageFromURL } from "../../utils/getPageFromURL";
import { IEpisode, IFetchEpisodesResponse } from "../../@types/episodes";

interface IEpisodesSlice {
  episodes: IEpisode[];
  filterParams: {
    page?: number | null;
    name?: string;
    episode?: string;
  };
  episodesCount: number;
  currentPage: number;
  pages: number;
  prevPage: number | null;
  nextPage: number | null;
  status: Status;
}

const initialState: IEpisodesSlice = {
  episodes: [],
  filterParams: {},
  episodesCount: 0,
  currentPage: 1,
  pages: 0,
  prevPage: null,
  nextPage: null,
  status: Status.LOADING,
};

export const fetchEpisodes = createAsyncThunk(
  "episodes/fetchEpisodes",
  async (
    {
      page,
      name,
      episode,
    }: {
      page?: number | null;
      name?: string;
      episode?: string;
    },
    { rejectWithValue }
  ) => {
    const url = new URL(BASE_URL + "/episode");

    if (page) {
      url.searchParams.set("page", page.toString());
    }

    if (name) {
      url.searchParams.set("name", name);
    }

    if (episode) {
      url.searchParams.set("episode", episode);
    }

    try {
      const response = await axios.get<IFetchEpisodesResponse>(url.toString());

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

export const episodesSlice = createSlice({
  name: "episodes",
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
    builder.addCase(fetchEpisodes.pending, (state) => {
      state.status = Status.LOADING;
      state.episodes = [];
    });

    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.episodes = action.payload.results;
      state.episodesCount = action.payload.info.count;
      state.prevPage = getPageFromURL(action.payload.info.prev) || null;
      state.nextPage = getPageFromURL(action.payload.info.next) || null;
      state.pages = action.payload.info.pages;
    });

    builder.addCase(fetchEpisodes.rejected, (state) => {
      state.status = Status.ERROR;
      state.episodes = [];
    });

    /* builder.addCase(fetchEpisode.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchEpisode.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchEpisode.rejected, (state) => {
      state.status = Status.ERROR;
    }); */
  },
});

export const { setCurrentPage, setFilterParams } = episodesSlice.actions;

export default episodesSlice.reducer;
