import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Centering } from './Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoutes } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import Messages from '../components/Messages';

const ChatWrapper = styled.div`
  width: 100%;
  height: 100vh;
  ${Centering}
  gap: 1rem;
`;

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #00000076;
  font-family: 'Cairo', sans-serif;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (max-width: 990px) {
    width: 100%;
    height: 100%;
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
`;

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrentUser() {
      if (!localStorage.getItem('XelaChat-User')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('XelaChat-User')));
        setIsLoaded(true);
      }
    }
    getCurrentUser();
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoutes}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate('/setAvatar');
        }
      }
    }
    fetchData();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <ChatWrapper>
      <ChatContainer>
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          currentChat && (
            <Messages currentChat={currentChat} currentUser={currentUser} />
          )
        )}
      </ChatContainer>
    </ChatWrapper>
  );
};

export default Chat;
