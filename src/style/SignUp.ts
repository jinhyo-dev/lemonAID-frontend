import styled from 'styled-components';

export const ImageContainer = styled.div`
  background: #FFFBD4;
  width: 42.5%;
  height: 100%;
  
  @media (max-width: 750px) {
    display: none;
  }
`;

export const MainTag = styled.main`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;

  @media (max-width: 750px) {
    height: auto;
  }
`;

export const FormContainer = styled.div`
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

  @media (max-width: 750px) {
    padding: 2rem;
    width: 100%;
  }

  & input[type='text'], & input[type='password'], & input[type='email'], & input[type='tel'], .file-label {
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
    
    @media (max-width: 500px) {
      font-size: 13px;
    }
  }

  & p {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 12px;
    
    @media (max-width: 500px) {
      font-size: 13px;
    }
    
    & > span {
      color: #e73b3b;
    }
  }

  & > form {
    height: 84%;
    max-height: 55rem;
    width: 416px;
    padding: 0 5px;
    
    @media (max-width: 750px) {
      height: 830px;
      max-height: none;
      overflow-y: hidden;
    }

    * {
      font-family: 'KoPubWorldDotumBold', sans-serif;
    }

    & > .title {
      font-size: 28px;
      font-weight: 700;
    }

    & > .sub-title {
      margin: 1rem 0 35px;
      font-size: 14px;

      & > span {
        cursor: pointer;
        margin-left: .2rem;
        color: #5BCFCF;
      }
    }

    & > .back-button {
      cursor: pointer;
      margin-top: 15px;
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
      }

      .radio-button__custom {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 13px;
        height: 13px;
        border-radius: 50%;
        border: 2px solid #555;
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
        
        & > input[type='file'] {
          display: none;
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
          color: #000;
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

export const CustomSelect = styled.select`
    border-radius: 10px;
    border: 1px solid #B2B1AD;
    box-sizing: border-box;
    background: #fff;
    font-size: 15px;
    text-align: center;
    height: 50px;
    width: 30%;

  & > option[value=""][disabled] {
    display: none;
  }
`

export const FileLabel = styled.label<{$selected: boolean}>`
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  color: ${({ $selected }) => $selected ? '#000' : '#ACACAC'};

  & > span {
    &:first-child {
      width: 94%;
      padding-right: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:last-child {
      width: 6%;
      display: ${({ $selected }) => $selected ? 'flex' : 'none'};
      align-items: center;
      justify-content: center;
      cursor: pointer;

      & > svg {
        color: #e07676;
        font-size: 20px;
      }
    }
  }
`