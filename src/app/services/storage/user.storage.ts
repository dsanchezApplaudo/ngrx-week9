import { User } from 'src/app/models,types,interfaces/models/user.model';

export class UserStorage {
  static getCurrentUser() {
    const value = localStorage.getItem('user');
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  static setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static clearUser() {
    localStorage.removeItem('user');
  }

  static getToken() {
    const user: User = this.getCurrentUser();
    if (user) {
      return user.token;
    }
    return null;
  }
}
