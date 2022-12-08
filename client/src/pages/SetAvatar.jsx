import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../assets/loading.svg';
import { setAvatarRoute } from '../utils/APIRoutes';
import { Centering } from './Login';
import useGetWindowWidth from '../hooks/useWindowSize';

const SetAvatar = () => {
  const navigate = useNavigate();
  const api = 'https://api.multiavatar.com/45678945';
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  // useEffect(() => {
  //   if (!localStorage.getItem('XelaChat-User')) {
  //     navigate('/login');
  //   }
  // }, [navigate]);

  let windowWidth = useGetWindowWidth().innerWidth;
  const ToastifyProps = {
    position: windowWidth < 990 ? 'top-right' : 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
    style: {
      borderRadius: '10px',
      fontFamily: 'Cairo',
    },
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please Select An Avatar!', ToastifyProps);
    } else {
      const user = await JSON.parse(localStorage.getItem('XelaChat-User'));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('XelaChat-User', JSON.stringify(user));
        toast.success('Avatar Set Successfully!', ToastifyProps);
        navigate('/');
      } else {
        toast.error(
          'Error Setting Avatar. Please Try Again Later',
          ToastifyProps
        );
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 10000)}?apikey=HNa9c5j7iWYUgJ`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const HeroTextWrapper = styled.div`
    width: 90%;
    height: 30vh;
    ${Centering}margin: auto;
  `;

  const HeroText = styled.p`
    font-size: 5vh;
    font-weight: 600;
    text-transform: capitalize;
    text-align: center;
  `;

  const LoadingImageWrapper = styled.div`
    width: 90%;
    height: 30vh;
    ${Centering}
    padding: 10%;
    margin: auto;
  `;

  const LoadingImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
  `;

  const AvatarImage = styled.img`
    width: ${windowWidth < 990 ? '70px' : '100px'};
    height: ${windowWidth < 990 ? '70px' : '100px'};
    border: 0.4rem solid transparent;
    transition: 0.4s ease-in-out;
    object-fit: cover;
    cursor: pointer;
  `;

  const AvatarWrapper = styled.div`
    width: 90%;
    padding: 5%;
    height: 30vh;
    ${Centering}
    gap: ${windowWidth < 990 ? '5%' : '10%'};
    margin: auto;
    transition: 0.4s ease-in-out;
    .selected > img {
      border-radius: 50%;
      border: 0.4rem solid #997af0;
      object-fit: cover;
    }
  `;

  const SetButtonWrapper = styled.div`
    width: 100%;
    height: 30vh;
    ${Centering}
  `;

  const SetButton = styled.button`
    width: 20%;
    min-width: 300px;
    border-radius: 1rem;
    height: 70px;
    background: #997af0;
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Cairo', sans-serif;
    text-transform: capitalize;
    border: none;
    &:hover {
      transition: 0.4s ease-in-out;
      background: #7f55f3;
    }
  `;

  return (
    <div>
      <HeroTextWrapper>
        <HeroText>pick an avatar as your profile picture</HeroText>
      </HeroTextWrapper>

      {isLoading ? (
        <LoadingImageWrapper>
          <LoadingImage src={Loader} />
        </LoadingImageWrapper>
      ) : (
        <AvatarWrapper>
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? 'selected' : ''
                }`}
              >
                <AvatarImage
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt=''
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </AvatarWrapper>
      )}
      <SetButtonWrapper>
        <SetButton onClick={() => setProfilePicture()}>
          set as profile picture
        </SetButton>
      </SetButtonWrapper>
      <ToastContainer />
    </div>
  );
};

export default SetAvatar;
