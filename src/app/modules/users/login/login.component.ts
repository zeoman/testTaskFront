import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../core/services/auth.service';
import {errorMessages} from '../../../core/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errors = errorMessages;
  loginFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  createForm() {
    this.loginFormGroup = this.fb.group({

      emailControl: ['', [
        Validators.required,
        Validators.email
      ]],
      passwordControl: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],

    });
  }
  async login(formValue: any) {
    const success = await this.auth.login({
      email: formValue.emailControl,
      password: formValue.passwordControl
    });
    if (success) {
      this.router.navigate(['/dashboard']);
    } else { this.snackBar.open('Неправильный e-mail или пароль', '', {duration: 3000}); }
  }
  enterPressedEvent(form: FormGroup) {
    if (form.valid) {
      this.login(form.value);
    }
  }
}
