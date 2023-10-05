import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  button {
    cursor: pointer;
  }

  .custom-slick-arrow-right {
    font-size: 4rem;
    color: #FAE13E;
    right: -120px;
    line-height: 0;
    position: absolute;
    top: 50%;
    display: block;
    padding: 0;
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
  }

  .custom-slick-arrow-left {
    font-size: 4rem;
    color: #FAE13E;
    left: -120px;
    line-height: 0;
    position: absolute;
    top: 50%;
    display: block;
    padding: 0;
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
  }

  .lazy-load-image {
    border-radius: 50%;
  }

  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
`

export const Container = styled.div`
  overflow-x: hidden;
`

export const HeaderWrapper = styled.div`
  height: 80px;
`