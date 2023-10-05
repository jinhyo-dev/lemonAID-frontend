import { BsChevronRight } from 'react-icons/bs';

interface ArrowProps {
  onClick?: () => void;
}

export const NextArrow: React.FC<ArrowProps> = (props: ArrowProps) => {
  const {onClick} = props;
  return <BsChevronRight className={'custom-slick-arrow-right'} onClick={onClick}/>
}