import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild('modal') modal!: ModalComponent;

  fg: FormGroup;

  constructor() {
    this.fg = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.passwordMatcher.bind(this)])
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    this.fg.markAllAsTouched();
    if (this.fg.valid) {
      this.modal.openModal();
    }
  }

  passwordMatcher(control: FormControl) {
    const form = this.getFormControls('password');
    return this.fg && control.value && (control.value !== form.value)
      ? { passwordNotMatch: true }
      : null;
  }

  displayInvalid(field: string) {
    const form = this.getFormControls(field);
    return { 'is-invalid': form.errors && form.touched };
  }

  hasError(field: string, method: string = 'required') {
    const form = this.getFormControls(field);
    return form.hasError(method);
  }

  getFormControls(field: string): FormControl {
    return this.fg && this.fg.get(field) as FormControl;
  }
}
