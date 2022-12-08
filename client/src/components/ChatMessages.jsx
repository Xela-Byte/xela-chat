import { useState, useEffect, useRef } from 'react';
import { format } from 'timeago.js';
import styled from 'styled-components';
import { Centering } from '../pages/Login';
import { v4 as uuidv4 } from 'uuid';
import useGetWindowWidth from '../hooks/useWindowSize';

const ChatMessageContainer = styled.div`
  width: 100%;
  height: 85%;
  max-height: 500px;
  overflow-x: hidden;
  padding: 1rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.2rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #997af0;
    width: 0.1rem;
    border-radius: 1rem;
  }
  color: white;
  .ChatMessageWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .ChatMessageWrapper > .sender {
    background: #7a4cfa;
    align-self: flex-end;
  }
  .ChatMessageWrapper > .senderTime {
    align-self: flex-end;
    display: none;
  }
  .ChatMessageWrapper > .senderTime.timestamp {
    display: block;
  }
  .ChatMessageWrapper > .receiverTime {
    align-self: flex-start;
    display: none;
  }
  .ChatMessageWrapper > .receiverTime.timestamp {
    display: block;
  }
`;

const ChatMessage = styled.div`
  width: fit-content;
  max-width: 80%;
  padding: 0.7rem;
  background: #997af0;
  border-radius: 2rem;
  position: relative;
  ${Centering}
  cursor: pointer;
  margin-bottom: 5px;
  @media screen and (max-width: 990px) {
    min-width: fit-content;
  }
`;

const ChatText = styled.p`
  font-family: 'Nexa', sans-serif;
`;

const ChatTime = styled.div`
  ${Centering}
  text-align:center;
  font-size: 14px;
  font-weight: 400;
`;

const ChatMessages = ({ messages }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(undefined);
  const scrollRef = useRef(null);
  let windowWidth = useGetWindowWidth().innerWidth;
  useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  return (
    <ChatMessageContainer>
      {chatMessages.map((chatMessage, index) => {
        const { fromSelf, message, time } = chatMessage;
        return (
          <div className='ChatMessageWrapper' key={uuidv4()} ref={scrollRef}>
            <ChatMessage
              key={index}
              className={fromSelf ? 'sender' : 'receiver'}
              onClick={() => {
                if (windowWidth < 990) {
                  setSelectedMessage(index);
                } else {
                  setSelectedMessage(-1);
                }
              }}
              onPointerLeave={() => setSelectedMessage(-1)}
            >
              <ChatText>{message}</ChatText>
            </ChatMessage>
            <ChatTime
              className={`${fromSelf ? 'senderTime' : 'receiverTime'} ${
                selectedMessage === index ? 'timestamp' : ''
              }`}
            >
              {format(time)}
            </ChatTime>
          </div>
        );
      })}
    </ChatMessageContainer>
  );
};

export default ChatMessages;
