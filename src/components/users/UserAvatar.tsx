import React from 'react';
import { UserAvatarContainer } from '../../utils/styles';
import defaultAvatar from '../../assets/default_avatar.jpg';

type Props = {
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
};

export const UserAvatar: React.FC<Props> = ({ onClick }) => {

  return (
    <UserAvatarContainer
      src={defaultAvatar}
      alt="avatar"
      onClick={onClick}
    />
  );
};
