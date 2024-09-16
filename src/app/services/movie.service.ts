import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieCreateRequest } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private myAppUrl: string; // URL base de la aplicación
  private myApiUrl: string; // URL del endpoint de la API

  constructor(private http: HttpClient) {
    // Inicialización de las URLs para las solicitudes HTTP
    this.myAppUrl = 'http://localhost:8080/';
    this.myApiUrl = 'api/movies';
  }

  // Método para obtener una lista de películas con filtros opcionales y opciones de ordenación
  ListMovies(name?: string, score?: number, status?: number, sortBy: string = 'movieid', sortDirection: string = 'asc'): Observable<Movie[]> {
    let params: any = {};

    if (name) {
      params.name = name; // Añade el parámetro de búsqueda por nombre si está presente
    }

    if (score !== undefined) {
      params.score = score; // Añade el parámetro de puntuación si está presente
    }

    if (status !== undefined) {
      params.status = status; // Añade el parámetro de estado si está presente
    }

    params.sortBy = sortBy; // Parámetro para la opción de ordenación
    params.sortDirection = sortDirection; // Parámetro para la dirección de ordenación

    // Realiza una solicitud GET al endpoint para obtener la lista de películas con los parámetros definidos
    return this.http.get<Movie[]>(`${this.myAppUrl}${this.myApiUrl}`, { params });
  }

  // Método para eliminar una película por su ID
  deleteMovie(movieid: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${movieid}`);
  }

  // Método para crear o actualizar una película según la lógica del backend
  saveOrUpdateMovie(movieCreateRequest: MovieCreateRequest): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, movieCreateRequest);
  }

  // Método para obtener una película por su ID
  getMovieById(movieid: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.myAppUrl}${this.myApiUrl}/${movieid}`);
  }
}
