import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  fg: FormGroup;

  constructor() {
    this.fg = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.fg.markAllAsTouched();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password') as FormControl;
    const confirmPassword = form.get('confirmPassword') as FormControl;
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

  displayInvalid(field: string) {
    const form = this.fg && this.fg.get(field) as FormControl;
    return { 'is-invalid':  form.errors && form.touched };
  }

  hasError(field: string, method: string = 'required') {
    const form = this.fg && this.fg.get(field) as FormControl;
    return form.hasError(method);
  }
}
