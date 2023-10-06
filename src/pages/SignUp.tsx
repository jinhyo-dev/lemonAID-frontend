import Header from '../components/Header.tsx';
import styled from 'styled-components';
import { Container, HeaderWrapper } from '../style/global.ts';
import { useNavigate } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';

const SignUp = () => {
  const navigate = useNavigate();
  const transitionDuration = 400;
  const transitionStyles: { [key: string]: React.CSSProperties } = {
    entering: { opacity: 0, transform: 'translateX(10px)' },
    entered: { opacity: 1, transform: 'translateX(0)' },
    exiting: { opacity: 0, transform: 'translateX(-10px)' },
    exited: { opacity: 0, transform: 'translateX(-10px)', display: 'none' },
  };

  const [pageNumber, setPageNumber] = useState<0 | 1>(0);

  return (
    <Container>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <MainTag>
        <ImageContainer />

        <FormContainer>
          <Transition in={pageNumber === 0} timeout={transitionDuration}>
            {(state) => (
              <form style={{ ...transitionStyles[state], transitionDuration: `${transitionDuration}ms` }}>
                <div className={'title'}>Sign Up</div>
                <div className={'sub-title'}>
                  Already Have an Account?
                  <span onClick={() => navigate('/sign-in')}>Sign In</span>
                </div>

                <div className={'input-container'}>
                  <div className={'double-input-container'}>
                    <p>First Name <span>*</span></p>
                    <input type={'text'} />
                  </div>

                  <div className={'double-input-container'}>
                    <p>Last Name <span>*</span></p>
                    <input type={'text'} />
                  </div>
                </div>

                <div className={'input-container'}>
                  <div className={'single-input-container'}>
                    <p>Email Address <span>*</span></p>
                    <input type={'email'} />
                    <div className={'verify'}>Click Here to Verify Your Email</div>
                  </div>
                </div>

                <div className={'input-container'}>
                  <div className={'double-input-container'}>
                    <p>Password <span>*</span></p>
                    <input type={'password'} />
                  </div>

                  <div className={'double-input-container'}>
                    <p>Confirm Password <span>*</span></p>
                    <input type={'password'} />
                  </div>
                </div>

                <div className={'input-container'}>
                  <div className={'single-input-container'}>
                    <p>Phone Number <span>*</span></p>
                    <input type={'tel'} />
                  </div>
                </div>

                <div className={'date-container'}>
                  <p>Date of Birth <span>*</span></p>
                  <div className={'date-input-container'}>
                    <select>
                      <option>ads</option>
                      <option>ads</option>
                      <option>ads</option>
                    </select>

                    <select>
                      <option>ads</option>
                      <option>ads</option>
                      <option>ads</option>
                    </select>

                    <select>
                      <option>ads</option>
                      <option>ads</option>
                      <option>ads</option>
                    </select>
                  </div>
                </div>

                <div className={'radio-container'}>
                  <p>Gender</p>
                  <div className='radio-buttons-container'>
                    <div className='radio-button'>
                      <input name='radio-group' id='male' className='radio-button__input' type='radio' />
                      <label htmlFor='male' className='radio-button__label'>
                        <span className='radio-button__custom'></span>
                        Male
                      </label>
                    </div>
                    <div className='radio-button'>
                      <input name='radio-group' id='female' className='radio-button__input' type='radio' />
                      <label htmlFor='female' className='radio-button__label'>
                        <span className='radio-button__custom'></span>
                        Female
                      </label>
                    </div>
                    <div className='radio-button'>
                      <input name='radio-group' id='other' className='radio-button__input' type='radio' />
                      <label htmlFor='other' className='radio-button__label'>
                        <span className='radio-button__custom'></span>
                        Other
                      </label>
                    </div>
                  </div>
                </div>

                <div className={'input-container'}>
                  <button onClick={() => setPageNumber(1)} type={'button'}>Next Step</button>
                </div>
              </form>
            )}
          </Transition>

          <Transition in={pageNumber === 1} timeout={transitionDuration}>
            {(state) => (
              <form style={{ ...transitionStyles[state], transitionDuration: `${transitionDuration}ms` }}>
                <div className={'title'}>Sign Up</div>
                <div className={'sub-title'}>
                  Already Have an Account?
                  <span onClick={() => navigate('/sign-in')}>Sign In</span>
                </div>

                <div className={'back-button'} onClick={() => setPageNumber(0)}>
                  <AiOutlineLeft/> Back
                </div>

                <div className={'input-container'}>
                  <div className={'single-select-container'}>
                    <p>Nationality</p>
                    <select>
                      <option>Korea</option>
                      <option>Japan</option>
                    </select>
                  </div>
                </div>

                <div className={'input-container'}>
                  <div className={'double-input-container'}>
                    <p>Visa Code</p>
                    <input type={'text'} placeholder={'e.g. MH190M192'}/>
                  </div>

                  <div className={'double-input-container'}>
                    <p>Occupation</p>
                    <input type={'text'} placeholder={'e.g. Graphic Designer'}/>
                  </div>
                </div>
              </form>
            )}
          </Transition>
        </FormContainer>
      </MainTag>
    </Container>
  );
};

const ImageContainer = styled.div`
  background: #FFFBD4;
  width: 42.5%;
  height: 100%;
`;

const MainTag = styled.main`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
`;

const FormContainer = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  box-sizing: border-box;
  background: #fff;
  width: 57.5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;

  & input[type='text'], & input[type='password'], & input[type='email'], & input[type='tel'] {
    transition: all .1s;
    border-radius: 10px;
    border: 1px solid #B2B1AD;
    height: 50px;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    font-size: 15px;

    &:focus {
      border: none;
      outline: 2px solid #F7C324;
    }
  }

  & p {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 12px;

    & > span {
      color: #e73b3b;
    }
  }

  & > form {
    height: 84%;
    overflow-y: auto;
    width: 416px;

    * {
      font-family: 'Commissioner', sans-serif;
    }

    & > .title {
      font-size: 28px;
      font-weight: 700;
    }

    & > .sub-title {
      margin: 1rem 0 40px;
      font-size: 14px;

      & > span {
        cursor: pointer;
        margin-left: .2rem;
        color: #5BCFCF;
      }
    }

    & > .back-button {
      cursor: pointer;
      margin-top: -15px;
      color: #817C70;
      font-size: 16px;

      & > svg {
        margin-bottom: -.1rem;
      }
    }

    & > .date-container {
      width: 100%;
      height: auto;
      margin-top: 20px;

      & > .date-input-container {
        width: 100%;
        display: flex;
        justify-content: space-between;

        & > select {
          border-radius: 10px;
          border: 1px solid #B2B1AD;
          box-sizing: border-box;
          background: #fff;
          font-size: 15px;
          text-align: center;
          height: 50px;
          width: 30%;
        }
      }
    }

    & > .radio-container {
      width: 100%;
      height: auto;
      margin-top: 20px;

      .radio-buttons-container {
        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 40px;
      }

      .radio-button {
        display: inline-block;
        position: relative;
        cursor: pointer;
      }

      .radio-button__input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }

      .radio-button__label {
        display: inline-block;
        padding-left: 30px;
        margin-bottom: 10px;
        position: relative;
        font-size: 16px;
        color: #000;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
      }

      .radio-button__custom {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid #555;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
      }

      .radio-button__input:checked + .radio-button__label .radio-button__custom {
        transform: translateY(-50%);
        border: 5px solid #4c8bf5;
        color: #4c8bf5;
      }

      .radio-button__input:checked + .radio-button__label {
        color: #4c8bf5;
      }

      .radio-button__label:hover .radio-button__custom {
        transform: translateY(-50%) scale(1);
        border-color: #4c8bf5;
        box-shadow: 0 0 10px #4c8bf580;
      }
    }

    & > .input-container {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;

      & .verify {
        cursor: pointer;
        margin-top: 10px;
        font-size: 13px;
        text-decoration: underline;
      }

      & > .double-input-container {
        width: 48%;

        & > input {
          width: 100%;
        }
      }

      & > .single-input-container {
        width: 100%;

        & > input {
          width: 100%;
        }
      }

      & > .single-select-container {
        width: 100%;

        & > select {
          border-radius: 10px;
          border: 1px solid #B2B1AD;
          box-sizing: border-box;
          background: #fff;
          font-size: 15px;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          height: 50px;
          width: 100%;
        }
      }

      & > button {
        width: 100%;
        height: 55px;
        border-radius: 10px;
        font-size: 20px;
        font-weight: 500;
        background: #FAE13E;
        color: #000;
        border: none;
        transition: background-color .2s;

        &:hover {
          background: #e1cc38;
        }
      }
    }
  }
`;

export default SignUp;