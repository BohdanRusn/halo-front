import axios, { AxiosRequestConfig } from 'axios';
import {
  AcceptFriendRequestResponse,
  CancelFriendRequestResponse,
  Game,
  CreateGameParams,
  CreateUserParams,
  DeleteMessageParams,
  DeleteMessageResponse,
  EditMessagePayload,
  FetchMessagePayload,
  Friend,
  FriendRequest,
  MessageType,
  UpdateStatusParams,
  User,
  UserCredentialsParams,
} from './types';

const API_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: CreateUserParams) =>
  axiosClient.post(`/auth/register`, data, config);

export const postLoginUser = (data: UserCredentialsParams) =>
  axiosClient.post(`/auth/login`, data, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/status`, config);

export const getGames = () =>
  axiosClient.get<Game[]>(`/games`, config);

export const getGameById = (id: number) =>
  axiosClient.get<Game>(`/games/${id}`, config);

export const getGameMessages = (gameId: number) =>
  axiosClient.get<FetchMessagePayload>(
    `/games/${gameId}/messages`,
    config
  );

export const createMessage = (
  id: string,
  data: FormData
) => {
  const url = `/games/${id}/messages`;
  return axiosClient.post(url, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...config,
  });
};

export const postNewGame = (data: CreateGameParams) =>
  axiosClient.post<Game>(`/games`, data, config);

export const deleteMessage = ({ id, messageId }: DeleteMessageParams) =>
  axiosClient.delete<DeleteMessageResponse>(
    `/games/${id}/messages/${messageId}`,
    config
  );

export const editMessage = ({ content, id, messageId }: EditMessagePayload) =>
  axiosClient.patch<MessageType>(
    `/games/${id}/messages/${messageId}`,
    { content },
    config
  );


export const searchUsers = (query: string) =>
  axiosClient.get<User[]>(`/users/search?query=${query}`, config);

export const fetchFriends = () => axiosClient.get<Friend[]>('/friends', config);

export const fetchFriendRequests = () =>
  axiosClient.get<FriendRequest[]>('/friends/requests', config);

export const createFriendRequest = (username: string) =>
  axiosClient.post<FriendRequest>('/friends/requests', { username }, config);

export const cancelFriendRequest = (id: number) =>
  axiosClient.delete<CancelFriendRequestResponse>(
    `/friends/requests/${id}/cancel`,
    config
  );

export const acceptFriendRequest = (id: number) =>
  axiosClient.patch<AcceptFriendRequestResponse>(
    `/friends/requests/${id}/accept`,
    {},
    config
  );

export const rejectFriendRequest = (id: number) =>
  axiosClient.patch<FriendRequest>(
    `/friends/requests/${id}/reject`,
    {},
    config
  );

export const removeFriend = (id: number) =>
  axiosClient.delete<Friend>(`/friends/${id}/delete`, config);

export const checkGameOrCreate = (recipientId: number) =>
  axiosClient.get<Game>(`/exists/games/${recipientId}`, config);
export const checkUsernameExists = (username: string) =>
  axiosClient.get(`/users/check?username=${username}`, config);

export const updateStatusMessage = (data: UpdateStatusParams) =>
  axiosClient.patch('/users/presence/status', data, config);

export const logoutUser = () => axiosClient.post('/auth/logout', {}, config);
