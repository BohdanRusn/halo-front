import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../store';
import { selectGameById } from '../../../store/gameSlice';
import { AuthContext } from '../../../utils/context/AuthContext';
import { getRecipientFromGame } from '../../../utils/helpers';
import {
  MessagePanelHeaderIcons,
  MessagePanelHeaderStyle,
} from '../../../utils/styles';

export const MessagePanelGameHeader = () => {
  const user = useContext(AuthContext).user!;
  const { id } = useParams();

  const game = useSelector((state: RootState) =>
    selectGameById(state, parseInt(id!))
  );

  const recipient = getRecipientFromGame(game, user);
  
  return (
    <MessagePanelHeaderStyle>
      <div>
        <span>{recipient?.username || 'User'}</span>
      </div>
      <MessagePanelHeaderIcons>
        {/*<FaPhoneAlt size={24} cursor="pointer" onClick={voiceCallUser} />*/}
        {/*<FaVideo size={30} cursor="pointer" onClick={videoCallUser} />*/}
      </MessagePanelHeaderIcons>
    </MessagePanelHeaderStyle>
  );
};
