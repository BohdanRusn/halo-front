import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  GameMessage,
  DeleteMessageResponse,
  MessageEventPayload,
  MessageType,
} from '../../utils/types';
import { deleteMessageThunk, editMessageThunk, fetchMessagesThunk } from './messageThunk';

export interface MessagesState {
  messages: GameMessage[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
      const { game, message } = action.payload;
      const gameMessage = state.messages.find((cm) => cm.id === game.id);
      gameMessage?.messages.unshift(message);
    },
    deleteMessage: (state, action: PayloadAction<DeleteMessageResponse>) => {
      const { payload } = action;
      const gameMessages = state.messages.find((cm) => cm.id === payload.gameId);
      if (!gameMessages) return;
      const messageIndex = gameMessages.messages.findIndex(
        (m) => m.id === payload.messageId
      );
      gameMessages.messages.splice(messageIndex, 1);
    },
    editMessage: (state, action: PayloadAction<MessageType>) => {
      const message = action.payload;
      const gameMessage = state.messages.find((cm) => cm.id === message.game.id);
      if (!gameMessage) return;
      const messageIndex = gameMessage.messages.findIndex((m) => m.id === message.id);
      gameMessage.messages[messageIndex] = message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id} = action.payload.data;
        const index = state.messages.findIndex((cm) => cm.id === id);
        const exists = state.messages.find((cm) => cm.id === id);
        if (exists) {
          state.messages[index] = action.payload.data;
        } else {
          state.messages.push(action.payload.data);
        }
      })
      .addCase(deleteMessageThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        const gameMessages = state.messages.find((cm) => cm.id === data.gameId);
        if (!gameMessages) return;
        const messageIndex = gameMessages.messages.findIndex(
          (m) => m.id === data.messageId
        );
        gameMessages?.messages.splice(messageIndex, 1);
      })
      .addCase(editMessageThunk.fulfilled, (state, action) => {
        const { data: message } = action.payload;
        const { id } = message.game;
        const gameMessage = state.messages.find((cm) => cm.id === id);
        if (!gameMessage) return;
        const messageIndex = gameMessage.messages.findIndex((m) => m.id === message.id);
        gameMessage.messages[messageIndex] = message;
      });
  },
});

const selectGameMessages = (state: RootState) => state.messages.messages;

const selectGameMessageId = (state: RootState, id: number) => id;

export const selectGameMessage = createSelector(
  [selectGameMessages, selectGameMessageId],
  (gameMessages, id) => gameMessages.find((cm) => cm.id === id)
);

export const { addMessage, deleteMessage, editMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
