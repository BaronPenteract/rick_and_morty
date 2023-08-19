import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, Status } from "../../utils/constants";
import { getPageFromURL } from "../../utils/getPageFromURL";
import {
  IEpisode,
  IFetchEpisodesResponse,
  IFetchSingleEpisodeResponse,
  IFilterParamsEpisodes,
} from "../../@types/episodes";

interface IEpisodesSlice {
  episodes: IEpisode[];
  filterParams: IFilterParamsEpisodes;
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
  pages: 1,
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

    if (name && name !== "") {
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

export const fetchEpisodesByIds = createAsyncThunk(
  "episodes/fetchEpisodesByIds",
  async (
    {
      ids,
    }: {
      ids: number[];
    },
    { rejectWithValue }
  ) => {
    const url = new URL(BASE_URL + "/episode/[" + ids.toString() + "]");

    try {
      const response = await axios.get<IFetchSingleEpisodeResponse[]>(
        url.toString()
      );

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

export const fetchEpisode = createAsyncThunk(
  "episodes/fetchEpisode",
  async (
    {
      id,
    }: {
      id: number;
    },
    { rejectWithValue }
  ) => {
    const url = new URL(BASE_URL + "/episode/" + id);

    try {
      const response = await axios.get<IFetchSingleEpisodeResponse>(
        url.toString()
      );

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
      state.prevPage = getPageFromURL(action.payload.info.prev) || null;
      state.nextPage = getPageFromURL(action.payload.info.next) || null;
      state.pages = action.payload.info.pages;
      state.currentPage = state.prevPage ? state.prevPage + 1 : 1;

      if (state.episodesCount === 0) {
        state.episodesCount = action.payload.info.count;
      }
    });

    builder.addCase(fetchEpisodes.rejected, (state) => {
      state.status = Status.ERROR;
      state.episodes = [];
    });

    builder.addCase(fetchEpisodesByIds.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchEpisodesByIds.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchEpisodesByIds.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchEpisode.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchEpisode.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchEpisode.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setCurrentPage, setFilterParams } = episodesSlice.actions;

export default episodesSlice.reducer;
