import { Component } from '@angular/core';
import { ModeService } from '../../services/mode.service';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent  {
  mode: string = 'user'; // Modo actual, por defecto 'user'
  movies: Movie[] = []; // Array para almacenar las películas
  movieIdToDelete: number | null = null; // ID de la película seleccionada para eliminar
  searchTerm: string = ''; // Término de búsqueda
  sortOption: string = '0'; // Opción de ordenación por defecto
  sortDirection: string = 'asc'; // Dirección de ordenación por defecto

  constructor(
    private modeService: ModeService, // Servicio para obtener el modo actual
    private movieService: MovieService // Servicio para obtener y gestionar películas
  ) {}

  ngOnInit() {
    // Suscripción al modo actual para ajustar el comportamiento según el modo
    this.modeService.currentMode.subscribe(newMode => {
      this.mode = newMode;
      this.handleModeChange(); // Maneja el cambio de modo y recarga las películas
    });

    this.loadMovies(); // Carga las películas iniciales
  }

  handleModeChange() {
    this.loadMovies(); // Vuelve a cargar las películas cuando cambia el modo
  }

  loadMovies() {
    // Define parámetros de búsqueda y ordenación
    let name: string | undefined = this.searchTerm ? `%${this.searchTerm}%` : undefined;
    let sortBy: string = this.getSortByOption(); // Obtiene el criterio de ordenación basado en la opción seleccionada
    let sortDirection: string = this.sortDirection; // Dirección de ordenación (ascendente o descendente)
    let score: number | undefined;
    let status: number | undefined;

    // Dependiendo del modo actual, establece el estado adecuado
    if (this.mode === 'user') {
       status = 1; // Solo muestra películas publicadas para el modo 'user'
    }
    // Llama al servicio para obtener la lista de películas
    this.getMovies(name, score, status, sortBy, sortDirection);
  }

  getMovies(name?: string, score?: number, status?: number, sortBy: string = 'movieid', sortDirection: string = 'asc') {
    // Llama al servicio de películas con los parámetros proporcionados
    this.movieService.ListMovies(name, score, status, sortBy, sortDirection).subscribe(data => {
      this.movies = data; // Actualiza el array de películas con los datos recibidos
    });
  }

  // Establece el ID de la película que se va a eliminar
  setMovieId(id: number): void {
    this.movieIdToDelete = id;
  }

  // Elimina la película con el ID especificado y actualiza la lista
  deleteMovie(): void {
    if (this.movieIdToDelete !== null) {
      this.movieService.deleteMovie(this.movieIdToDelete).subscribe(
        () => {
          console.log(`Película con id ${this.movieIdToDelete} eliminada exitosamente`);
          this.getMovies(); // Refresca la lista de películas después de eliminar
          this.movieIdToDelete = null; // Reinicia el ID de la película a eliminar
        }
      );
    }
  }

  // Determina el criterio de ordenación basado en la opción seleccionada
  getSortByOption(): string {
    switch (this.sortOption) {
      case '1': return 'score'; // Ordenar por puntaje
      case '2': return 'createdAt'; // Ordenar por fecha de creación
      default: return 'movieid'; // Valor por defecto
    }
  }

  // Maneja el cambio en el selector de opción de ordenación
  onSortChange(event: any) {
    this.sortOption = event.target.value;
    this.loadMovies(); // Recarga las películas con la nueva opción de ordenación
  }

  // Maneja el cambio en la dirección de ordenación (ascendente o descendente)
  onSortDirectionChange(event: any) {
    this.sortDirection = event.target.value;
    this.loadMovies(); // Recarga las películas con la nueva dirección de ordenación
  }

  // Maneja el cambio en el campo de búsqueda y recarga las películas
  onSearchChange() {
    this.loadMovies();
  }

}
