import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../../components/messages/MessagePanel';
import { SocketContext } from '../../utils/context/SocketContext';
import { GameChannelPageStyle } from '../../utils/styles';
import { AppDispatch } from '../../store';
import { editMessage } from '../../store/messages/messageSlice';
import { fetchMessagesThunk } from '../../store/messages/messageThunk';

export const GameChannelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [isTyping, setIsTyping] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);

  useEffect(() => {
    const gameId = parseInt(id!);
    dispatch(fetchMessagesThunk(gameId));
  }, [id]);

  useEffect(() => {
    const gameId = id!;
    socket.emit('onGameJoin', { gameId });
    socket.on('userJoin', () => {
    });
    socket.on('userLeave', () => {
    });
    socket.on('onTypingStart', () => {
      setIsRecipientTyping(true);
    });
    socket.on('onTypingStop', () => {
      setIsRecipientTyping(false);
    });
    socket.on('onMessageUpdate', (message) => {
      dispatch(editMessage(message));
    });

    return () => {
      socket.emit('onGameLeave', { gameId });
      socket.off('userJoin');
      socket.off('userLeave');
      socket.off('onTypingStart');
      socket.off('onTypingStop');
      socket.off('onMessageUpdate');
    };
  }, [id]);

  const sendTypingStatus = () => {
    if (isTyping) {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          socket.emit('onTypingStop', { gameId: id });
          setIsTyping(false);
        }, 2000)
      );
    } else {
      setIsTyping(true);
      socket.emit('onTypingStart', { gameId: id });
    }
  };

  return (
    <GameChannelPageStyle>
      <MessagePanel
        sendTypingStatus={sendTypingStatus}
        isRecipientTyping={isRecipientTyping}
      ></MessagePanel>
    </GameChannelPageStyle>
  );
};
