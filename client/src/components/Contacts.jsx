import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import LogoImg from '../assets/logo.png';
import { Centering } from '../pages/Login';
import { chatTabVariant } from '../animationVariants/variants';

const ContactsWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: calc(100% - 50px);
  padding-bottom: 5%;
  ${Centering}
  flex-direction: column;
  @media screen and (max-width: 990px) {
    max-height: 100%;
  }
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  gap: 5%;
  padding: 5%;
  @media screen and (max-width: 479px) {
    flex-direction: column;
  }
`;

const Logo = styled.img`
  width: 20%;
  height: 80%;
  border-radius: 1rem;
  object-fit: cover;
  @media screen and (max-width: 479px) {
    width: 50px;
    height: 50px;
  }
`;

const LogoText = styled.p`
  font-size: 4vh;
  font-family: 'Edu VIC WA NT Beginner', sans-serif;
  font-weight: 600;
  @media screen and (max-width: 479px) {
    font-size: 2.5vh;
  }
`;

const ContactsContainer = styled.div`
  width: 100%;
  height: 70%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  margin: 5px;
  flex-direction: column;
  gap: 2%;
  &::-webkit-scrollbar {
    width: 0.2rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #997af0;
    width: 0.1rem;
    border-radius: 1rem;
  }
  .Selected {
    background: #551ff8;
  }
  @media screen and (max-width: 479px) {
    padding: 5px;
  }
`;

const Contact = styled.div`
  width: 95%;
  background: #997af0;
  height: 20%;
  display: flex;
  align-items: center;
  padding: 5%;
  gap: 5%;
  transition: 0.3s ease-in-out;
  border-radius: 0.5rem;
  cursor: pointer;
  @media screen and (max-width: 479px) {
    flex-direction: column;
  }
`;

const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  @media screen and (max-width: 479px) {
    width: 30px;
    height: 30px;
  }
`;

const UserName = styled.p`
  font-size: 2.5vh;
  font-weight: 600;
  font-family: 'Cairo', sans-serif;
`;

const CurrentUser = styled.div`
  width: 95%;
  height: 10%;
  margin-top: 10px;
  border-radius: 0.5rem;
  background: #9995f4;
`;

const CurrentUserContact = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 5%;
  padding: 5%;
  .User {
    @media screen and (max-width: 990px) {
      display: none;
      padding: 5px;
    }
  }
  @media screen and (max-width: 479px) {
    flex-direction: column;
  }
`;

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.userName);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <ContactsWrapper>
          <LogoWrapper>
            <Logo src={LogoImg}></Logo>
            <LogoText>XelaChat!</LogoText>
          </LogoWrapper>
          {contacts.length === 0 ? (
            <p>Loading ...</p>
          ) : (
            <ContactsContainer
              as={motion.div}
              initial={{
                opacity: 0.6,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                type: 'tween',
                when: 'beforeChildren',
                staggerChildren: 0.4,
              }}
            >
              {contacts.map((contact, index) => {
                return (
                  <Contact
                    className={index === currentSelected ? 'Selected' : ''}
                    key={index}
                    onClick={() => changeCurrentChat(index, contact)}
                    as={motion.div}
                    variants={chatTabVariant}
                    initial='initial'
                    animate='animate'
                  >
                   
                    <AvatarImage
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=''
                    />
                    <UserName>{contact.userName}</UserName>
                  </Contact>
                );
              })}
            </ContactsContainer>
          )}

          <CurrentUser>
            <CurrentUserContact key={currentUserName}>
              <AvatarImage
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt=''
              />
              You
              <UserName className='User'> : {currentUserName}</UserName>
            </CurrentUserContact>
          </CurrentUser>
        </ContactsWrapper>
      )}
    </>
  );
};

export default Contacts;
