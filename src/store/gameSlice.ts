import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Game, CreateGameParams } from '../utils/types';
import { getGames, postNewGame } from '../utils/api';
import { RootState } from '.';

export interface GamesState {
  games: Game[];
  loading: boolean;
}

const initialState: GamesState = {
  games: [],
  loading: false,
};

export const fetchGamesThunk = createAsyncThunk('games/fetch', async () => {
  return getGames();
});

export const createGameThunk = createAsyncThunk(
  'games/create',
  async (data: CreateGameParams) => {
    return postNewGame(data);
  }
);

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<Game>) => {
      state.games.unshift(action.payload);
    },
    updateGame: (state, action: PayloadAction<Game>) => {
      const game = action.payload;
      const index = state.games.findIndex((c) => c.id === game.id);
      state.games.splice(index, 1);
      state.games.unshift(game);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesThunk.fulfilled, (state, action) => {
        state.games = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchGamesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGameThunk.fulfilled, (state, action) => {
        state.games.unshift(action.payload.data);
      });
  },
});

const selectGames = (state: RootState) => state.game.games;
const selectGameId = (state: RootState, id: number) => id;

export const selectGameById = createSelector(
  [selectGames, selectGameId],
  (games, gameId) => games.find((c) => c.id === gameId)
);

export const { addGame, updateGame } = gamesSlice.actions;

export default gamesSlice.reducer;
