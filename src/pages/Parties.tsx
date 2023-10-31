import List from '../components/List/List.tsx';
import React from 'react';
import { AuthProps } from '../interface/AuthProps.ts';

const Parties: React.FC<AuthProps> = ({ authorized, permission }) => {
  return (
    <List $type={'parties'} authorized={authorized} permission={permission} />
  );
};

export default Parties;