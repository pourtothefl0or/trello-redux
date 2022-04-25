import React from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../store';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../../ui';
import { LoginContainer, LoginTitle, LoginForm } from './styles';

interface LoginFields {
  username: string;
}

export const Login: React.FC = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm<LoginFields>();

  const handleAddUser = handleSubmit((data: LoginFields) => {
    dispatch(addUser({ name: data.username }));
    reset();
  });

  return (
    <section>
      <LoginContainer>
        <LoginTitle>TRELLO</LoginTitle>
        <LoginForm onSubmit={handleAddUser}>
          <Input
            type="text"
            placeholder="Write your name..."
            {...register('username', { required: true, })}
          />
          <Button type="submit">Enter</Button>
        </LoginForm>
      </LoginContainer>
    </section>
  )
}
