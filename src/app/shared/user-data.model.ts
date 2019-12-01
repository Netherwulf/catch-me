export class UserDataModel {
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;

  constructor() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.surname = '';
    this.phoneNumber = '';
  }
}
