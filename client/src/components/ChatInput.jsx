import { useState } from 'react';
import styled from 'styled-components';
import { Centering } from '../pages/Login';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

const ChatInputContainer = styled.div`
  width: 100%;
  height: 8%;
  ${Centering}
  gap: 2%;
  padding: 0 2% 0 2%;
  position: relative;
  .emoji-picker-react {
    left: 30px;
    top: -350px;
    width: 25%;
    box-shadow: none;
    border: 2px solid #9186f3;
    position: absolute;
    background: #551ff8;
    .emoji-scroll-wrapper::-webkit-scrollbar {
      width: 0.2rem;
    }
    .emoji-scroll-wrapper::-webkit-scrollbar-thumb {
      background: #997af0;
      width: 0.1rem;
      border-radius: 1rem;
    }
    .emoji-categories {
      button {
        filter: contrast(0);
      }
    }
  }
  .emoji-group:before {
    border-radius: 4rem;
    margin-top: 5px;
    position: static;
    font-family: 'Nexa', sans-serif;
    text-align: center;
    background: #6938fd;
  }
  .emoji-search {
    font-family: 'Cairo', sans-serif;
    background: transparent;
    text-transform: lowercase;
    border: 2px solid #9186f3;
    color: #fff;
    :focus {
      outline: none;
    }
  }
  @media screen and (max-width: 990px) {
    .emoji-picker-react {
      width: 90%;
      height: 250px;
      left: 5%;
      top: -250px;
    }
  }
  @media screen and (max-width: 480px) {
    height: 10%;
  }
`;

const EmojiPicker = styled.div`
  width: 5%;
  height: 100%;
  ${Centering}
  font-size:3vh;
  color: #ffc300;
  cursor: pointer;
`;

const ChatInpuTForm = styled.form`
  width: 90%;
  height: 90%;
  ${Centering}
  gap: 5%;
`;

const ChatInputter = styled.textarea`
  width: 80%;
  height: 100%;
  border-radius: 2rem;
  padding: 1rem;
  font-family: 'Nexa', sans-serif;
  background: transparent;
  border: 0.15rem solid #9995f4;
  color: white;
  &:focus {
    border: 0.15rem solid #794afa;
    outline: none;
  }
  &::-webkit-scrollbar {
    width: 0rem;
  }
  &::-webkit-scrollbar-thumb {
    width: 0rem;
  }
`;
const ChatSendBtn = styled.button`
  width: 10%;
  height: 100%;
  background: #794afa;
  border: none;
  border-radius: 2rem;
  font-size: 3.5vh;
  ${Centering}
  color: #c2b0f5;
  cursor: pointer;

  @media screen and (max-width: 480px){
    width: 20%;
  }
`;

const ChatInput = ({ handleSendMsg }) => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const emojiPickerToggler = () => {
    setEmojiPicker(!emojiPicker);
  };

  const handleEmojiClick = (e, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  const notEnterSubmit = (e) => {
    let key = e.charCode || e.keyCode || 0;
    if (key === 13) {
      e.preventDefault();
    }
  };
  return (
    <ChatInputContainer>
      <EmojiPicker>
        <BsEmojiSmileFill
          onClick={() => {
            emojiPickerToggler();
            setShowEmojiPicker(true);
          }}
        />
      </EmojiPicker>
      <div
        className=''
        onPointerLeave={() => setShowEmojiPicker(false)}
        style={{
          display: showEmojiPicker ? 'block' : 'none',
        }}
      >
        {emojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
      </div>
      <ChatInpuTForm onSubmit={(e) => sendChat(e)}>
        <ChatInputter
          placeholder='Type a message!'
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        ></ChatInputter>
        <ChatSendBtn type='submit' onClick={(e) => notEnterSubmit(e)}>
          <IoMdSend />
        </ChatSendBtn>
      </ChatInpuTForm>
    </ChatInputContainer>
  );
};

export default ChatInput;
