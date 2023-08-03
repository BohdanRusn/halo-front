import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { GamePanel } from '../../components/games/GamePanel';
import { GameSidebar } from '../../components/sidebars/GameSidebar';
import { AppDispatch } from '../../store';
import {
  addGame,
  fetchGamesThunk,
  updateGame,
} from '../../store/gameSlice';
import { addMessage, deleteMessage } from '../../store/messages/messageSlice';
import { SocketContext } from '../../utils/context/SocketContext';
import { Game, MessageEventPayload } from '../../utils/types';

export const GamePage = () => {
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 800);
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    const handleResize = () => setShowSidebar(window.innerWidth > 800);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchGamesThunk());
  }, []);

  useEffect(() => {
    socket.on('onMessage', (payload: MessageEventPayload) => {
      const { game, message } = payload;
      dispatch(addMessage(payload));
      dispatch(updateGame(game));
    });
    socket.on('onGame', (payload: Game) => {
      dispatch(addGame(payload));
    });
    socket.on('onMessageDelete', (payload) => {
      dispatch(deleteMessage(payload));
    });
    return () => {
      socket.off('connected');
      socket.off('onMessage');
      socket.off('onGame');
      socket.off('onMessageDelete');
    };
  }, [id]);

  return (
    <>
      {showSidebar && <GameSidebar />}
      {!id && !showSidebar && <GameSidebar />}
      {!id && showSidebar && <GamePanel />}
      <Outlet />
    </>
  );
};
