import { IUserResponse } from '../currentUser.interface';

export interface ILoginResponse {
  data: {
    token: string;
    user: IUserResponse;
  };
}
