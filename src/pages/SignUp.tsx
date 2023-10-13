import Header from '../components/Header.tsx';
import { Container, HeaderWrapper } from '../style/global.ts';
import { useNavigate } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import React, { FormEvent, useEffect, useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { SignUpTypingProps } from '../interface/SignUpProps.ts';
import { CustomSelect, FormContainer, ImageContainer, MainTag } from '../style/SignUp.ts';
import { phoneNumberFormatter } from '../utils/phoneNumberFormatter.ts';

const SignUp = () => {
  const navigate = useNavigate();
  const transitionDuration = 400;
  const transitionStyles: { [key: string]: React.CSSProperties } = {
    entering: { opacity: 0, transform: 'translateX(10px)' },
    entered: { opacity: 1, transform: 'translateX(0)' },
    exiting: { opacity: 0, transform: 'translateX(-10px)' },
    exited: { opacity: 0, transform: 'translateX(-10px)', display: 'none' },
  };
  const currentYear = new Date().getFullYear();
  const [pageNumber, setPageNumber] = useState<0 | 1>(0);
  const [signUpData, setSignUpData] = useState<SignUpTypingProps>({
    confirmPassword: '', dateOfBirth: '', email: '', firstName: '', gender: undefined, lastName: '', monthOfBirth: '', nationality: '', occupation: '', password: '', phoneNumber: '', videoMessenger: '', videoMessengerId: '', visaCode: '', yearOfBirth: '',
  });

  const handleSignUpData = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setSignUpData(prevState => ({
      ...prevState,
      [name]: name === 'phoneNumber' ? phoneNumberFormatter(value) : value,
    }));
  };

  const handleSubmitPage = (e: FormEvent, page: 0 | 1) => {
    e.preventDefault();

    const formElement = document.getElementById('form-1') as HTMLFormElement;
    console.log(formElement.checkValidity())
    formElement.checkValidity() && setPageNumber(page);
  };



  useEffect(() => {
    console.log(signUpData);
  }, [signUpData]);

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
              <form style={{ ...transitionStyles[state], transitionDuration: `${transitionDuration}ms` }}
                    id={'form-1'} onSubmit={e => handleSubmitPage(e, 1)}>
                <div className={'title'}>Sign Up</div>
                <div className={'sub-title'}>
                  Already Have an Account?
                  <span onClick={() => navigate('/sign-in')}>Sign In</span>
                </div>

                <div className={'input-container'}>
                  <div className={'double-input-container'}>
                    <p>First Name <span>*</span></p>
                    <input type={'text'} onChange={handleSignUpData} name={'firstName'} required={true}
                           value={signUpData.firstName} />
                  </div>

                  <div className={'double-input-container'}>
                    <p>Last Name <span>*</span></p>
                    <input type={'text'} onChange={handleSignUpData} name={'lastName'} required={true}
                           value={signUpData.lastName} />
                  </div>
                </div>

                <div className={'input-container'}>
                  <div className={'single-input-container'}>
                    <p>Email Address <span>*</span></p>
                    <input type={'email'} onChange={handleSignUpData} name={'email'} required={true}
                           value={signUpData.email} />
                    <div className={'verify'}>Click Here to Verify Your Email</div>
                  </div>
                </div>

                <div className={'input-container'}>
                  <div className={'double-input-container'}>
                    <p>Password <span>*</span></p>
                    <input type={'password'} onChange={handleSignUpData} name={'password'} required={true}
                           value={signUpData.password} />
                  </div>

                  <div className={'double-input-container'}>
                    <p>Confirm Password <span>*</span></p>
                    <input type={'password'} onChange={handleSignUpData} name={'confirmPassword'} required={true}
                           value={signUpData.confirmPassword} />
                  </div>
                </div>

                <div className={'input-container'}>
                  <div className={'single-input-container'}>
                    <p>Phone Number <span>*</span></p>
                    <input type={'tel'} onChange={handleSignUpData} name={'phoneNumber'} required={true}
                           value={signUpData.phoneNumber} />
                  </div>
                </div>

                <div className={'date-container'}>
                  <p>Date of Birth <span>*</span></p>
                  <div className={'date-input-container'}>
                    <CustomSelect $value={signUpData.dateOfBirth} value={signUpData.dateOfBirth} name={'dateOfBirth'}
                                  required={true} onChange={handleSignUpData}>
                      <option value={''} defaultChecked={true} disabled={true}>Date</option>
                      {[...Array(31)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </CustomSelect>

                    <CustomSelect $value={signUpData.monthOfBirth} value={signUpData.monthOfBirth} name={'monthOfBirth'}
                                  required={true} onChange={handleSignUpData}>
                      <option value={''} defaultChecked={true} disabled={true}>Month</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </CustomSelect>

                    <CustomSelect $value={signUpData.yearOfBirth} value={signUpData.yearOfBirth} name={'yearOfBirth'}
                                  required={true} onChange={handleSignUpData}>
                      <option value={''} defaultChecked={true} disabled={true}>Year</option>
                      {[...Array(currentYear - 1900 + 1)].map((_, i) => {
                        const year = currentYear - i;
                        return <option key={year} value={year}>{year}</option>;
                      })}
                    </CustomSelect>
                  </div>
                </div>

                <div className={'radio-container'}>
                  <p>Gender</p>
                  <div className='radio-buttons-container'>
                    <div className='radio-button'>
                      <input name='gender' id='male' value={'Male'} className='radio-button__input' type='radio'
                             onChange={handleSignUpData} />
                      <label htmlFor='male' className='radio-button__label'>
                        <span className='radio-button__custom' />
                        Male
                      </label>
                    </div>
                    <div className='radio-button'>
                      <input name='gender' id='female' value={'Female'} className='radio-button__input' type='radio'
                             onChange={handleSignUpData} />
                      <label htmlFor='female' className='radio-button__label'>
                        <span className='radio-button__custom' />
                        Female
                      </label>
                    </div>
                    <div className='radio-button'>
                      <input name='gender' id='other' value={'Other'} className='radio-button__input' type='radio'
                             onChange={handleSignUpData} />
                      <label htmlFor='other' className='radio-button__label'>
                        <span className='radio-button__custom' />
                        Other
                      </label>
                    </div>
                  </div>
                </div>

                <div className={'input-container'}>
                  <button type={'submit'}>Next Step</button>
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
                  <AiOutlineLeft /> Back
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
                    <input type={'text'} placeholder={'e.g. MH190M192'} />
                  </div>

                  <div className={'double-input-container'}>
                    <p>Occupation</p>
                    <input type={'text'} placeholder={'e.g. Graphic Designer'} />
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

export default SignUp;