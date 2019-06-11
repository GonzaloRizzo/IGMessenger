import React from 'react';
import styled from 'styled-components';
import BackIcon from '../../components/Icons/BackIcon';
import UserPhoto from '../../components/UserPhoto';

const ChatHeader = ({ onBackClick, username, userPicURL }) => (
  <ChatHeader.Container>
    <ChatHeader.Button onClick={onBackClick}>
      <BackIcon />
    </ChatHeader.Button>
    <UserPhoto src={userPicURL} />
    <ChatHeader.Status>
      <div>
        <b>{username}</b>
      </div>
    </ChatHeader.Status>
  </ChatHeader.Container>
);

ChatHeader.Container = styled.div`
  display: flex;
  padding: 8px;
  border-bottom: 1px solid #efefef;
  height: 50px;

  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

ChatHeader.Button = styled.button`
  font-size: 22px;
  line-height: 1;

  svg {
    display: block;
  }
`;

ChatHeader.Status = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
`;

export default ChatHeader;
