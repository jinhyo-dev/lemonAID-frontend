import Header from '../components/Header.tsx';
import styled from 'styled-components';
import Slider from 'react-slick';
import picture1 from '../assets/images/MainBanner/picture-1.png';
import picture2 from '../assets/images/MainBanner/picture-2.png';
import picture3 from '../assets/images/MainBanner/picture-3.png';
import picture4 from '../assets/images/MainBanner/picture-4.png';
import picture5 from '../assets/images/MainBanner/picture-5.png';

import mobilePicture1 from '../assets/images/MobileBanner/1.png';
import mobilePicture2 from '../assets/images/MobileBanner/2.png';
import mobilePicture3 from '../assets/images/MobileBanner/3.png';
import mobilePicture4 from '../assets/images/MobileBanner/4.png';
import mobilePicture5 from '../assets/images/MobileBanner/5.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow } from '../components/NextArrow.tsx';
import { PrevArrow } from '../components/PrevArrow.tsx';
import { HeaderWrapper } from '../style/global.ts';
import React, { useEffect, useState } from 'react';
import { AuthProps } from '../interface/AuthProps.ts';
import { debounce } from 'lodash';

const Main: React.FC<AuthProps> = ({ authorized, permission }) => {
  const [imageList, setImageList] = useState<any>([]);
  const [screenWidth, setScreenWidth] = useState<number>(1920);

  const handleResize = debounce(() => {
    setScreenWidth(window.innerWidth);
  }, 200);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setImageList(screenWidth >= 750 ? [picture1, picture2, picture3, picture4, picture5] :
      [mobilePicture1, mobilePicture2, mobilePicture3, mobilePicture4, mobilePicture5]);
  }, [screenWidth]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Container>
      <HeaderWrapper>
        <Header authorized={authorized} permission={permission} />
      </HeaderWrapper>
      <MainTag>
        <ImageContainer>
          <Slider {...settings}>
            {imageList.map((value: any, index: number) => (
              <Image src={value} key={index} />
            ))}
          </Slider>
        </ImageContainer>
      </MainTag>
    </Container>
  );
};

const Container = styled.div`
  overflow-x: hidden;
  min-width: 1360px;

  @media (max-width: 750px) {
    min-width: 0;
  }
`;

const MainTag = styled.main`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 500px) {
    height: calc(100vh - 60px);
  }
`;

const ImageContainer = styled.div`
  width: 90rem;
  height: 44rem;
  border-radius: 10px;

  @media (max-width: 750px) {
    width: 80%;
    height: auto;
    margin-bottom: 80px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export default Main;