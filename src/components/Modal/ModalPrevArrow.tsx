import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import React from 'react';

interface ArrowProps {
  onClick?: () => void;
}

export const ModalPrevArrow: React.FC<ArrowProps> = (props: ArrowProps) => {
  const {onClick} = props;
  return <BsFillArrowLeftCircleFill className={'custom-modal-arrow-left'} onClick={onClick}/>
}