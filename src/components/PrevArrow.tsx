import { BsChevronLeft } from 'react-icons/bs';

interface ArrowProps {
  onClick?: () => void;
}

export const PrevArrow: React.FC<ArrowProps> = (props: ArrowProps) => {
  const {onClick} = props;
  return <BsChevronLeft className={'custom-slick-arrow-left'} onClick={onClick}/>
}