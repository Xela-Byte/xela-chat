import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Centering } from '../pages/Login';
import { getAllMessageRoute, sendMessageRoute, host } from '../utils/APIRoutes';
import { io } from 'socket.io-client';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import Logout from './Logout';

const MessagesContainer = styled.div`
  width: 100%;
  height: 90%;
`;

const User = styled.div`
  width: 100%;
  height: 15%;
  ${Centering}
`;

const CurrentChatUser = styled.div`
  width: 75%;
  height: 100%;
  ${Centering}
  gap: 3%;
`;

const CurrentChatAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const CurrentChatUserName = styled.p`
  font-size: 3vh;
`;

const Messages = ({ currentChat, currentUser }) => {
  const [currentUserId, setCurrentUserId] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  useEffect(() => {
    setCurrentUserId(currentUser._id);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentChat) {
      async function getMessages() {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
      getMessages();
    }
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUserId,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit('send-message', {
      from: currentUserId,
      to: currentChat._id,
      message: msg,
    });

    const emittedMessages = [...messages];
    emittedMessages.push({ fromSelf: true, message: msg });
    setMessages(emittedMessages);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('message-receive', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((previous) => [...previous, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <MessagesContainer>
      <User>
        <CurrentChatUser>
          <CurrentChatAvatar
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt=''
          />
          <CurrentChatUserName>{currentChat.userName}</CurrentChatUserName>
        </CurrentChatUser>
        <Logout />
      </User>
      <ChatMessages
        currentChat={currentChat}
        currentUser={currentUser}
        messages={messages}
      />
      {currentUserId && <ChatInput handleSendMsg={handleSendMsg} />}
    </MessagesContainer>
  );
};

export default Messages;
