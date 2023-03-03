import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from '../modal/modal.component';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        ModalComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.fg.reset()
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });


  // validate fields when click submit
  // 1. field name should required

  // 2. field email should required
  // 3. field email should match email pattern

  // 4. field password should required
  // 5. field password should minlength 8

  // 6. field confirmPassword should required
  // 6. field confirmPassword should match password

  test('field name should required and show message', () => {

    // act
    component.onSubmit();
    fixture.detectChanges();

    // assert
    expect(component.fg.get('name')?.invalid).toBeTruthy();
    expect(component.fg.get('name')?.hasError('required')).toBeTruthy();

    const input = fixture.nativeElement.querySelector('#name') as HTMLElement;
    const msg = fixture.nativeElement.querySelector('#name-required') as HTMLElement;
    expect(msg.textContent).toEqual('Please enter your name.');
    expect(input.className).toMatch('is-invalid');
  });

  test('field email should required and show message', () => {

    // act
    component.onSubmit();
    fixture.detectChanges();

    // assert
    expect(component.fg.get('email')?.invalid).toBeTruthy();
    expect(component.fg.get('email')?.hasError('required')).toBeTruthy();

    const input = fixture.nativeElement.querySelector('#email') as HTMLElement;
    const msg = fixture.nativeElement.querySelector('#email-required') as HTMLElement;
    expect(msg.textContent).toEqual('Please enter your email address.');
    expect(input.className).toMatch('is-invalid');
  });

  test('field email should validate email pattern and show message', () => {

    // arrange
    component.fg.get('email')?.setValue('invalid-email-pattern');

    // act
    component.onSubmit();
    fixture.detectChanges();

    // assert
    expect(component.fg.get('email')?.invalid).toBeTruthy();
    expect(component.fg.get('email')?.hasError('email')).toBeTruthy();

    const input = fixture.nativeElement.querySelector('#email') as HTMLElement;
    const msg = fixture.nativeElement.querySelector('#email-pattern') as HTMLElement;
    expect(msg.textContent).toEqual('Please enter a valid email address pattern.');
    expect(input.className).toMatch('is-invalid');
  });


  test('submit success', () => {

    // arrange
    const dataTest = {
      name: "test",
      email: "test@mail.com",
      password: "abc12345",
      confirmPassword: "abc12345"
    }
    component.fg.patchValue(dataTest);

    // act
    component.onSubmit();
    fixture.detectChanges();

    // assert
    expect(component.fg.valid).toBeTruthy();

    const input = fixture.nativeElement.querySelector('input') as HTMLElement;
    expect(input.className).not.toMatch('is-invalid');

    const modal = fixture.nativeElement.querySelector('#modal') as HTMLElement;
    expect(modal.className).toEqual('modal show');

  })
});
