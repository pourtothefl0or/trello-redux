import React from 'react';
import { IUser } from '../types/interfaces';
import { Board, Login } from '../pageComponents/Index';
import { useLocalStorage } from '../customHooks';

export const Index: React.FC = () => {
  const [user, setUser] = useLocalStorage({}, 'user');

  const onAddUser = (name: string) => {
    const newUser: IUser = { id: 1, name: name };

    setUser(newUser);
  }

  return (
    <>
      {
        localStorage.user === undefined
          ? <Login onAddUser={onAddUser} />
          : <Board user={user} />
      }
    </>
  )
}
