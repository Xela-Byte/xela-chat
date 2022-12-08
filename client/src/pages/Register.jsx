import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import LogoImg from '../assets/logo.png';
import { registerRoute } from '../utils/APIRoutes';
import LoadingComponent from '../reuseables/LoadingComponent';
import useGetWindowWidth from '../hooks/useWindowSize';
import {
  containerVariant,
  buttonVariant,
} from '../animationVariants/variants';

// ~ Styled Components ~!

const Centering = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RegisterWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  background: linear-gradient(180deg, #2b2b2b, #1e1e1e);
  ${Centering}
`;

const RegisterContainer = styled.div`
  width: 35%;
  height: 90%;
  background: #0f0f0f;
  min-height: 500px;
  padding: 20px;
  border-radius: 20px;
  @media screen and (max-width: 480px) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
  @media screen and (min-width: 481px) and (max-width: 768px) {
    width: 70%;
  }
`;

const LogoWrapper = styled.div`
  width: 70%;
  height: 15%;
  ${Centering}
  gap: 10%;
  min-height: 70px;
  @media screen and (max-width: 370px) {
    margin: auto;
  }
`;

const Logo = styled.img`
  width: 25%;
  height: 90%;
  border-radius: 50%;
  object-fit: cover;
  @media screen and (max-width: 370px) {
    width: 50px;
    height: 50px;
  }
  @media screen and (min-width: 371px) and (max-width: 990px) {
    width: 80px;
    height: 80px;
  }
  @media screen and (min-width: 991px) and (max-width: 1300px) {
    width: 100px;
    height: 100px;
  }
`;

const LogoText = styled.p`
  font-size: 5vh;
  color: white;
  font-weight: 600;
`;

const InputFieldWrapper = styled.form`
  font-family: 'Edu VIC WA NT Beginner', sans-serif;
  width: 80;
  height: 65%;
  padding: 5%;
  display: flex;
  gap: 10%;
  flex-direction: column;
  input {
    font-family: 'Nexa', sans-serif;
    width: 100%;
    height: 50px;
    background: transparent;
    padding: 0.7rem;
    border: 0.15rem solid #9995f4;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    color: white;
    cursor: pointer;
    &:focus {
      border: 0.15rem solid #794afa;
      outline: none;
    }
  }
  .password-reveal-icon {
    position: absolute;
    color: white;
    left: 85%;
    cursor: pointer;
    margin: 8px;
    font-size: 1.5rem;
  }
`;

const InputField = styled.input``;

const RegisterButton = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  padding: 5px;
  border-radius: 0.4rem;
  background: #794afa;
  color: #000;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Cairo', sans-serif;
  margin-left: calc((100% - 100px) / 2);
`;

const SignReferContainer = styled.div`
  width: 100%;
  height: 100px;
  ${Centering}
  color: whitesmoke;
  padding: 10px;
  text-transform: capitalize;
  font-size: 1.2rem;
  margin-top: 10px;
  a {
    text-decoration: none;
    margin: 10px;
    text-transform: uppercase;
    font-weight: 600;
    &:active {
      color: #a786ff;
    }
    &:hover {
      color: #8f68fa;
    }
  }
  @media screen and (max-width: 699px) {
    font-size: 1rem;
    flex-direction: column;
    margin-top: 10%;
  }
  @media screen and (max-width: 409px) {
    font-size: 1rem;
    flex-direction: column;
  }
  @media screen and (min-width: 481px) and (max-width: 699px) {
    font-size: 1rem;
    flex-direction: column;
  }
`;

const Register = () => {
  // ~ Input Functionalities And Data Retrieval ~

  //  Password Reveal
  const [passwordReveal, setPasswordReveal] = useState(false);
  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let windowWidth = useGetWindowWidth().innerWidth;

  // useEffect(() => {
  //   if (localStorage.getItem('XelaChat-User')) {
  //     navigate('/');
  //   }
  // }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { userName, password, email } = values;
      const { data } = await axios
        .post(registerRoute, {
          userName,
          email,
          password,
        })
        .then(navigate('/login'))
        .catch((err) => {
          console.log(err);
        });
      if (data.status === false) {
        toast.error(data.msg, ToastifyProps);
        setIsLoading(false);
      }
      if (data.status === true) {
        localStorage.setItem('XelaChat-User', JSON.stringify(data.user));
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // Toastify Props

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

  const handleValidation = () => {
    const { userName, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error(`Password and Confirm Password Doesn't Match`, ToastifyProps);
      setIsLoading(false);
      return false;
    } else if (userName.length < 4) {
      toast.error(
        `UserName Should Be Greater Than Four Characters`,
        ToastifyProps
      );
      setIsLoading(false);
      return false;
    } else if (password.length < 8) {
      toast.error(
        `Password Should Be At Least Eight Characters`,
        ToastifyProps
      );
      setIsLoading(false);
      return false;
    } else if (email === '') {
      toast.error(`Email is Required!`, ToastifyProps);
      setIsLoading(false);
      return false;
    }
    return true;
  };
  const { email, password, confirmPassword } = values;

  return (
    <RegisterWrapper>
      {isLoading ? <LoadingComponent /> : ''}
      <RegisterContainer
        as={motion.div}
        variants={containerVariant}
        initial='initial'
        whileInView='animate'
        transition={{
          type: 'spring',
          stiffness: 100,
        }}
      >
        <LogoWrapper>
          <Logo src={LogoImg} />
          <LogoText>XelaChat!</LogoText>
        </LogoWrapper>
        <InputFieldWrapper
          onSubmit={(e) => handleSubmit(e)}
          autoComplete='new-password'
        >
          <InputField
            name='userName'
            type='text'
            placeholder='UserName'
            onChange={(e) => handleChange(e)}
            autoComplete='new-password'
          />
          <InputField
            name='email'
            type={'email'}
            placeholder='Email'
            onChange={(e) => handleChange(e)}
            value={email}
          />

          <div style={{ position: 'relative' }}>
            {passwordReveal ? (
              <i
                className='icon bi-eye-slash password-reveal-icon'
                onClick={() => setPasswordReveal(!passwordReveal)}
              ></i>
            ) : (
              <i
                className='icon bi-eye password-reveal-icon'
                onClick={() => setPasswordReveal(!passwordReveal)}
              ></i>
            )}
            <InputField
              name='password'
              placeholder='Password'
              type={passwordReveal ? 'text' : 'password'}
              onChange={(e) => handleChange(e)}
              value={password}
              autoComplete='new-password'
            />
          </div>

          <div style={{ position: 'relative' }}>
            {passwordReveal ? (
              <i
                className='icon bi-eye-slash password-reveal-icon'
                onClick={() => setPasswordReveal(!passwordReveal)}
              ></i>
            ) : (
              <i
                className='icon bi-eye password-reveal-icon'
                onClick={() => setPasswordReveal(!passwordReveal)}
              ></i>
            )}
            <InputField
              name='confirmPassword'
              placeholder='Confirm Password'
              type={passwordReveal ? 'text' : 'password'}
              onChange={(e) => handleChange(e)}
              value={confirmPassword}
            />
          </div>

          <RegisterButton
            type='submit'
            onClick={() => setIsLoading(true)}
            as={motion.button}
            variants={buttonVariant}
            initial='initial'
            animate='animate'
          >
            Register!
          </RegisterButton>
        </InputFieldWrapper>

        <SignReferContainer>
          already have an account? <Link to='/login'>sign in!</Link>
        </SignReferContainer>
      </RegisterContainer>
      <ToastContainer />
    </RegisterWrapper>
  );
};

export default Register;
