import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../../store";
import { Button, Input } from "../../../ui";
import { LoginContainer, LoginTitle, LoginForm } from "./styles";

export const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const handleAddUser: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    dispatch(addUser({ name: inputValue }));
  }

  return (
    <section>
      <LoginContainer>
        <LoginTitle>TRELLO</LoginTitle>
        <LoginForm onSubmit={handleAddUser}>
          <Input
            type="text"
            name="username"
            placeholder="Write your name..."
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            required
          />
          <Button type="submit">Enter</Button>
        </LoginForm>
      </LoginContainer>
    </section>
  )
}
