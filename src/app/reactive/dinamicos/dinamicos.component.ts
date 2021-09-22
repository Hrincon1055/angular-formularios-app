import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [],
})
export class DinamicosComponent implements OnInit {
  public miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array(
      [
        ['Spiderman', Validators.required],
        ['Warzone', Validators.required],
      ],

      Validators.required
    ),
  });
  public nuevoFavorito: FormControl = this.fb.control('', Validators.required);
  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}
  campoEsValido(campo: string): boolean | null {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }
  agregarFavorito() {
    if (this.nuevoFavorito.invalid) {
      return;
    }
    // this.favoritosArr.push(
    //   new FormControl(this.nuevoFavorito.value, Validators.required)
    // );
    // Otra forma de hacerlo
    this.favoritosArr.push(
      this.fb.control(this.nuevoFavorito.value, Validators.required)
    );
    this.nuevoFavorito.reset();
  }
  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
  }
  borrar(i: number) {
    this.favoritosArr.removeAt(i);
  }
}
