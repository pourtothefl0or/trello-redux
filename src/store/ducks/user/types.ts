interface IUser {
  id: number;
  name: string;
}

export interface UserState {
  user: IUser | {};
}
