import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import {
  setIsEditing,
  setMessageBeingEdited,
} from '../../store/messageContainerSlice';
import { deleteMessageThunk } from '../../store/messages/messageThunk';
import { AuthContext } from '../../utils/context/AuthContext';
import { ContextMenu, ContextMenuItem } from '../../utils/styles';

export const SelectedMessageContextMenu = () => {
  const { id: routeId } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMessage: message, points } = useSelector(
    (state: RootState) => state.messageContainer
  );

  const deleteMessage = () => {
    const id = parseInt(routeId!);
    if (!message) return;
    return dispatch(deleteMessageThunk({ id, messageId: message.id }));
  };

  const editMessage = () => {
    dispatch(setIsEditing(true));
    dispatch(setMessageBeingEdited(message));
  };

  return (
    <ContextMenu top={points.y} left={points.x}>
      {message?.author.id === user?.id && (
        <ContextMenuItem onClick={deleteMessage}>Delete</ContextMenuItem>
      )}
      {message?.author.id === user?.id && (
        <ContextMenuItem onClick={editMessage}>Edit</ContextMenuItem>
      )}
    </ContextMenu>
  );
};
