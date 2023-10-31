import List from "../components/List/List.tsx";
import React from 'react';
import { AuthProps } from '../interface/AuthProps.ts';

const Tours:React.FC<AuthProps> = ({authorized, permission}) => {
  return (
    <List $type={'tour'} authorized={authorized} permission={permission}/>
  )
}

export default Tours