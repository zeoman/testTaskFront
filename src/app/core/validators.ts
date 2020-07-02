import {FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class CustomValidators {
  /**
   * Validates that child controls in the form group are equal
   */
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName =>
      formGroup.get(controlName).value === formGroup.get(firstControlName).value);
    return isValid ? null : { notEqual: true };
  }

  // static dateValidator: ValidatorFn = (formControl: FormControl) => {
  //   let date = new Date();
  //   date.setDate(date.getDate() - 1);
  //   const isValid = formControl.value > date;
  //   date = null;
  //   return isValid ? null : { dateNotValid: true };
  // }
  static timeValidator: ValidatorFn = (formGroup: FormGroup) => {
    let dateObj = new Date();
    const [dateControl, timeControl] = Object.keys(formGroup.controls || {});
    if (formGroup.get(dateControl).value > dateObj) {
      dateObj = null;
      return null;
    } else {
      let hours = dateObj.getHours();
      let minutes = ('0' + dateObj.getMinutes()).slice(-2);
      let time = hours + ':' + minutes;
      const isValid = formGroup.get(timeControl).value > time;
      time = null;
      hours = null;
      minutes = null;
      dateObj = null;
      return isValid ? null : { dateNotValid: true };

    }

  }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}
/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
  fullName: 'Full name must be between 1 and 128 characters',
  email: 'Email должен быть в формате "username@domain.com"',
  password: 'Пароль должен быть не менее 6 символов',
  confirmPassword: 'Пароли должны совпадать и быть не менее 6 символов',
  date: 'Выберите правильную дату',
  time: 'Введите правильное время'
};
