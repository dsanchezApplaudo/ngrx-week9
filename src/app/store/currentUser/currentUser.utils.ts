import { UserStorage } from 'src/app/services/storage/user.storage';
import jwt_decode from 'jwt-decode';
import { ILoginResponse } from 'src/app/models,types,interfaces/interfaces/responses/loginResponse.interface';
import { User } from 'src/app/models,types,interfaces/models/user.model';

export class CurrentUserUtils {
  static getDecodedAccessToken = (token: string): any => {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  };

  static handleAuthentication(responseData: ILoginResponse) {
    const { user, token } = responseData.data;
    const { id, name, email } = user;
    const currentUser = new User(id, email, name, token);
    UserStorage.setUser(currentUser);
    return currentUser;
  }
}
