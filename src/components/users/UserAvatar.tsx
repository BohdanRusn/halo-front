import React from 'react';
import { CDN_URL } from '../../utils/constants';
import { UserAvatarContainer } from '../../utils/styles';
import { User } from '../../utils/types';
import defaultAvatar from '../../assets/default_avatar.jpg';

type Props = {
  user: User;
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
};

export const UserAvatar: React.FC<Props> = ({ user, onClick }) => {
  const getProfilePicture = () => {
    const { profile } = user;
    return profile && profile.avatar
      ? CDN_URL.BASE.concat(profile.avatar)
      : defaultAvatar;
  };

  return (
    <UserAvatarContainer
      src={getProfilePicture()}
      alt="avatar"
      onClick={onClick}
    />
  );
};
