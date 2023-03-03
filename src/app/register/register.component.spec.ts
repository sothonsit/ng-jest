import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let registerComponent: RegisterComponent;
  let modalComponent: ModalComponent;

  let fixtureRegister: ComponentFixture<RegisterComponent>;
  let fixtureModal: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        ModalComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();

    fixtureRegister = TestBed.createComponent(RegisterComponent);
    registerComponent = fixtureRegister.componentInstance;
    fixtureRegister.detectChanges();

    fixtureModal = TestBed.createComponent(ModalComponent);
    modalComponent = fixtureModal.componentInstance;
    fixtureModal.detectChanges();
  });

  afterEach(() =>{
    registerComponent.fg.reset()
    modalComponent.hideModal();
  });

  test('should create', () => {
    expect(registerComponent).toBeTruthy();
  });

  test('submit success', () => {

    // arrange
    const dataTest = {
      name: "test",
      email: "test@mail.com",
      password: "abc12345",
      confirmPassword: "abc12345"
    }
    registerComponent.fg.patchValue(dataTest);

    // act
    registerComponent.onSubmit();
    fixtureRegister.detectChanges();
    fixtureModal.detectChanges();

    // assert
    expect(registerComponent.fg.valid).toBeTruthy();

    const input = fixtureRegister.nativeElement.querySelector('input') as HTMLElement;
    expect(input.className).not.toMatch('is-invalid');

    const modal = fixtureModal.nativeElement.querySelector('#modal') as HTMLElement;
    expect(modal.className).toEqual('modal show');

  })

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
    registerComponent.onSubmit();
    fixtureRegister.detectChanges();

    // assert
    expect(registerComponent.fg.get('name')?.invalid).toBeTruthy();
    expect(registerComponent.fg.get('name')?.hasError('required')).toBeTruthy();

    const input = fixtureRegister.nativeElement.querySelector('#name') as HTMLElement;
    const msg = fixtureRegister.nativeElement.querySelector('#name-required') as HTMLElement;
    expect(msg.textContent).toEqual('Please enter your name.');
    expect(input.className).toMatch('is-invalid');
  });

  test('field email should required and show message', () => {

    // act
    registerComponent.onSubmit();
    fixtureRegister.detectChanges();

    // assert
    expect(registerComponent.fg.get('email')?.invalid).toBeTruthy();
    expect(registerComponent.fg.get('email')?.hasError('required')).toBeTruthy();

    const input = fixtureRegister.nativeElement.querySelector('#email') as HTMLElement;
    const msg = fixtureRegister.nativeElement.querySelector('#email-required') as HTMLElement;
    expect(msg.textContent).toEqual('Please enter your email address.');
    expect(input.className).toMatch('is-invalid');
  });

  test('field email should validate email pattern and show message', () => {

    // arrange
    registerComponent.fg.get('email')?.setValue('invalid-email-pattern');

    // act
    registerComponent.onSubmit();
    fixtureRegister.detectChanges();

    // assert
    expect(registerComponent.fg.get('email')?.invalid).toBeTruthy();
    expect(registerComponent.fg.get('email')?.hasError('email')).toBeTruthy();

    const input = fixtureRegister.nativeElement.querySelector('#email') as HTMLElement;
    const msg = fixtureRegister.nativeElement.querySelector('#email-pattern') as HTMLElement;
    expect(msg.textContent).toEqual('Please enter a valid email address pattern.');
    expect(input.className).toMatch('is-invalid');
  });

});
