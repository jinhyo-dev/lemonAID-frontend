import List from '../components/List/List.tsx';
import React from 'react';
import { AuthProps } from '../interface/AuthProps.ts';

const Parties: React.FC<AuthProps> = ({ authorized }) => {
  return (
    <List $type={'parties'} authorized={authorized} />
  );
};

export default Parties;