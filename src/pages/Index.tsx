import React from 'react';
import { Board, Login } from '../pageComponents/Index';
import { useSelector } from 'react-redux';
import { selectUser } from '../store';

export const Index: React.FC = () => {
  const user = useSelector(selectUser);

  return (
    <>
      {
        Object.keys(user).length === 0
          ? <Login />
          : <Board />
      }
    </>
  )
}
