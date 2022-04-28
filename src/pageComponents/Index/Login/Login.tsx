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
    formState: { errors, isValid },
  } = useForm<LoginFields>({ mode: 'onChange' });

  const dispatch = useDispatch();

  const handleAddUser = handleSubmit((data: LoginFields) => {
    dispatch(actions.user.addUser({
      id: Date.now(),
      name: data.username
    }));
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
          <Button
            type="submit"
            disabled={!isValid}
          >Enter</Button>
        </LoginForm>
      </LoginContainer>
    </section>
  );
};
