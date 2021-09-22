import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
// import {
//   emailPattern,
//   nombreApellidoPattern,
//   noPuedeSerStrider,
// } from 'src/app/shared/validators/validaciones';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [],
})
export class RegistroComponent implements OnInit {
  public miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.nombreApellidoPattern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidator],
      ],
      username: [
        '',
        [Validators.required, this.validatorService.noPuedeSerStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );
  // public emailErrorMsg: string = '';
  get emailErrorMsg(): string {
    const error = this.miFormulario.get('email')?.errors;
    if (error?.required) {
      return 'El email es obligatorio';
    } else if (error?.pattern) {
      return 'El email no es valido';
    } else if (error?.emailTomado) {
      return 'El email ya esta en uso';
    }
    return '';
  }
  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Henry Rincon',
      email: 'test1@test.com',
      username: 'test1',
      password: '123456',
      password2: '123456',
    });
  }
  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }
  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }
  // emailRequired() {
  //   return (
  //     this.miFormulario.get('email')?.errors?.required &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }
  // emailFormato() {
  //   return (
  //     this.miFormulario.get('email')?.errors?.pattern &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }
  // emailTomado() {
  //   return (
  //     this.miFormulario.get('email')?.errors?.emailTomado &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }
}
