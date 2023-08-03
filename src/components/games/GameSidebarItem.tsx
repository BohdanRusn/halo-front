import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../utils/context/AuthContext';
import { getRecipientFromGame } from '../../utils/helpers';
import {
  GameSidebarItemDetails,
  GameSidebarItemStyle,
} from '../../utils/styles';
import { Game } from '../../utils/types';
import defaultAvatar from '../../assets/default_avatar.jpg';

import styles from './index.module.scss';

type Props = {
  game: Game;
};

export const GameSidebarItem: React.FC<Props> = ({ game }) => {
  const MESSAGE_LENGTH_MAX = 50;
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const recipient = getRecipientFromGame(game, user);
  const lastMessageContent = () => {
    const { lastMessageSent } = game;
    if (lastMessageSent && lastMessageSent.content)
      return lastMessageSent.content?.length >= MESSAGE_LENGTH_MAX
        ? lastMessageSent.content?.slice(0, MESSAGE_LENGTH_MAX).concat('...')
        : lastMessageSent.content;
    return null;
  };


  return (
    <>
      <GameSidebarItemStyle
        onClick={() => navigate(`/games/${game.id}`)}
        selected={parseInt(id!) === game.id}
      >
        <img
          src={ defaultAvatar }
          alt="avatar"
          className={styles.gameAvatar}
        />
        <GameSidebarItemDetails>
          <span className="gameName">
            {`${recipient?.firstName} ${recipient?.lastName}`}
          </span>
          <span className="gameLastMessage">
            {lastMessageContent()}
          </span>
        </GameSidebarItemDetails>
      </GameSidebarItemStyle>
    </>
  );
};
