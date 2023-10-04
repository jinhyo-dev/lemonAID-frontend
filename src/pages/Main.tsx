import Header from "../components/Header.tsx";
import styled from "styled-components";
import Slider from "react-slick";
import picture1 from '../assets/images/picture-1.png'
import picture2 from '../assets/images/picture-2.png'
import picture3 from '../assets/images/picture-3.png'
import picture4 from '../assets/images/picture-4.png'
import picture5 from '../assets/images/picture-5.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";

interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = (props: ArrowProps) => {
  const {onClick} = props;
  return <BsChevronRight className={'custom-slick-arrow-right'} onClick={onClick}/>
}

const PrevArrow: React.FC<ArrowProps> = (props: ArrowProps) => {
  const {onClick} = props;
  return <BsChevronLeft className={'custom-slick-arrow-left'} onClick={onClick}/>
}

const Main = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
  };

  return (
    <Container>
      <Header/>
      <MainTag>
        <ImageContainer>
          <Slider {...settings}>
            <Image src={picture1}/>
            <Image src={picture2}/>
            <Image src={picture3}/>
            <Image src={picture4}/>
            <Image src={picture5}/>
          </Slider>
        </ImageContainer>
      </MainTag>
    </Container>
  )
}

const Container = styled.div`
  overflow-x: hidden;
`

const MainTag = styled.main`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
`

const ImageContainer = styled.div`
  width: 90rem;
  height: 44rem;
  border-radius: 10px;
`

const Image = styled.img`
  width: 60rem;
  height: 100%;
  border-radius: 10px;
`

export default Main