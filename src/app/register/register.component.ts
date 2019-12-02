import {Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router, Params} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseUserModel} from '../shared/user.model';
import {UserService} from '../users/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  hide = true;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // this.createForm();
  }

  // createForm() {
  //   this.registerForm = this.fb.group({
  //     email: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

  email = new FormControl(null, [Validators.required, Validators.email]);
  password = new FormControl(null, [Validators.required]);
  name = new FormControl(null, [Validators.required]);
  surname = new FormControl(null, [Validators.required]);
  phoneNumber = new FormControl(null);

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Pole wymagane' :
      this.email.hasError('email') ? 'Błędny e-mail' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Pole wymagane' : '';
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Pole wymagane' : '';
  }

  getSurnameErrorMessage() {
    return this.surname.hasError('required') ? 'Pole wymagane' : '';
  }

  getPhoneNumberErrorMessage() {
    return this.email.hasError('minlength') ? 'Numer telefonu jest za krótki' : '';
  }

  // forbiddenEmailsCheck(control: FormControl): { [s: string]: boolean } {
  //   if (this.userSe.getStudents().map(student => student.login).indexOf(control.value) !== -1) {
  //     return {'loginIsForbidden': true};
  //   }
  //   return null;
  // }

  tryRegister() {
    const createdFirebaseUser = {
      email: this.email.value,
      password: this.password.value
    };
    const createdUserData = {
      email: this.email.value,
      password: this.password.value,
      name: this.name.value,
      surname: this.surname.value,
      phoneNumber: this.phoneNumber.value
    };
    // createdUser.name = this.name.value;
    // createdUser.surname = this.surname.value;
    // createdUser.phoneNumber = this.phoneNumber.value;
    this.authService.doRegister(createdFirebaseUser)
      .then(res => {
        console.log(res);
        this.userService.createUser(createdUserData);
        this.errorMessage = '';
        this.successMessage = 'Konto zostało utworzone pomyślnie';
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  redirectToLoginScreen() {
    this.router.navigate(['/login']);
  }

}
