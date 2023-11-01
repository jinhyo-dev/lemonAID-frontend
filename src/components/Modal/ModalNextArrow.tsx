import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import React from 'react';

interface ArrowProps {
  onClick?: () => void;
}

export const ModalNextArrow: React.FC<ArrowProps> = (props: ArrowProps) => {
  const {onClick} = props;
  return <BsFillArrowRightCircleFill className={'custom-modal-arrow-right'} onClick={onClick}/>
}