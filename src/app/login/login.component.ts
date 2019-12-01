import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router, Params} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  hide = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  email = new FormControl(null, [Validators.required, Validators.email]);
  password = new FormControl(null, [Validators.required]);

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Pole wymagane' :
      this.email.hasError('email') ? 'Błędny e-mail' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Pole wymagane' : '';
  }

  tryLogin() {
    const createdFirebaseUser = {
      email: this.email.value,
      password: this.password.value
    };
    this.authService.doLogin(createdFirebaseUser)
      .then(res => {
        this.errorMessage = '';
        this.successMessage = 'Konto zostało utworzone pomyślnie';
        this.router.navigate(['/user']);
        this.router.navigate(['/user']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }

  ngOnInit(): void {
  }

  redirectToRegisterScreen() {
    this.router.navigate(['/register']);
  }

}
