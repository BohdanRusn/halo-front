import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {AppDispatch, RootState} from '../../store';
import {MessageType} from '../../utils/types';
import {selectGameMessage} from '../../store/messages/messageSlice';
import {MessageItemHeader} from './MessageItemHeader';
import {MessageItemContainerBody} from './MessageItemContainerBody';
import {useHandleClick, useKeydown} from '../../utils/hooks';
import {MessageContainerStyle, MessageItemContainer, MessageItemDetails,} from '../../utils/styles';
import {
  editMessageContent,
  resetMessageContainer,
  setContextMenuLocation,
  setIsEditing,
  setSelectedMessage,
  toggleContextMenu,
} from '../../store/messageContainerSlice';
import {SystemMessageList} from './system/SystemMessageList';
import {SelectedMessageContextMenu} from "../contextMenus/SelectedMessageContextMenu";

export const MessageContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const gameMessages = useSelector((state: RootState) =>
    selectGameMessage(state, parseInt(id!))
  );
  const { showContextMenu } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const handleKeydown = (e: KeyboardEvent) =>
    e.key === 'Escape' && dispatch(setIsEditing(false));
  const handleClick = () => dispatch(toggleContextMenu(false));

  useKeydown(handleKeydown, [id]);
  useHandleClick(handleClick, [id]);

  useEffect(() => {
    return () => {
      dispatch(resetMessageContainer());
    };
  }, [id]);

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: MessageType
  ) => {
    e.preventDefault();
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setSelectedMessage(message));
  };

  const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(editMessageContent(e.target.value));

  const mapMessages = (
    message: MessageType
  ) => {
    return (
      <MessageItemContainer
        key={message.id}
        onContextMenu={(e) => onContextMenu(e, message)}
      >
        <MessageItemDetails>
          <MessageItemHeader message={message}/>
          <MessageItemContainerBody
            message={message}
            onEditMessageChange={onEditMessageChange}
            padding="8px 0 0 0"
          />
        </MessageItemDetails>
      </MessageItemContainer>
    );
  };

  return (
    <MessageContainerStyle>
      <SystemMessageList />
      {gameMessages?.messages.map(mapMessages)}
      {showContextMenu && <SelectedMessageContextMenu />}
    </MessageContainerStyle>
  );
};
