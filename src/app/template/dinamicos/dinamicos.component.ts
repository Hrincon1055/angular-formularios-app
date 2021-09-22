import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
interface Persona {
  nombre: string;
  favoritos: Favorito[];
}
interface Favorito {
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [],
})
export class DinamicosComponent {
  @ViewChild('miFormulario') miFormulario!: NgForm;
  public nuevoJuego: string = '';
  public persona: Persona = {
    nombre: 'Henry',
    favoritos: [
      {
        id: 1,
        nombre: 'Warezone',
      },
      {
        id: 2,
        nombre: 'Spiderman',
      },
    ],
  };
  guardar() {
    console.log('Formulario posteado.');
  }
  eliminar(index: number): void {
    this.persona.favoritos.splice(index, 1);
  }
  agregarJuego(): void {
    if (this.nuevoJuego.trim().length === 0) {
      return;
    }

    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego,
    };
    this.persona.favoritos.push({ ...nuevoFavorito });
    this.nuevoJuego = '';
  }
}
