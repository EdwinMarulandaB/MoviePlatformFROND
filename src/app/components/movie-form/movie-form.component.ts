import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieCreateRequest } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {
  form: FormGroup; // Formulario reactivo para la película
  isFormFilled: boolean = false; // Indicador para saber si el formulario es válido
  isEditMode: boolean = false;  // Variable para verificar si estamos en modo de edición o creación
  movieid: number | null = null;  // Variable para almacenar el id de la película si está presente

  constructor(
    private fb: FormBuilder, // Servicio para construir formularios reactivos
    private movieService: MovieService, // Servicio para manejar operaciones relacionadas con películas
    private route: ActivatedRoute,  // Servicio para obtener parámetros de la URL
    private router: Router // Servicio para redireccionar a otras rutas
  ) {
    // Inicialización del formulario con sus controles y validaciones
    this.form = this.fb.group({
      movieid: [null], // ID de la película, no requerido en el modo de creación
      name: ['', Validators.required], // Nombre de la película, campo requerido
      image: [''], // Imagen de la película, opcional
      description: [''], // Descripción de la película, opcional
      score: [0], // Puntaje de la película, valor por defecto 0
      status: [1] // Estado de la película, valor por defecto 1 (posiblemente 'publicada')
    });
  }

  ngOnInit(): void {
    // Suscripción para verificar si el formulario es válido en tiempo real
    this.form.valueChanges.subscribe(() => {
      this.isFormFilled = this.form.valid;
    });

    // Suscripción a los parámetros de la URL para determinar si estamos en modo de edición
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.movieid = +id;  // Convierte el parámetro id a número
        this.isEditMode = true;  // Si hay un id, estamos en modo de edición
        this.loadMovieData(this.movieid);  // Carga los datos de la película para editar
      } else {
        this.isEditMode = false;  // Si no hay id, estamos en modo de creación
      }
    });
  }

  // Cargar los datos de la película si estamos en modo de edición
  loadMovieData(movieid: number) {
    this.movieService.getMovieById(movieid).subscribe((movie) => {
      // Actualiza el formulario con los datos de la película
      this.form.patchValue({
        movieid: movie.movieid,
        name: movie.name,
        image: movie.image,
        description: movie.description,
        score: movie.score,
        status: movie.status,
      });
    });
  }

  // Maneja el envío del formulario
  onSubmit() {
    if (this.form.valid) {
      // Crea un objeto MovieCreateRequest con los datos del formulario
      const movieRequest: MovieCreateRequest = {
        movieid: this.form.get('movieid')?.value,
        name: this.form.get('name')?.value,
        image: this.form.get('image')?.value,
        description: this.form.get('description')?.value,
        score: this.form.get('score')?.value,
        status: this.form.get('status')?.value,
      };

      // Llama al servicio para guardar o actualizar la película
      this.movieService.saveOrUpdateMovie(movieRequest).subscribe(() => {
        this.router.navigate(['/movies']); // Redirige a la lista de películas después de guardar o actualizar
      });
    }
  }
}
