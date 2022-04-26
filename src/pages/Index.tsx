import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../store/ducks';
import { Board, Login } from '../pageComponents/Index';

export const Index: React.FC = () => {
  const user = useSelector(selectors.user.selectUser);

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
