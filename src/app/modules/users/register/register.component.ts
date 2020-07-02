import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {ConfirmValidParentMatcher, errorMessages} from '../../../core/validators';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  regFormGroup: FormGroup;

  constructor(	private fb: FormBuilder, private auth: AuthService) {
    this.createForm();
  }
  createForm() {
    this.regFormGroup = this.fb.group({

      emailControl: ['', [
        Validators.required,
        Validators.email
      ]],

      passwordGroup: this.fb.group({
        passwordControl: ['', [
          Validators.required,
//          Validators.pattern(regExps.password)
//           Validators.minLength(6)
        ]],
        passwordConfirmControl: ['', Validators.required]
      },
        // { validator: CustomValidators.childrenEqual}
      )

    });
  }

  register(formValue: any) {
    this.auth.register({
      email: formValue.emailControl,
      password: formValue.passwordGroup.passwordControl
    });
  }
  onPressedEvent(form: FormGroup) {
    if (form.valid) {
      this.register(form.value);
    }
  }
}
