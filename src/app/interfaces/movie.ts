// movie.model.ts
export interface MovieCreateRequest {
  movieid?: number;
  name: string;
  image?: string;
  description?: string;
  score: number;
  status: number;
}

export class Movie {
  movieid: number;
  name: string;
  image?: string;
  description?: string;
  score: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    movieid: number,
    name: string,
    score: number,
    status: number,
    createdAt: Date,
    updatedAt: Date,
    image?: string,
    description?: string
  ) {
    this.movieid = movieid;
    this.name = name;
    this.image = image;
    this.description = description;
    this.score = score;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
