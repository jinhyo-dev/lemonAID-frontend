import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Tenada';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'KoPubWorldDotumBold';
    font-weight: 700;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/kopus/KoPubWorldDotumBold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/kopus/KoPubWorldDotumBold.eot?#iefix') format('embedded-opentype'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/kopus/KoPubWorldDotumBold.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/kopus/KoPubWorldDotumBold.woff') format('woff'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/kopus/KoPubWorldDotumBold.ttf') format("truetype");
    font-display: swap;
  }

  @font-face {
    font-family: 'KoPubWorldDotumLight';
    font-weight: 300;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/kopus/KoPubWorldDotumLight.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/kopus/KoPubWorldDotumLight.eot?#iefix') format('embedded-opentype'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/kopus/KoPubWorldDotumLight.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/kopus/KoPubWorldDotumLight.woff') format('woff'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/kopus/KoPubWorldDotumLight.ttf') format("truetype");
    font-display: swap;
  }
  
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

    @media (max-width: 750px) {
      font-size: 1.5rem;
      right: -9%;
    }
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
    
    @media (max-width: 750px) {
      font-size: 1.5rem;
      left: -9%;
    }
  }
  
  .custom-modal-arrow-left {
    position: fixed;
    font-size: 2rem;
    top: 9rem;
    cursor: pointer;
    color: #FAE13E;
    left: 2.5rem;
    z-index: 1;

    @media (max-width: 500px) {
      left: 1.5rem;
      font-size: 1.4rem;
    }
  }
  
  .custom-modal-arrow-right {
    position: fixed;
    font-size: 2rem;
    top: 9rem;
    cursor: pointer;
    color: #FAE13E;
    right: 2.5rem;
    z-index: 1;

    @media (max-width: 500px) {
      right: 1.5rem;
      font-size: 1.4rem;
    }
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

  @media (max-width: 500px) {
    height: 60px;
  }
`