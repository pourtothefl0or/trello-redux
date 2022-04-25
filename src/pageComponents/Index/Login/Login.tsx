import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { actions } from '../../../store/ducks';
import { Button, Input } from '../../../ui';
import { LoginContainer, LoginTitle, LoginForm } from './styles';

interface LoginFields {
  username: string;
}

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginFields>();

  const dispatch = useDispatch();

  const handleAddUser = handleSubmit((data: LoginFields) => {
    dispatch(actions.user.addUser({ name: data.username }));
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
            {...register('username',{ required: true, })}
            className={errors.username && 'error'}
          />
          <Button type="submit">Enter</Button>
        </LoginForm>
      </LoginContainer>
    </section>
  );
};
